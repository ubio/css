<template>
    <div class="section" id="controls" :class="{ 'section--active': activeItem === 'controls' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'controls' }">
            <i class="fa fa-gamepad section__title-icon"></i>
            <span class="section__title-label">Controls</span>
        </div>
        <div class="section__body">
            <article>
                <h3>Buttons</h3>
                <div class="group group--gap-small">
                    <button class="btn btn--default">Default</button>
                    <button class="btn btn--primary">Primary</button>
                    <button class="btn btn--secondary">Secondary</button>
                    <button class="btn btn--danger">Danger</button>
                </div>
            </article>

            <article>
                <h4>Button sizes</h4>
                <div class="group group--gap-small">
                    <button class="btn btn--small">Small</button>
                    <button class="btn btn--default">Normal</button>
                    <button class="btn btn--large btn--default">Large</button>
                </div>
            </article>

            <article>
                <h4>Button states</h4>
                <div class="group group--gap-small">
                    <button class="btn btn--default">Normal</button>
                    <button class="btn btn--default btn--active">Active</button>
                    <button class="btn btn--default" disabled>Disabled</button>
                </div>
            </article>

            <article>
                <h3>Text inputs</h3>
                <div class="group group--gap-small">
                    <input type="text" class="input" placeholder="Regular input"/>
                    <input type="text" class="input" placeholder="Disabled" disabled/>
                </div>
            </article>

            <article>
                <h4>Groups</h4>
                <div class="group group--gap">
                    <label>Text label</label>
                    <input type="text" class="input" placeholder="Text input"/>
                    <button class="btn btn--default">Adjacent Button</button>
                    <select class="input">
                        <option>Dropdown menu</option>
                    </select>
                    <div class="group group--merged">
                        <button class="btn btn--default">Button</button>
                        <button class="btn btn--default">Another button</button>
                    </div>
                    <div class="group group--merged">
                        <input type="text" class="input" placeholder="Text input">
                        <button class="btn btn--primary">Button</button>
                    </div>
                </div>
            </article>
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
