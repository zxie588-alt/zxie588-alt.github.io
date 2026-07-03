# Revit MEP Coordination Plan - NZ Residential MVHR / ERV

This note records the native Revit/BIM coordination layer added to the NZ residential MVHR / ERV ventilation project. It is a portfolio-level coordination model and documentation package, not a consent design or construction issue drawing.

## Purpose

The original ventilation project already included SolidWorks geometry, a DXF plan, airflow schedule, pressure-loss estimate, equipment selection and commissioning notes. The Revit upgrade adds the part that New Zealand building-services consultancies are more likely to recognise: native model coordination, sheet views, schedules, tagged systems, drawing-review comments and clash-review thinking.

## Revit Model Scope

Model discipline: Mechanical / HVAC

Level of development: portfolio coordination model, approximately LOD 200-300 depending on element type.

Main model elements represented in the Revit 2026 model:

- MVHR / ERV unit envelope with maintenance-clearance zone.
- Supply air, extract air, outdoor air and exhaust air duct systems.
- Supply diffusers for bedrooms and living spaces.
- Extract terminals for kitchen, bathroom and laundry.
- Outdoor intake and exhaust terminals.
- Balancing dampers, access notes and system tags.
- Basic ceiling/service-zone coordination against a simple architectural layout.

## Views and Sheets

Created Revit browser structure:

- `RX MVHR coordination plan`
- `RX MVHR 3D coordination view`
- `RX MVHR airflow schedule`
- `RX drawing review and clash check`

Created sheet package:

- `RX-MVHR-001`: MVHR / ERV coordination plan with system colours, terminals and airflow tags.
- `RX-MVHR-002`: 3D MEP coordination view showing routed supply/extract ducts, MVHR unit and wall penetrations.
- `RX-MVHR-003`: airflow schedule, NZ context note, five drawing-review comments and simple clash-check statement.

## Naming and System Conventions

System names:

- `SA-01 Supply Air`
- `EA-01 Extract Air`
- `OA-01 Outdoor Air`
- `EX-01 Exhaust Air`

Element naming:

- `MVHR-01`
- `SA-DIF-01` to `SA-DIF-04`
- `EA-GRL-KIT-01`
- `EA-GRL-BATH-01`
- `EA-GRL-LDY-01`
- `OA-TERM-01`
- `EX-TERM-01`

## Schedule Fields

The Revit sheet includes a starter airflow schedule. The attached CSV mirrors the schedule fields used for review:

- Mark
- System
- Element type
- Room / zone
- Design airflow L/s
- Duct diameter mm
- Design velocity m/s
- Design pressure note
- Commissioning check

## Clash and Coordination Checks

Minimum model review checklist:

- Maintain access clearance around MVHR filters, drain and service panel.
- Avoid crossing duct routes through structural walls or beams without an opening note.
- Keep outdoor intake and exhaust separation visible in plan.
- Keep branch duct velocities in a reasonable residential comfort range.
- Check diffuser placement against likely furniture and room use.
- Keep balancing and measuring points accessible for commissioning.
- Flag acoustic risk where duct velocity, fan duty or grille location may affect bedrooms.

## Design Boundary

Completed in the public portfolio:

- Native Revit 2026 `.rvt` coordination model.
- One-level residential layout with MVHR equipment, supply/extract routes, terminals and wall penetrations.
- Three Revit portfolio sheets: plan, 3D coordination view and airflow/review notes.
- Schedule, naming convention, drawing-review comments and simple clash-check note.
- DXF and SolidWorks outputs that can be used as model references.

Still requiring project-specific professional review:

- Architectural background model based on an actual dwelling or client brief.
- Final Revit duct/terminal families selected from project or manufacturer libraries.
- Full clash detection against structural, architectural and ceiling/service-zone models.
- Pressure-loss, acoustic, diffuser/grille and commissioning values verified against final manufacturer data.
- Construction documentation and consent-ready compliance review.

## Resume-Safe Wording

Use:

> Added a Revit MEP coordination workflow to a NZ residential MVHR / ERV project, including BIM naming conventions, sheet/view plan, duct-terminal schedule fields, access-clearance checks and commissioning handoff notes.

Better after the native model update:

> Built a native Revit 2026 MEP coordination model for a NZ residential MVHR / ERV case study, including a one-level house layout, MVHR unit, supply/extract duct routes, diffusers/grilles, airflow schedule, three portfolio sheets, drawing-review comments and a simple clash-check note.

Avoid:

> Completed a construction-ready Revit model.

The second statement is still not safe because the model is a portfolio coordination case, not a professional construction or consent package.
