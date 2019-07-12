<template>
    <article class="article">
        <header class="article__title">Tinted box</header>
        <spec
            v-for="color of $root.colorsSemaphore"
            :key="color"
            :name="color"
            :code="`p.box.box--${ color }`"
            source="box.css">
            <div class="group">
                <box-sample :class="`box box--${ color }`" />
            </div>
        </spec>
    </article>
</template>

<script>
import Sample from './box-sample.vue';

export default {
    name: 'boxes',

    components: {
        'box-sample': Sample
    }
};
</script>
