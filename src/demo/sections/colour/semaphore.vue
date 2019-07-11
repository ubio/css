<template>
    <article class="article">
        <spec
            name="Semaphore"
            :code="`.color--[name]`"
            source="color.css">
            <div
                style="grid-template-columns: repeat(4, 1fr);"
                class="grid grid--gap">
                <div
                    v-for="color of $root.colorsSemaphore"
                    class="box"
                    :key="color">
                    <p>
                        <span
                            class="badge badge--small"
                            :class="`badge--${ color }`">
                            {{ color }}
                        </span>
                    </p>
                    <text-variations-sample :class="`color--${ color }`" />
                </div>
            </div>
        </spec>
    </article>
</template>

<script>
import Sample from './text-variations-sample.vue';

export default {
    name: 'semaphore',

    components: {
        'text-variations-sample': Sample
    }
};
</script>
