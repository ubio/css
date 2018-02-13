<template>
    <div class="app">
        <div class="app__container">
            <h1 class="app__title">
                <img class="app__logo" src="./img/ubio-logo.png" width="96" alt="ubio"/>
                <b>UBIO</b>
                <span>CSS Framework</span>
            </h1>
            <section-colours/>
            <section-typography/>
            <section-controls/>
        </div>
    </div>
</template>

<script>
module.exports = {
    components: {
        'section-colours': require('./section-colours.vue'),
        'section-typography': require('./section-typography.vue'),
        'section-controls': require('./section-controls.vue'),
    },
};
</script>

<style lang="css">
@import "stylesheets/index.css";

body {
    background: var(--ui-pale);
}

.app__container {
    margin: 0 auto;
}

@media (min-width: 960px) {
    .app__container {
        width: 720px;
    }
}

.app__title {
    margin: 0;
    padding: var(--gap-large) 0 0;
    display: flex;
    flex-flow: row nowrap;
    font-size: 28px;
    align-items: center;
    color: var(--ui-secondary--inverse);
}

.app__logo {
    --logo-size: 48px;
    position: relative;
    top: -2px;
    margin-right: var(--gap);
    width: var(--logo-size);
    height: var(--logo-size);
}

.section {
    margin: var(--gap-large) 0;
}

.section__title {
    background: var(--ui-secondary--inverse);
    color: white;
}

.section__title h1 {
    margin: 0;
    padding: var(--gap-small) var(--gap);
    font-size: 14px;
}

.section__body {
    padding: var(--gap);
    background: var(--ui-base);
}
</style>
