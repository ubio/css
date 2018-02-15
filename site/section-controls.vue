<template>
    <div class="section" id="controls" :class="{ 'section--active': activeItem === 'controls' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'controls' }">
            <i class="fa fa-gamepad section__title-icon"></i>
            <span class="section__title-label">Controls</span>
        </div>
        <div class="section__body">

            <h2>Buttons</h2>

            <div class="block group group--gap-small">
                <button class="btn btn--default">Default</button>
                <button class="btn btn--primary">Primary</button>
                <button class="btn btn--secondary">Secondary</button>
                <button class="btn btn--muted">Muted</button>
                <button class="btn btn--info">Info</button>
                <button class="btn btn--success">Success</button>
                <button class="btn btn--warning">Warning</button>
                <button class="btn btn--danger">Danger</button>
                <button class="btn btn--failure">Failure</button>
                <button class="btn btn--accent">Accent</button>
            </div>

            <h2>Button sizes</h2>

            <div class="block group group--gap-small">
                <button class="btn btn--small">Small</button>
                <button class="btn btn--default">Normal</button>
                <button class="btn btn--large btn--default">Large</button>
            </div>

            <h2>Button states</h2>

            <div class="block group group--gap-small">
                <button class="btn btn--default">Normal</button>
                <button class="btn btn--default btn--active">Active</button>
                <button class="btn btn--default" disabled>Disabled</button>
            </div>

            <h2>Text inputs</h2>

            <div class="block group group--gap-small">
                <input type="text" class="input" placeholder="Regular input"/>
                <input type="text" class="input" placeholder="Disabled" disabled/>
            </div>

            <h2>Groups</h2>

            <div class="block group group--gap">
                <label>Text label</label>
                <input type="text" class="input" placeholder="Text input"/>
                <button class="btn btn--default">Adjacent Button</button>
                <select class="input">
                    <option>Dropdown menu</option>
                </select>
            </div>

            <div class="block group group--gap">
                <div class="group group--merged">
                    <button class="btn btn--default">Button</button>
                    <button class="btn btn--default">Another button</button>
                </div>
                <div class="group group--merged">
                    <input type="text" class="input" placeholder="Text input">
                    <button class="btn btn--default">Button</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        activeItem: { type: String, required: false, default: '' },
    },
};
</script>
