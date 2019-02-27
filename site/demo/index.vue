<template>
    <div class="demo" :class="{ 'theme--night-dark': $root.darkMode }">
        <navigation
            :sections="sections" />

        <div class="demo__container">
            <section
                v-for="(sectionTitle, component) in sections"
                :key="component"
                :id="component"
                class="section"
                :class="activeItem === component ? 'section--active' : ''">
                <header>{{ sectionTitle }}</header>
                <component :is="component" />
            </section>
        </div>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            sections: {
                'colour': 'Colour',
                'typography': 'Typography',
                'buttons': 'Buttons',
                'inputs': 'Inputs',
                'badges': 'Badges',
                'tags': 'Tags',
                'containers': 'Containers',
                'loaders': 'Loaders'
            }
        };
    },

    components: {
        'navigation': require('./navigation.vue'),
        'colour': require('./sections/colour/index.vue'),
        'typography': require('./sections/typography/index.vue'),
        'buttons': require('./sections/button/index.vue'),
        'inputs': require('./sections/inputs/index.vue'),
        'badges': require('./sections/badge.vue'),
        'tags': require('./sections/tag.vue'),
        'containers': require('./sections/containers/index.vue'),
        'loaders': require('./sections/loaders/index.vue')
    }
};
</script>

<style lang="css">
@import '../css/stylesheets/index.css';
@import '../css/site/demo/demo.css';
@import '../css/site/demo/navigation.css';
</style>
