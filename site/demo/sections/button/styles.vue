<template>
    <article>
        <header>Styles</header>
        <styles-primary-secondary />
        <styles-flat />
        <styles-accent />
        <styles-primary-secondary-custom />
        <styles-icon-within />
        <styles-icon-only />
    </article>
</template>

<script>
module.exports = {
    name: 'button-styles',

    components: {
        'styles-primary-secondary': require('./styles-primary-secondary.vue'),
        'styles-primary-secondary-custom': require('./styles-primary-secondary-custom.vue'),
        'styles-flat': require('./styles-flat.vue'),
        'styles-accent': require('./styles-accent.vue'),
        'styles-icon-within': require('./styles-icon-within.vue'),
        'styles-icon-only': require('./styles-icon-only.vue'),
    },
};
</script>
