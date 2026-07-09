# MVHR / ERV Equipment Selection Note

Project: Small Residential MVHR / ERV Revit MEP Coordination  
Prepared by: Ricardo Xie  
Status: preliminary portfolio selection, not a procurement schedule

## Selection Objective

The equipment selection step checks whether the modelled MVHR/ERV airflow target is plausible against a New Zealand-available product family. It is included to show building-services thinking: fan duty, duct connection size, commissioning headroom and practical review items.

## Design Duty From Project Calculation

| Item | Project target |
| --- | ---: |
| Normal supply schedule | 60 L/s |
| Normal extract schedule | 45 L/s |
| Normal fan-duty allowance | about 80 Pa external static pressure |
| Boost extract check | 85 L/s |
| Boost fan-duty allowance | about 120 Pa external static pressure |
| Preferred design outcome | Select a unit that can meet normal duty without being oversized, while leaving boost/check headroom |

## Candidate Product Family

Mitsubishi Electric New Zealand lists the Lossnay LGH-RVX3-E Fresh Air Energy Recovery Ventilation range for commercial and residential applications. The range provides adjustable supply and exhaust fan speeds and includes model sizes that bracket the current project duty.

| Model | Airflow range | Published reference point | Duct size | Project interpretation |
| --- | ---: | --- | ---: | --- |
| LGH-25RVX3-E | 17-69 L/s | 69 L/s at 120 Pa at 100% default point | 150 mm | Close to normal duty but limited boost headroom |
| LGH-35RVX3-E | 24-97 L/s | 73 L/s at 90 Pa at 75%; 97 L/s at 160 Pa at 100% | 150 mm | Best concept fit for 60 L/s normal and 85 L/s boost check |
| LGH-50RVX3-E | 35-139 L/s | 104 L/s at 85 Pa at 75%; 139 L/s at 150 Pa at 100% | 200 mm | Capable but likely oversized for the current small dwelling concept |

## Preferred Concept Selection

Preferred concept unit: Mitsubishi Electric Lossnay LGH-35RVX3-E.

Rationale:

- It covers the 60 L/s normal design duty with usable headroom.
- Its 75% default point is close to the normal duty and pressure allowance.
- Its 100% default point provides headroom above the 85 L/s boost extract check.
- Its 150 mm duct spigots are practical for a compact residential layout, though the current 170-180 mm low-velocity trunks require transition review at the unit.
- It gives a more defensible selection than an undersized LGH-25 or oversized LGH-50 for this portfolio dwelling scale.

## Items Still Requiring Professional / Installer Review

- Current manufacturer fan curve and selected fan speed for final duty.
- Filter pressure drop, heat-exchanger pressure drop and dirty-filter allowance.
- Diffuser/grille pressure drop and room acoustic limits.
- Intake/exhaust hood pressure drop, separation distance and weatherproofing detail.
- Final duct route, ceiling void, fire/acoustic separation and service access.
- Commissioning targets for airflow balancing, CO2, humidity, fan power and control mode.

## Resume-Safe Summary

Selected Mitsubishi Electric Lossnay LGH-35RVX3-E as a preliminary MVHR/ERV concept unit after comparing project airflow and external static pressure targets against New Zealand-available manufacturer data, while documenting final fan-curve, acoustic, filter and installer-review limits.

## Sources Used

- Mitsubishi Electric NZ, Fresh Air Home Ventilation and Heat Recovery product page: https://www.mitsubishi-electric.co.nz/ventilation/c/8364/fresh-air-home-ventilation-and-heat-recovery
- Mitsubishi Electric NZ, Lossnay LGH-RVX3-E publication: https://www.mitsubishi-electric.co.nz/materials/ventilation/brochures/%40lossnaylgh-rvx.pdf
- MBIE Building Performance, G4 Ventilation: https://www.building.govt.nz/building-code-compliance/g-services-and-facilities/g4-ventilation
