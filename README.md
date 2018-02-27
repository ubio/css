# ubio CSS Framework

This is a WIP spec for decision making and approval.
Should be replaced with proper docs once settled, decisions should be implemented as CSS framework.

## Inbox

- Remove `--border-color`, maybe replace with `--ctl-border-color`
- Change gap's naming convention to `--gap--small` to be more in line with naming scheme
- Discuss luminosity steps
- Discuss palette edge case: mono white and whether we need pure black

## Naming conventions

- `.block__element--modifier`
- name components may consist of multiple words, separated by dash, e.g. `.block-name__element-name--modifier-name`
- one block typically corresponds to component (exceptions to be documented)
- use tag selectors only for base
- nested rules for top level modifiers like `.block--modifier .block__element` are allowed

## Core variables

### Naming scheme

- `--aspect--modifier`:
- aspect may consist of multiple words, separated by dash
- aspect follows hierarchy from top to bottom, e.g. "color of border of control" is `--ctl-border-color`
    - `--gap--small`
    - `--border-radius`
    - `--ctl-height`
    - `--ctl-height--small`
    - `--color-cyan`
    - `--color-cyan--light`

### Palette

- brand hues: cyan, magenta, stone
- core UI hues: petrol, graphite (grey)
- traffic UI hues: red, amber, green
- luminosity steps:
    - darker
    - dark
    - normal
    - light
    - lighter
- palette variable conventions:
    - `--color-cyan--darker`
    - `--color-cyan--dark`
    - `--color-cyan`
    - `--color-cyan--light`
    - `--color-cyan--lighter`

### Typography

- Main: <insert font size here> Libre Franklin Regular 400
- Main weights:
    - Libre Franklin Regular 400
    - Libre Franklin Medium 500
    - Libre Franklin Semi Bold 600
    - Libre Franklin Bold 700
- Monospace: <insert font size here> Menlo <insert font weight here>
- Icon font: Font Awesome 5
- To consider: CDN vs. serve statically (e.g. GH Pages) vs. inlining in applications

### Spacing (gaps)

- TODO define from sketch (multiple sizes)

