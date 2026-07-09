# MVHR / ERV Duct Sizing and Pressure-Loss Summary

Project: Small Residential MVHR / ERV Revit MEP Coordination  
Prepared by: Ricardo Xie  
Status: portfolio-level preliminary design check, not a construction or consent document

## Design Intent

This note converts the MVHR concept into a simple building-services sizing check. The aim is to show the assumptions behind the duct routes, fan duty and review comments used in the Revit coordination model.

| Item | Design value | Comment |
| --- | ---: | --- |
| Normal supply airflow | 60 L/s | 20 L/s each to Bedroom 1, Bedroom 2 and Living |
| Normal extract airflow | 45 L/s | 20 L/s bathroom, 25 L/s kitchen/laundry in current schedule |
| Boost extract check | 85 L/s | Used as a future kitchen/bathroom demand check |
| Supply main duct | 180 mm equivalent | Low-velocity trunk assumption |
| Extract main duct | 160 mm equivalent | Current concept before manufacturer transitions |
| Branch ducts | 120-130 mm equivalent | To be refined with diffuser/grille data |
| Normal fan-duty allowance | about 80 Pa ESP | Includes route/fitting/terminal allowance, excludes final filter and acoustic selections |
| Boost fan-duty allowance | about 120 Pa ESP | Requires manufacturer fan curve and noise review |

## Duct Velocity Sense Check

| Route | Airflow | Diameter assumption | Approx. velocity | Review result |
| --- | ---: | ---: | ---: | --- |
| Supply main | 60 L/s | 180 mm | 2.36 m/s | Suitable for quiet low-velocity concept |
| Supply branch | 20 L/s | 130 mm | 1.51 m/s | Suitable for bedroom/living terminal branches |
| Extract main | 45 L/s | 160 mm | 2.24 m/s | Suitable for normal operation |
| Kitchen/laundry extract branch | 25 L/s | 125 mm | 2.04 m/s | Acceptable concept value; check grille noise |
| Outdoor air / exhaust | 60 L/s | 180 mm | 2.36 m/s | Check intake/exhaust separation and weather hood loss |
| Boost kitchen branch | 50 L/s | 150 mm | 2.83 m/s | Requires fan-curve and acoustic check |

## Pressure-Loss Summary

The detailed route table is kept in `nz_ventilation_duct_pressure_estimate.csv`. The current concept indicates:

| Operating mode | Critical path | Estimated external static pressure | Design action |
| --- | --- | ---: | --- |
| Current supply schedule | Longest supply diffuser branch | about 24 Pa route loss before global design allowance | Keep 80 Pa allowance until diffuser/filter data is known |
| Current extract schedule | Kitchen/laundry extract branch | about 27 Pa route loss before global design allowance | Keep 80 Pa allowance and review grille noise |
| Outdoor intake / exhaust | Wall penetration and weather hood | about 17 Pa each before global allowance | Confirm hood loss and separation distance |
| Boost extract | Kitchen boost path | about 48 Pa route loss before global allowance | Keep 120 Pa boost allowance and check manufacturer fan curve |

## Coordination Comments Raised

1. Confirm final MVHR model, duct spigot size and transition pieces before construction-level sizing.
2. Confirm ceiling void depth and access zone around the MVHR unit.
3. Confirm intake and exhaust wall penetrations against structure, facade and weatherproofing.
4. Replace generic diffusers/grilles with manufacturer data including pressure drop and noise.
5. Carry out a final balancing/commissioning check once actual duct lengths and terminal selections are known.

## Local Context Notes

- MBIE G4/AS1 is used only as context for the need to provide adequate outdoor air and remove moisture/contaminants. This portfolio check is not a compliance pathway.
- Tenancy Services guidance confirms that continuous mechanical ventilation can be relevant for kitchens and bathrooms when extracted air is vented outdoors and room-specific requirements are met. The project keeps wet-area extract routed to outdoors through the MVHR/exhaust path.
- The selected concept unit remains a preliminary Mitsubishi Electric Lossnay LGH-35RVX3-E check. Final selection must use the current manufacturer fan curve, filters, acoustic criteria and installer review.

## Sources Used

- MBIE Building Performance, G4 Ventilation and G4/AS1: https://www.building.govt.nz/building-code-compliance/g-services-and-facilities/g4-ventilation
- Tenancy Services, Healthy Homes ventilation standard: https://www.tenancy.govt.nz/healthy-homes/ventilation-standard/
- Mitsubishi Electric NZ, Lossnay LGH-RVX3-E publication: https://www.mitsubishi-electric.co.nz/materials/ventilation/brochures/%40lossnaylgh-rvx.pdf
