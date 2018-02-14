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
                        'fa-gamepad': item === 'controls',
                    }"></i>
                    <span v-if="menuExpanded">{{ item }}</span>
                </a>
            </menu>
        </nav>
        <div class="app__container">
            <section-colours :active-item="activeMenuItem" />
            <section-typography :active-item="activeMenuItem" />
            <section-controls :active-item="activeMenuItem" />
        </div>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            menu: ['colours', 'typography', 'controls'],
            activeMenuItem: window.location.hash.replace('#', ''),
            menuExpanded: false,
        };
    },

    components: {
        'section-colours': require('./section-colours.vue'),
        'section-typography': require('./section-typography.vue'),
        'section-controls': require('./section-controls.vue'),
    },
};
</script>

<style lang="css">
@import "stylesheets/index.css";

body, html {
    height: 100%;
}

:root {
    --app-nav-bg: var(--ui-base--inverse);
    --app-nav-color: var(--ui-base);
    --app-highlight: var(--ui-accent);
    --app-highlight--inverse: var(--ui-accent--inverse);
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
    background: var(--ui-base);
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
    margin: 0;
    width: 100%;
    display: flex;
    border-top: 1px dashed var(--border-color);
}

.section:first-child {
    border-top: 0;
}

.section--active {
    --marker-size: 35px;
    background: var(--ui-base);
    position: relative;
}

.section__title {
    background: var(--ui-pale);
    color: var(--app-nav-bg);
    position: relative;
}

.section__title--active {
    background: var(--app-highlight);
    color: var(--app-highlight--inverse);
}

.section__title h1 {
    display: block;
    padding: var(--gap);
    margin: 0;
    padding: 0;
    line-height: 27px;
}

.section__title h1 i {
    --icon-size: 27px;
    font-size: 16px;
    width: var(--icon-size);
    height: var(--icon-size);
    text-align: center;
}

.section__title h1 span {
    display: inline-block;
    transform: rotate(-90deg);
    position: absolute;
    bottom: 0;
    width: 27px;
    line-height: 40px;
    font-size: 14px;
    text-transform: uppercase;
}

.section__body {
    padding: 0 var(--gap-large) var(--gap);
}
</style>
