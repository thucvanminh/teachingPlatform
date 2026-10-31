# Keithley responsive refinement

## Goal

Make Keithley's Cosmic learning flow comfortable at 360–430px wide while
preserving the existing desktop experience at 1280px and above. The work is
limited to presentation and layout; APIs, assessment behavior, and learning
data remain unchanged.

## Scope

### Mission workspace

On small screens, the top mission controls will use concise labels and fit
within the viewport. The bottom controls will use a mobile-first, two-row
layout: previous/next navigation stays prominent, while progress and submit
remain reachable without competing for one horizontal row. Desktop retains the
current single-row command bar.

### Chemistry 9 interactive lecture

The embedded Mass Percentage lecture receives a <=640px stylesheet layer.
Cards keep their visual identity but reduce padding and text scale. Beaker and
telemetry, and the bromine bubbler, stack vertically. Dense two-column visual
grids collapse where their contents would otherwise be too narrow. No essential
lesson content is hidden and no horizontal page scrolling is introduced.

### Mission control and lecture modal

The dashboard's schedule heading stacks on phones. Mission titles are allowed
to shrink and wrap inside their card. The interactive lecture's tab control can
wrap cleanly, and its acknowledgement control remains visible and usable.

### Results

Submitted solution images wrap to additional rows rather than forcing the
review card wider than its container.

## Responsive contract

| Viewport | Expected behavior |
| --- | --- |
| 360–430px | No horizontal overflow; actions meet their visible containers; complex visual simulations stack vertically. |
| 640–1023px | Existing tablet layouts may use more horizontal space without requiring a separate navigation mode. |
| >=1280px | Existing Cosmic dashboard, three-card mission layout, and desktop assessment controls are retained. |

## Implementation boundaries

- Edit only the Keithley student dashboard, mission workspace, result screen,
  and Chemistry lecture stylesheet.
- Prefer existing Tailwind breakpoints and class patterns in React pages.
- Use CSS media rules only for the static lecture.
- Do not change server code, schemas, API endpoints, authentication, or scoring.

## Verification

- Type-check the frontend.
- Build the frontend when the local build completes normally.
- Inspect the relevant markup and responsive rules at phone and desktop
  breakpoints, including mission header/footer, lecture controls, and image
  wrapping.

## Self-review

The scope is confined to the four issues observed in the initial audit. The
phone and desktop targets are explicit; no behavior changes are introduced.
