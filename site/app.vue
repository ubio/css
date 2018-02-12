<template>
    <div class="app">
        <div class="app__container">
            <h1 class="app__title">
                <img class="app__logo" src="./img/ubio-logo.png" width="96" alt="ubio"/>
                <span>CSS Framework</span>
            </h1>
            <section-typography/>
            <section-controls/>
        </div>
    </div>
</template>

<script>
module.exports = {
    components: {
        'section-typography': require('./section-typography.vue'),
        'section-controls': require('./section-controls.vue'),
    },
};
</script>

<style lang="css">
@import "stylesheets/index.css";

body {
    background: #f5f5f5;
}

.app__container {
    margin: 0 auto;
}

@media (min-width: 960px) {
    .app__container {
        width: 960px;
    }
}

.app__title {
    margin: 0;
    padding: 32px;
    display: flex;
    flex-flow: row nowrap;
    font-size: 28px;
    align-items: center;
}

.app__logo {
    position: relative;
    top: -2px;
    margin-right: var(--gap);
}

.section {
    margin: 32px 0;
}

.section__title {
    color: #fff;
}

.section__title h1 {
    margin: 0;
    padding: 16px 32px;
    font-size: 24px;
    background: var(--ui-muted);
    color: var(--ui-muted--inverse);
}

.section__body {
    padding: 32px;
    background: var(--ui-base);
}
</style>
