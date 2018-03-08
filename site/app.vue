<template>
    <div class="app">
        <nav
            class="app__navigation"
            :class="{
                'app__navigation--expanded': menuExpanded,
                'app__navigation--collapsed': !menuExpanded,
            }">
            <h1 class="app__title">
                <b>UBIO</b>
                <span>CSS Framework</span>
            </h1>
            <menu class="app__menu">
                <img
                    @click="menuExpanded = !menuExpanded"
                    class="app__logo"
                    :class="{ 'app__logo--zoomed': menuExpanded}"
                    src="./img/ubio-logo--white.png"
                    alt="ubio" />
                <a
                    v-for="item in menu"
                    class="app__menu-item"
                    :class="{ 'app__menu-item--active': item === activeMenuItem }"
                    @click="activeMenuItem = item"
                    :href="'#' + item">
                    <i class="fa app__menu-icon" :class="{
                        'fa-paint-brush': item === 'colours',
                        'fa-font': item === 'typography',
                        'fa-tag': item === 'badges',
                        'fa-gamepad': item === 'controls',
                        'fa-columns': item === 'layout',
                        'fa-wrench': item === 'tools',
                    }"></i>
                    <span v-if="menuExpanded">{{ item }}</span>
                </a>
            </menu>
        </nav>
        <div class="app__container">
            <section-colours :active-item="activeMenuItem" />
            <section-typography :active-item="activeMenuItem" />
            <section-badges :active-item="activeMenuItem" />
            <section-controls :active-item="activeMenuItem" />
            <section-layout :active-item="activeMenuItem" />
            <section-tools :active-item="activeMenuItem" />
        </div>

        <ul class="brand-pallette">
            <li><a class="brand-pallette__swatch brand-pallette__swatch--core" title="base/core colour"></a></li>
            <li><a class="brand-pallette__swatch brand-pallette__swatch--primary" title="primary contrast"></a></li>
            <li><a class="brand-pallette__swatch brand-pallette__swatch--complimentary" title="complimentary"></a></li>
            <li><a class="brand-pallette__swatch brand-pallette__swatch--tertiary-medium" title="tertiary medium"></a></li>
            <li><a class="brand-pallette__swatch brand-pallette__swatch--tertiary-dark" title="tertiary dark"></a></li>
            <li><a class="brand-pallette__swatch brand-pallette__swatch--mono-white" title="mono white"></a></li>
            <li><a class="brand-pallette__swatch brand-pallette__swatch--mono-gray" title="mono gray"></a></li>
            <li><a class="brand-pallette__swatch brand-pallette__swatch--mono-black" title="mono black"></a></li>
        </ul>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            menu: ['colours', 'typography', 'badges', 'controls', 'layout', 'tools'],
            activeMenuItem: window.location.hash.replace('#', ''),
            menuExpanded: false,
        };
    },

    created() {
        this.$nextTick(() => this.scrollToActive());
    },

    watch: {
        activeMenuItem(hash) {
            if (hash) {
                this.scrollToActive();
            }
        },
    },

    methods: {
        scrollToActive() {
            if (!this.activeMenuItem) {
                return;
            }

            try {
                const el = this.$el.querySelector('#' + this.activeMenuItem);
                if (el) {
                    el.scrollIntoViewIfNeeded();
                }
            } catch (err) { }
        },
    },

    components: {
        'section-colours': require('./section-colours.vue'),
        'section-typography': require('./section-typography.vue'),
        'section-controls': require('./section-controls.vue'),
        'section-layout': require('./section-layout.vue'),
        'section-badges': require('./section-badges.vue'),
        'section-tools': require('./tools/index.vue'),
    },
};
</script>

<style lang="css">
@import "stylesheets/index.css";

body, html {
    height: 100%;
}

:root {
    --app-nav-bg: var(--color-cool--800);
    --app-nav-color: #fff;
    --app-highlight: #27B9CC;
    --app-highlight--inverse: white;
}

.app {
    display: flex;
    height: 100%;
}

.app__navigation {
    --nav-size: 140px;
    display: flex;
    flex-direction: column;
    background: var(--app-nav-bg);
    color: var(--app-nav-color);
    padding: 0;
}

.app__navigation--expanded {
    min-width: var(--nav-size);
}

.app__title {
    display: block;
    font-size: 16px;
    position: fixed;
    bottom: var(--gap);
    left: 0;
    height: 160px;
    line-height: 44px;
    transform: rotate(-90deg);
    margin: 0;
    padding: 0;
    color: var(--ui-secondary);
    pointer-events: none;
}

.app__logo {
    --logo-size: 24px;
    display: inline-block;
    vertical-align: baseline;
    margin-right: 2px;
    width: var(--logo-size);
    margin: var(--gap);
    cursor: pointer;
}

.app__logo--zoomed {
    width: calc(var(--logo-size) * 1.5);
}

.app__menu {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex: 1;
    font-size: 14px;
    line-height: 1.5;
    text-transform: capitalize;
}

.app__menu-item {
    color: currentColor;
    padding: var(--gap);
    width: 100%;
}

.app__menu-item--active {
    color: var(--app-highlight);
    position: relative;
}

.app__menu-item--active:after {
    --arrow-size: 4px;
    position: absolute;
    right: 6px;
    top: 50%;
    margin-top: calc(-.5 * var(--arrow-size));
    content: '';
    display: block;
    width: var(--arrow-size);
    height: var(--arrow-size);
    border-radius: var(--arrow-size);
    background: var(--app-highlight);
}

.app__menu-icon {
    width: 20px;
    margin: 0 2px;
    text-align: center;
}

.app__container {
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    overflow: auto;
    border-left: var;
}

@media (min-width: 960px) {
    .app__container {
        /*width: 720px;*/
    }
}

.section {
    --bookmark-size: 27px;
    margin: 0;
    width: 100%;
    display: flex;
    border-top: 1px dashed var(--color-warm--300);
    min-height: 140px;
}

.section:first-child {
    border-top: 0;
}

.section--active {
    --marker-size: 35px;
    background: #fff;
    position: relative;
}

.section__title {
    display: block;
    background: var(--color-warm--100);
    color: var(--app-nav-bg);
    position: relative;
    padding: var(--gap);
    margin: 0;
    padding: 0;
    line-height: var(--bookmark-size);
}

.section__title--active {
    background: var(--app-highlight);
    color: var(--app-highlight--inverse);
}

.section__title-icon {
    --icon-size: var(--bookmark-size);
    font-size: 16px;
    width: var(--icon-size);
    height: var(--icon-size);
    line-height: var(--icon-size);
    text-align: center;
}

.section__title-label {
    display: inline-block;
    transform: rotate(-90deg);
    position: absolute;
    bottom: 0;
    width: var(--bookmark-size);
    line-height: 40px;
    font-size: 13px;
    font-weight: 300;
    text-transform: uppercase;
}

.section__body {
    padding: var(--gap) var(--gap--large) var(--gap--large);
    width: calc(100% - var(--bookmark-size));
    box-sizing: border-box;
}

.section__table {
    width: 100%;
}

.section__table th,
.section__table td {
    border: 1px solid #fff;
    padding: var(--gap--small) var(--gap);
    text-align: left;
}

.section__table th {
    background: var(--ui-secondary--inverse);
    color: #fff;
    font-family: var(--font-family--mono);
    font-weight: 300;
}

.section__table td {
    background: var(--color-warm--100);
}

.brand-pallette {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1;
    right: 0;
    top: 0;
    margin: var(--gap);
}

.brand-pallette__swatch {
    --brand-swatch__size: 40px;
    display: block;
    height: var(--brand-swatch__size);
    width: calc(var(--brand-swatch__size) / 3);
}

.brand-pallette__swatch--core { background: #27B9CC; }
.brand-pallette__swatch--primary { background: #FF5A5F; }
.brand-pallette__swatch--complimentary { background: #D6D6D0; }
.brand-pallette__swatch--tertiary-medium { background: #628395; }
.brand-pallette__swatch--tertiary-dark { background: #424B54; }
.brand-pallette__swatch--mono-white { background: #fff; }
.brand-pallette__swatch--mono-gray { background: #ccc; }
.brand-pallette__swatch--mono-black { background: #000; }

</style>
