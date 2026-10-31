# Portfolio Redesign — Phase 1 Design System

## Purpose

Establish a consistent visual foundation for the redesign of jenidevops.in while preserving the existing React 19 + Vite implementation.

## Brand direction

**Positioning:** AWS DevOps and Reliability Engineering — production infrastructure, automation, reliability and cloud security.

**Visual direction:** technical editorial + restrained cloud-console styling. The site should feel like an engineer's evidence-backed portfolio, not a generic SaaS landing page.

## Existing implementation baseline

- React 19 + Vite.
- Existing dark palette: near-black page, raised dark cards and teal accent.
- Inter typography.
- Existing CSS uses a 4-point spacing convention in parts of the UI.
- Existing layout uses a maximum content width around 1180px.
- Existing UI is primarily a single-page portfolio with anchor navigation.

## Design principles

1. **Evidence before claims:** project outcomes link to a repository, diagram, test, workflow, or clearly labelled lab demonstration.
2. **Readable technical content:** use a constrained reading width and a legible monospace font for commands and code.
3. **Consistent hierarchy:** one primary page heading, clear section headings, descriptive labels and predictable spacing.
4. **Responsive by default:** design for narrow mobile screens first, then tablet and desktop.
5. **Accessible interaction:** visible keyboard focus, semantic controls, sufficient contrast and reduced-motion support.
6. **Honest status indicators:** simulated infrastructure panels must be labelled as simulations; do not imply live production telemetry when none is connected.

## Token groups

The implementation is in `frontend/src/styles/design-tokens.css`.

- Brand: primary teal and secondary teal.
- Semantic surfaces: page, surface, raised surface, hover surface and borders.
- Text: primary, secondary, muted and text-on-brand.
- Status: success, warning, danger and informational.
- Typography: sans-serif and monospace families plus a type scale.
- Spacing: 4-point base scale.
- Layout: content widths, header height and responsive page gutter.
- Shape/elevation: border radii and card/overlay shadows.
- Motion/focus: transition durations and keyboard focus ring.

Existing legacy tokens in `App.css` remain in place during Phase 1. Component-by-component migration should happen in later redesign phases to avoid a large visual regression.

## Component standards

### Navigation
- Sticky header with a clear active/hover state.
- Keyboard-operable mobile menu.
- Descriptive accessible names.
- Primary resume action should remain visible on desktop.

### Buttons
- Primary action: filled brand color, high contrast.
- Secondary action: outlined neutral surface.
- Minimum comfortable touch target around 44px.
- Visible hover, focus and disabled states.

### Cards
- Use a consistent border, radius and surface.
- Avoid excessive glow and decorative gradients.
- Hover motion must be subtle and respect reduced-motion preferences.

### Typography
- Sans-serif for interface and body copy.
- Monospace for commands, code, technical identifiers and terminal output.
- Article reading width target: 680–760px.
- Avoid long paragraphs; use headings, lists, diagrams and code examples.

### Project evidence
- Show project status: Completed, In Progress or Lab.
- Show the user's role and scope.
- Link to repository and supporting evidence when available.
- Do not display unverified metrics as facts.

## Known follow-up work

- Reconcile years-of-experience claims across the site and resume.
- Audit numeric achievements and uptime claims before publishing.
- Review the hero's infrastructure status panel and label simulated data accurately.
- Review project data for inconsistent or unsupported claims.
- Replace anchor-only navigation with real routes when page architecture is implemented.
- Introduce shared component primitives during the homepage redesign.
- Test mobile layout, keyboard navigation, reduced motion and contrast.

## Phase 1 acceptance criteria

- Semantic design tokens are available globally.
- Existing colors and layout remain visually compatible.
- Keyboard focus is visible.
- Reduced-motion preferences are respected.
- Design decisions and future migration rules are documented.
- No production deployment or existing feature removal is performed in this phase.
