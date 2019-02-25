<template>
    <div class="spec">
        <div class="spec__description">
            <div class="spec__name">
                <span v-html="name"></span>
                <slot name="name"></slot>
            </div>
            <div  class="spec__hint"
                v-html="hint"></div>
        </div>
        <slot></slot>
        <snippet :source="source" :code="code || name" />
    </div>
</template>

<script>
module.exports = {
    name: 'spec',

    props: {
        name: { type: String, required: true },
        source: { type: String, required: true },
        code: { type: String, required: false, default: '' },
        hint: { type: String, required: false, default: '' }
    },

    components: {
        snippet: require('./snippet.vue')
    }
};
</script>

<style>
.spec {
    display: grid;
    grid-template-columns: 160px 2fr 1fr;
    grid-column-gap: 40px;
    align-items: start;
    justify-items: start;
}

.spec__description {
    color: var(--color-blue--500);
    line-height: 1.5;
    margin: .5rem 0;
}

.spec__hint {
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    font-size: var(--font-size--small);
}

.spec__name {
    font-weight: 600;
    grid-gap: var(--gap--small);
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
}
</style>
