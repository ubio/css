<template>
    <div class="swatches">
        <div class="swatches__column"
            v-for="swatch of swatches"
            :key="swatch.name">
            <div class="swatches__name">
                <strong>{{ swatch.name }}</strong>
            </div>
            <div class="swatches__steps">
                <div class="swatches__step"
                    :style="step.style"
                    v-for="step of swatch.steps"
                    :key="step.number">
                    <div class="swatches__number">{{ step.number }}</div>
                    <div class="swatches__hex">{{ step.color.hex }}</div>
                    <div class="swatches__hsl">{{ step.color.hsl }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import parseColor from 'parse-color';

export default {
    name: 'palette',

    data() {
        const swatchNumbers = ['000', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        return {
            swatchNumbers
        };
    },

    computed: {
        swatches() {
            const swatches = [];
            this.$root.colors.forEach(name => {
                const steps = [];
                const swatch = { name, steps };
                swatches.push(swatch);
                this.swatchNumbers.forEach(number => {
                    const variable = `--color-${name}--${number}`;
                    const fgColor = number >= '500' ? 'white' : 'black';
                    const style = `background: var(${variable}); color: ${fgColor}`;
                    const color = evalColor(style);
                    steps.push({
                        number,
                        variable,
                        style,
                        color
                    });
                });
            });
            return swatches;
        }

    }

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
