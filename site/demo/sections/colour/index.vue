<template>
    <div>
        <article class="article">
            <header class="article__title">Palette</header>
            <swatches/>
        </article>

        <semantics />
        <semaphore />
        <bg-pale />
    </div>
</template>

<script>
module.exports = {
    name: 'colour',

    components: {
        'swatches': require('./swatches.vue'),
        'semantics': require('./semantics.vue'),
        'semaphore': require('./semaphore.vue'),
        'bg-pale': require('./bg-pale.vue')
    }
};
</script>
