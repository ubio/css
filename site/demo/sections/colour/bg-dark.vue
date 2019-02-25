<template>
    <article class="article">
        <header class="article__title">Dark background</header>
        <spec
            name="Grey colors"
            :code="`.color--[name]\n.bg--[name]--dark`"
            source="color.css, bg.css">
            <div
                class="grid grid--gap"
                style="align-items: stretch; grid-template-columns: 1fr 1fr 1fr;">
                <div v-for="color of $root.colorsGrey" :key="color">
                    <div
                        class="box--panel"
                        :class="`bg--${ color }--dark color--${ color }`">
                        <p>
                            <span
                                class="badge badge--fixed badge--outline"
                                :class="`color--${ color }`">{{ color }}</span>
                            <span
                                class="badge badge--fixed"
                                :class="`badge--${ color }`">{{ color }}</span>
                            <span
                                class="badge badge--fixed"
                                :class="`badge--${ color }--light`">{{ color }}</span>
                        </p>
                        <p class="color--dark-mode">
                            <b>Inversed text</b>. Eu sodales neque.
                        </p>
                        <p class="color--muted">
                            <b>Muted text</b>.
                            Ut non <a>link</a> mauris, eu <mark>highlight</mark>
                            neque.
                        </p>
                        <p>
                            <small class="color--red">99.999%</small>
                            <span class="color--red">50.00%</span>
                            <big class="color--red">99.99%</big><br/>
                            <big class="color--yellow">99.99%</big>
                            <span class="color--yellow">50.00%</span>
                            <small class="color--yellow">99.999%</small><br/>
                            <small class="color--green">99.999%</small>
                            <span class="color--green">50.00%</span>
                            <big class="color--green">99.99%</big>
                        </p>
                        <p>
                            <button class="button--primary">Primary</button>
                            <button class="button--secondary">Secondary</button>
                        </p>
                        <p>
                            <button>Default</button>
                            <button class="button--dark-mode">Default</button>
                            <i class="color--primary fas fa-bullseye"></i>
                            <i class="color--secondary fas fa-bullseye"></i>
                            <i class="color--muted fas fa-bullseye"></i>
                        </p>
                    </div>
                </div>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'bg--dark',
};
</script>
