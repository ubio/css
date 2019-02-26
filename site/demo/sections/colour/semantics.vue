<template>
    <article class="article">
        <header class="article__title">Semantics</header>
        <spec
            name="White background"
            :code="`.color--[name]`"
            source="color.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr;"
                class="grid grid--gap">
                <div
                    v-for="color of ['default', 'primary', 'secondary']"
                    class="box"
                    :key="color">
                    <p>
                        <span
                            class="badge badge--outline badge--small"
                            :class="`color--${ color }`">
                            {{ color }}
                        </span>
                    </p>
                    <p :class="`color--${ color } bg--default`">
                        Lorem ipsum. Ut non condimentum mauris, eu sodales neque.
                    </p>
                </div>
            </div>
        </spec>
        <spec
            name="Dark background"
            :code="`.color--[name]--dark-mode`"
            source="color.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap">
                <div
                    v-for="color of ['default', 'primary', 'secondary']"
                    class="box bg--dark-mode"
                    :key="color">
                    <p>
                        <span
                            class="badge badge--outline badge--small"
                            :class="`color--${ color }--dark-mode`">
                            {{ color }}
                        </span>
                    </p>
                    <p :class="`color--${ color }--dark-mode`">
                        Lorem ipsum. Ut non condimentum mauris, eu sodales neque.
                    </p>
                </div>
            </div>
        </spec>
        <spec
            name="Universal"
            :code="`.color--[name]`"
            hint="Readable on both white and dark"
            source="color.css">
            <div
                style="grid-template-columns: 1fr 1fr;"
                class="grid grid--gap">
                <div
                    v-for="color of ['accent', 'muted']"
                    class="grid grid--gap"
                    :key="color">
                    <div class="box">
                        <p>
                            <span
                                class="badge badge--outline badge--small"
                                :class="`color--${ color }`">
                                {{ color }}
                            </span>
                        </p>
                        <p :class="`color--${ color }`">
                            Lorem ipsum. Ut non condimentum mauris, eu sodales neque.
                        </p>
                    </div>
                    <div class="box bg--dark-mode">
                        <p>
                            <span
                                class="badge badge--outline badge--small"
                                :class="`color--${ color }`">
                                {{ color }}
                            </span>
                        </p>
                        <p :class="`color--${ color }`">
                            Lorem ipsum. Ut non condimentum mauris, eu sodales neque.
                        </p>
                    </div>
                </div>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'semantics',

    components: {
        'text-variations-sample': require('./text-variations-sample.vue')
    }
};
</script>
