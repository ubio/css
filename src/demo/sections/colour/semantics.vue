<template>
    <article class="article">
        <spec
            name="Semantic"
            :code="`.color--[name]`"
            source="color.css">
            <div
                style="grid-template-columns: repeat(5, 1fr);"
                class="grid grid--gap">
                <div
                    v-for="color of ['default', 'primary', 'secondary', 'accent', 'muted']"
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
    </article>
</template>

<script>
export default {
    name: 'semantics'
};
</script>
