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
import Snippet from './snippet.vue';

export default {
    name: 'spec',

    props: {
        name: { type: String, required: true },
        source: { type: String, required: true },
        code: { type: String, required: false, default: '' },
        hint: { type: String, required: false, default: '' }
    },

    components: {
        snippet: Snippet
    }
};
</script>
