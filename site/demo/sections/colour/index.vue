<template>
    <div>
        <article class="article">
            <header class="article__title">Palette</header>
            <swatches/>
        </article>

        <bg-white />
        <bg-pale />
        <bg-dark />
    </div>
</template>

<script>
module.exports = {
    name: 'colour',

    components: {
        'swatches': require('./swatches.vue'),
        'bg-white': require('./bg-white.vue'),
        'bg-dark': require('./bg-dark.vue'),
        'bg-pale': require('./bg-pale.vue')
    }
};
</script>
