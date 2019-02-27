<template>
    <article class="article">
        <header class="article__title">Outlined box</header>
        <spec
            v-for="color of $root.colorsSemaphore"
            :key="color"
            :name="color"
            :code="`p.box.box--${ color }--outline`"
            source="box.css">
            <div class="group">
                <box-sample :class="`box box--${ color }--outline`" />
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'box-outline',

    components: {
        'box-sample': require('./box-sample.vue')
    }
};
</script>
