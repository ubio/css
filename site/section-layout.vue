<template>
    <div id="layout"
        class="section"
        :class="{ 'section--active': activeItem === 'layout' }">
        <div class="section__title"
            :class="{ 'section__title--active': activeItem === 'layout' }">
            <i class="fa fa-columns section__title-icon"></i>
            <span class="section__title-label">layout</span>
        </div>
        <div class="section__body">
            <article id="tabs">
                <h3>Tabs</h3>
                <menu class="tabs">
                    <a v-for="tab in tabs"
                        href="#"
                        class="tabs__item"
                        @click="activeTab = tab"
                        :class="{ 'tabs__item--active': tab === activeTab }">
                        {{ tab }}
                    </a>
                </menu>
                <div class="tab">
                    <p>
                        <b>{{ activeTab }} content</b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet sollicitudin tellus, eget eleifend sapien volutpat sed. Curabitur vestibulum vitae dui et tincidunt. Proin tellus magna, imperdiet nec rutrum id, pulvinar vitae nunc. Quisque eu ligula eleifend, fringilla enim sit amet, porttitor felis. Donec nec varius felis, non imperdiet nunc. Donec vel suscipit nulla. Aliquam viverra, magna ut fermentum facilisis, mi nunc lacinia justo, ut ornare lorem odio at erat. Integer suscipit nulla quis enim euismod, a dapibus massa condimentum.
                    </p>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        activeItem: { type: String, required: false, default: '' },
    },

    data() {
        return {
            tabs: ['Lorem', 'Ipsum', 'Dolor Sit Amet'],
            activeTab: 'Lorem',
        };
    },
};
</script>
