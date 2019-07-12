<template>
    <article>
        <header>Styles</header>
        <styles-primary-secondary />
        <styles-accent />
        <styles-primary-secondary-custom />
        <styles-icon-within />
        <styles-icon-only />
        <styles-select />
    </article>
</template>

<script>
import StylesPrimarySecondary from './styles-primary-secondary.vue';
import StylesPrimarySecondaryCustom from './styles-primary-secondary-custom.vue';
import StylesAccent from './styles-accent.vue';
import StylesIconWithin from './styles-icon-within.vue';
import StylesIconOnly from './styles-icon-only.vue';
import StylesSelect from './styles-select.vue';

export default {
    name: 'button-styles',

    components: {
        'styles-primary-secondary': StylesPrimarySecondary,
        'styles-primary-secondary-custom': StylesPrimarySecondaryCustom,
        'styles-accent': StylesAccent,
        'styles-icon-within': StylesIconWithin,
        'styles-icon-only': StylesIconOnly,
        'styles-select': StylesSelect
    }
};
</script>
