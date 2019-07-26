# ubio CSS Framework

This framework provides the UI foundation layer for any UBIO-style app.<br>
Demo https://universalbasket.github.io/css/

<a href="https://www.browserstack.com" title="Visually tested with BrowserStack"><img src="browserstack-logo.svg?sanitize=true&raw=true" height="24" alt="Visually tested with BrowserStack" /></a>

## Idea
In order to make UBIO apps visually consistent, we extract core styles responsible for the colour scheme and typography into a single CSS file, so it can be used as a base layer for any project.

This is a living project, that evolves as we go.

We keep it simple, scalable and flexible.
This doesn't include a grid framework and icons, it's up to a particular project to take care of its layout and choose icons. For prototyping purposes we recommend https://fontawesome.com/icons

## Recommended naming convention: BEM

- BEM stands for `.block__element--modifier` http://getbem.com/introduction/
- Component name may consist of multiple words, separated by dash, e.g. `.block-name__element-name--modifier-name`
- One block typically corresponds to a single CSS component
- Use tag selectors only for base
- Avoid nesting rules in general, keep it flat and scoped
- Nested rules for top-level modifiers like `.block--modifier .block__element` are allowed


## Project structure
- `Libre Franklin` font, served by fonts.googleapis.com – UBIO's font of choice
- `variables.css` – by overriding this one can customize core UI components to specific project needs
- `themes` - currently only contains default and the "night-dark" themes
- `reset.css` – unifies browser-specific HTML styles
- `base.css` – a tiny layer that styles up semantic HTML tags
- `components/` - this folder contains a set of core UI styles, each UI component is described in a separate CSS file, the component name matches the file name. Examples: button.css, input.css, e.t.c.
- `helpers/` - this folder contains a set of CSS class helpers: utility classes, colour, background helpers.
- `print.css` - a base layer for the print stylesheet

To consider: CDN vs. serve statically (e.g. GH Pages) vs. inlining in applications

### Variables

#### Naming scheme

- `--aspect--modifier`
- aspect may consist of multiple words, separated by a dash,
- aspect can match CSS keys (`font-size`, `font-family`, `border-radius`) or can be custom (`color-brand-red`)
- aspect follows hierarchy from top to bottom, e.g. "height of control" is `--control-height`
    - `--gap--small`
    - `--border-radius`
    - `--border-radius--active`
    - `--control-height`
    - `--control-height--small`

#### Variables.css structure
- `Typography` section defines base and monospace font families.
- `Gaps` section provides a small set of fixed gaps that help with building consistent negative space: margins and paddings (as this spacing is independent of a particular element's font-size – elements appear better aligned together)
- `Base` components such as font sizes & control heights, border colour and radius – this helps align UI elements together as they either fit into small/regular/large size grid or are fully responsive and adjust to any scale. Feel free to amend base font-size or override small/large font/control sizes with hardcoded pixel values if responsibility is not what you're looking for.
- `CTA colours` - are responsible for default and accent colouring of "calls to action" (such as buttons, button-sets, toggles, sliders e.t.c) Amend this if your main accent colour is something else, but it's recommended to pick colours from the palette provided as part of the framework.
- `UI Colours` - are for default background and foreground colours, there are also primary, secondary, muted colours for the foreground. Amend as per project needs. This will affect text, links and the background, but the call to actions (mainly buttons) are described separately (use CTA colour variables for that)
- `Colour Palette`


#### Palette

Amend with caution, this affects many UI elements provided by the framework.

- core UI greys: mono, warm, cool
- traffic UI hues: blue, yellow, red, green
- brand UI hues: brand-blue, brand-red
- luminosity steps: 000 to 900
    - 000 (pale line) recommended for lightly tinted large areas
    - 400 (light line, highlight) as background works with dark text, as a foreground works as tinted text on dark mode background
    - 500 (baseline) recommended foreground colour for text, icons, buttons e.t.c, works on white; traffic hues work on both white and dark mode background
    - 800 (dark line) recommended for text, works for small boxes as a max contract background, `--color-cool--800` is the recommended dark-mode background colour;
- palette variable convention: `--color-[name]--step`

### Base

The base layer is the most interesting from the typography and UI point of view, as it describes semantically meaningful HTML tags that one can use without any additional CSS classes.

In order to amend typography for a specific project, it's recommended to create specific classes describing the desired style, rather than overriding the base.css with new rules for tags, as base.css might change in the future. Think of it as a prototyping tool that serves a project with lightly styled HTML tags.

### Core UI components
- form
  - button - default, primary, secondary, accent
  - input - covers common input types including textarea and select
  - toggle - styles for toggle (TODO: convert toggle into a web-component)
  - group - utility classes to align buttons and inputs into control sets
- containers
  - block - works best for panels, size scales only paddings, font size stays the same
  - box - works best for messages and panels, text size if responsive to boxes size
  - tabs
- badge
- tag
- loaders
  - loader
  - spinner
  - progress-bar

### UI helpers
- utils - useful helpers to speed up prototyping, are subject to change, should be moved to Core UI components sections as tested and proven to be useful as a part of the core
- color (named after CSS rule `color`) - set for most used foreground colours (default and dark mode)
- bg - set of most used background colours (default and dark mode)

### Print styles
- a base layer for the print stylesheet
- provides `.no-print` helper to use on elements that are not suitable for the printing (e.g animated spinners)

## About the project

```
npm run build
```

To publish
```
npm version <patch|minor|major>
```
