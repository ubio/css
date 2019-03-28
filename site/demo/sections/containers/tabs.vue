<template>
    <article>
        <header class="article__title">Tabs</header>
        <spec
            name="Basic tabs"
            :code="`.tabs .tabs__item[.tabs__item--active]`"
            source="tabs.css">
            <div>
                <menu class="tabs group group--gap">
                    <span v-for="tab in tabs"
                        :key="tab"
                        class="tabs__item"
                        @click="activeTab = tab"
                        :class="{ 'tabs__item--active': tab === activeTab }">
                        {{ tab }}
                    </span>
                </menu>
                <div class="box">
                    <p>
                        <b>{{ activeTab }} content</b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet sollicitudin tellus, eget eleifend sapien volutpat sed. Curabitur vestibulum vitae dui et tincidunt. Proin tellus magna, imperdiet nec rutrum id, pulvinar vitae nunc. Quisque eu ligula eleifend, fringilla enim sit amet, porttitor felis.
                    </p>
                </div>
            </div>
        </spec>
        <spec
            name="Tabs with icons"
            :code="`.tabs .tabs__item[.tabs__item--active]`"
            source="tabs.css">
            <div>
                <menu class="tabs group group--gap">
                    <span v-for="tab in tabs"
                        :key="tab"
                        class="tabs__item"
                        @click="activeTabIcons = tab"
                        :class="{ 'tabs__item--active': tab === activeTabIcons }">
                        <i :class="`tabs__icon fas fa-${ tab.toLowerCase() }`"></i>
                        <span>{{ tab }}</span>
                    </span>
                </menu>
                <div class="box">
                    <p>
                        <b>{{ activeTabIcons }} content</b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet sollicitudin tellus, eget eleifend sapien volutpat sed. Curabitur vestibulum vitae dui et tincidunt. Proin tellus magna, imperdiet nec rutrum id, pulvinar vitae nunc. Quisque eu ligula eleifend, fringilla enim sit amet, porttitor felis. Donec nec varius felis, non imperdiet nunc.
                    </p>
                </div>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'tabs',

    data() {
        return {
            tabs: ['Database', 'Magic', 'Check'],
            activeTab: 'Database',
            activeDarkTab: 'Database',
            activeTabIcons: 'Database'
        };
    }
};
</script>
