<template>
    <article class="article">
        <header class="article__title">Pale background (messages)</header>
        <spec
            name="Grey colors"
            :code="`.color--[name]\n.bg--[name]--pale`"
            source="color.css, bg.css">
            <div
                class="grid grid--gap"
                style="align-items: stretch; grid-template-columns: 1fr 1fr 1fr;">
                <div
                    v-for="color of $root.colorsGrey"
                    :key="color">
                    <div
                        class="box--panel"
                        :class="`bg--${ color }--pale color--${ color }`">
                        <b>{{ color.toUpperCase() }} text</b>.
                        Ut non condimentum mauris, eu sodales
                        neque.
                    </div>
                </div>
            </div>
        </spec>
        <spec
            name="Semaphore colors"
            :code="`.color--[name]\n.bg--[name]--pale`"
            source="color.css, bg.css">
            <div
                class="grid grid--gap"
                style="align-items: stretch; grid-template-columns: 1fr 1fr 1fr 1fr;">
                <div
                    v-for="color of $root.colorsSemaphore"
                    :key="color">
                    <div
                        class="box"
                        :class="`bg--${ color }--pale color--${ color }`">
                        <b>Lorem ipsum</b>.
                        Ut non condimentum mauris, eu sodales
                        neque.
                    </div>
                </div>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'bg--pale',
};
</script>
