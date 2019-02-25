<template>
    <article class="article">
        <header class="article__title">Default background (white)</header>
        <spec
            name="Text samples"
            :code="`.color--[name]`"
            source="color.css">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
                <div
                    v-for="color of $root.colors"
                    class="box"
                    :key="color">
                    <p>
                        <span
                            class="badge badge--small"
                            :class="`badge--${ color }`">
                            {{ color }}
                        </span>
                    </p>
                    <text-variations-sample
                    :class="`color--${ color } bg--default`" />
                </div>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'bg-white',

    components: {
        'text-variations-sample': require('./text-variations-sample.vue')
    }
};
</script>
