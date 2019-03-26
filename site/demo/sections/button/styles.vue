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
module.exports = {
    name: 'button-styles',

    components: {
        'styles-primary-secondary': require('./styles-primary-secondary.vue'),
        'styles-primary-secondary-custom': require('./styles-primary-secondary-custom.vue'),
        'styles-accent': require('./styles-accent.vue'),
        'styles-icon-within': require('./styles-icon-within.vue'),
        'styles-icon-only': require('./styles-icon-only.vue'),
        'styles-select': require('./styles-select.vue')
    }
};
</script>
