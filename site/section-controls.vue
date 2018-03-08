<template>
    <div id="controls"
        class="section"
        :class="{ 'section--active': activeItem === 'controls' }">
        <div
            class="section__title"
            :class="{ 'section__title--active': activeItem === 'controls' }">
            <i class="fa fa-gamepad section__title-icon"></i>
            <span class="section__title-label">Controls</span>
        </div>
        <div class="section__body">
            <article>
                <h3>Buttons</h3>
                <div class="group group--gap-small">
                    <button class="button">Default</button>
                    <button class="button button--primary">Primary</button>
                    <button class="button button--secondary">Secondary</button>
                </div>
            </article>

            <article>
                <h4>Button sizes</h4>
                <div class="group group--gap-small">
                    <button class="button button--small">Small</button>
                    <button class="button">Normal</button>
                    <button class="button button--large">Large</button>
                </div>
            </article>

            <article>
                <h4>Button states</h4>
                <div class="group group--gap-small">
                    <button class="button">Normal</button>
                    <button class="button button--active">Active</button>
                    <button class="button" disabled>Disabled</button>
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

                <div class="block">
                    <div class="group group--gap">
                        <div class="group group--gap-small">
                            <label>Text label</label>
                            <input type="text" class="input" placeholder="Text input"/>
                        </div>
                        <button class="button">Adjacent Button</button>
                        <select class="input">
                            <option>Dropdown menu</option>
                        </select>
                        <div class="group group--merged">
                            <button class="button">Button</button>
                            <button class="button">Another button</button>
                        </div>
                        <div class="group group--merged">
                            <input type="text" class="input" placeholder="Text input">
                            <button class="button button--primary">Button</button>
                        </div>
                    </div>
                </div>

                <div class="block">
                    <div class="group group--gap">
                        <input type="text" class="input input--small" placeholder="Small input"/>
                        <button class="button button--small">Small button</button>
                        <div class="group group--merged">
                            <input type="text" class="input input--small" placeholder="Small input">
                            <button class="button button--small">Small button</button>
                        </div>
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
