<template>
    <div class="demo" :class="{ 'theme--night-dark': $root.darkMode }">
        <navigation :sections="sections"></navigation>

        <div class="demo__container">
            <section
                v-for="(sectionTitle, component) in sections"
                :key="component"
                :id="component"
                class="section"
                :class="activeItem === component ? 'section--active' : ''">
                <header>{{ sectionTitle }}</header>
                <component :is="component"></component>
            </section>
        </div>
    </div>
</template>

<script>
import Navigation from './navigation.vue';
import Colour from './sections/colour/index.vue';
import Typography from './sections/typography/index.vue';
import Buttons from './sections/button/index.vue';
import Inputs from './sections/inputs/index.vue';
import Badges from './sections/badge.vue';
import Tags from './sections/tag.vue';
import Containers from './sections/containers/index.vue';
import Loaders from './sections/loaders/index.vue';

export default {
    data() {
        return {
            activeItem: '',
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
        'navigation': Navigation,
        'colour': Colour,
        'typography': Typography,
        'buttons': Buttons,
        'inputs': Inputs,
        'badges': Badges,
        'tags': Tags,
        'containers': Containers,
        'loaders': Loaders
    }
};
</script>
