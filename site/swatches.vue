<template>
    <div class="swatches">
        <div class="swatches__column"
            v-for="swatch of swatches">
            <div class="swatches__name">
                {{ swatch.name }}
            </div>
            <div class="swatches__steps">
                <div class="swatches__step"
                    :style="step.style"
                    v-for="step of swatch.steps">
                    <div class="swatches__number">{{ step.number }}</div>
                    <div class="swatches__hex">{{ step.color.hex }}</div>
                    <div class="swatches__hsl">{{ step.color.hsl }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const parseColor = require('parse-color');
const swatchNames = ['mono', 'warm', 'cool', 'blue', 'green', 'yellow', 'red', 'brand-red', 'brand-blue'];
const swatchNumbers = ['000', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

module.exports = {

    computed: {

        swatches() {
            const swatches = [];
            for (const name of swatchNames) {
                const steps = [];
                const swatch = { name, steps };
                swatches.push(swatch);
                for (const number of swatchNumbers) {
                    const variable = `--color-${name}--${number}`;
                    const fgColor = number >= '500' ? 'white' : 'black';
                    const style = `background: var(${variable}); color: ${fgColor}`;
                    const color = evalColor(style);
                    steps.push({
                        number,
                        variable,
                        style,
                        color,
                    });
                }
            }
            return swatches;
        },

    },

};

function evalColor(style) {
    const e = document.createElement('div');
    e.style = style;
    document.documentElement.appendChild(e);
    const s = window.getComputedStyle(e);
    const bgColor = s['background-color'];
    document.documentElement.removeChild(e);
    return parseColor(bgColor);
}
</script>

<style>
.swatches {
    display: flex;
    flex-flow: row nowrap;
}

.swatches__column {
    display: flex;
    flex-flow: column nowrap;
}

.swatches__name {
    padding: var(--gap);
}

.swatches__step {
    padding: var(--gap);
}

.swatches__hex,
.swatches__hsl {
    margin-top: var(--gap--small);
    font-size: var(--font-size--small);
    opacity: .75;
}
</style>

