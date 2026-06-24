(function () {
  const dashboard = document.querySelector("[data-ventilation-dashboard]");
  if (!dashboard) {
    return;
  }

  const sampleRows = [
    { time: "07:00", mode: "normal", event: "baseline", co2: 612, rh: 54, indoor: 19.2, outdoor: 9.5, supply: 60, extract: 60, power: 42 },
    { time: "07:45", mode: "boost", event: "cooking", co2: 910, rh: 67, indoor: 20.1, outdoor: 10.4, supply: 85, extract: 85, power: 120 },
    { time: "12:00", mode: "normal", event: "daytime", co2: 620, rh: 51, indoor: 20.0, outdoor: 13.8, supply: 60, extract: 60, power: 42 },
    { time: "18:30", mode: "boost", event: "evening peak", co2: 1285, rh: 70, indoor: 21.4, outdoor: 11.5, supply: 85, extract: 85, power: 120 },
    { time: "22:00", mode: "normal", event: "bedrooms occupied", co2: 895, rh: 58, indoor: 19.8, outdoor: 9.4, supply: 60, extract: 60, power: 42 },
    { time: "06:45", mode: "boost", event: "shower", co2: 880, rh: 74, indoor: 19.6, outdoor: 8.4, supply: 85, extract: 85, power: 120 }
  ];

  const dwellingVolumeM3 = 96 * 2.4;
  const rho = 1.2;
  const cp = 1006;

  const controls = {
    sample: dashboard.querySelector("#sampleIndex"),
    co2Boost: dashboard.querySelector("#co2Boost"),
    rhBoost: dashboard.querySelector("#rhBoost"),
    effectiveness: dashboard.querySelector("#recoveryEffectiveness")
  };

  const output = {
    sampleLabel: dashboard.querySelector("#sampleLabel"),
    co2: dashboard.querySelector("#dashCo2"),
    rh: dashboard.querySelector("#dashRh"),
    mode: dashboard.querySelector("#dashMode"),
    ach: dashboard.querySelector("#dashAch"),
    heat: dashboard.querySelector("#dashHeat"),
    power: dashboard.querySelector("#dashPower"),
    decision: dashboard.querySelector("#dashDecision"),
    controlValues: dashboard.querySelector("#controlValues")
  };

  const canvas = dashboard.querySelector("#ventilationTrend");
  const ctx = canvas.getContext("2d");

  function drawTrend(selectedIndex) {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const pad = 38;
    ctx.strokeStyle = "#d9e0df";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i += 1) {
      const y = pad + ((height - pad * 2) / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(width - pad, y);
      ctx.stroke();
    }

    function plot(values, min, max, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      values.forEach((value, index) => {
        const x = pad + ((width - pad * 2) / (values.length - 1)) * index;
        const y = height - pad - ((value - min) / (max - min)) * (height - pad * 2);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    plot(sampleRows.map((row) => row.co2), 500, 1400, "#007c73");
    plot(sampleRows.map((row) => row.rh * 15), 500, 1400, "#c58b00");

    const selectedX = pad + ((width - pad * 2) / (sampleRows.length - 1)) * selectedIndex;
    ctx.strokeStyle = "#1f2a2e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(selectedX, pad);
    ctx.lineTo(selectedX, height - pad);
    ctx.stroke();

    ctx.fillStyle = "#5e6a70";
    ctx.font = "13px Arial";
    ctx.fillText("CO2 ppm", pad, 20);
    ctx.fillStyle = "#007c73";
    ctx.fillText("CO2", width - 118, 20);
    ctx.fillStyle = "#c58b00";
    ctx.fillText("RH x 15", width - 72, 20);
  }

  function update() {
    const index = Number(controls.sample.value);
    const row = sampleRows[index];
    const co2Boost = Number(controls.co2Boost.value);
    const rhBoost = Number(controls.rhBoost.value);
    const effectiveness = Number(controls.effectiveness.value) / 100;

    const ach = (row.supply * 3.6) / dwellingVolumeM3;
    const deltaT = Math.abs(row.indoor - row.outdoor);
    const recoveredW = rho * cp * (row.supply / 1000) * deltaT * effectiveness;

    let decision = "Normal: hold 60 L/s balanced ventilation.";
    let recommended = "Normal";
    if (row.co2 >= co2Boost || row.rh >= rhBoost) {
      recommended = "Boost";
      decision = "Boost: CO2 or humidity is above the selected threshold, so the system should move to the 85 L/s clearing target.";
    } else if (row.co2 > 850 || row.rh > 60) {
      recommended = "Recovery";
      decision = "Recovery: values are falling but still above the return band, so keep monitoring before returning fully to normal.";
    }

    output.sampleLabel.textContent = `${row.time} - ${row.event}`;
    output.co2.textContent = `${row.co2} ppm`;
    output.rh.textContent = `${row.rh}%`;
    output.mode.textContent = recommended;
    output.ach.textContent = `${ach.toFixed(2)} ACH`;
    output.heat.textContent = `${Math.round(recoveredW)} W`;
    output.power.textContent = `${row.power} W`;
    output.decision.textContent = decision;
    output.controlValues.textContent = `Thresholds: CO2 boost ${co2Boost} ppm, RH boost ${rhBoost}%, heat-recovery assumption ${(effectiveness * 100).toFixed(0)}%.`;

    drawTrend(index);
  }

  Object.values(controls).forEach((control) => {
    control.addEventListener("input", update);
  });

  update();
})();
