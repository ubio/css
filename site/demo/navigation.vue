<template>
    <header class="navigation" id="top">
        <div class="navigation__headline">
            <span class="navigation__headline-logo">
                <svg
                    viewBox="0 0 32.42 28.7"
                    width="42"
                    fill="currentColor">
                    <path d="M16.8 14.3C16.8 11.2 19.3 8.7 22.5 8.7 25.6 8.7 28.1 11.2 28.1 14.3 28.1 17.5 25.6 20 22.5 20 19.3 20 16.8 17.5 16.8 14.3ZM4.3 14.3C4.3 11.2 6.9 8.7 10 8.7 13.1 8.7 15.7 11.2 15.7 14.3 15.7 17.5 13.1 20 10 20 6.9 20 4.3 17.5 4.3 14.3ZM25.1 1C24.7 0.4 24 0 23.3 0L9.1 0C8.4 0 7.7 0.4 7.4 1L0.3 13.3C-0.1 14-0.1 14.7 0.3 15.4L7.4 27.7C7.7 28.3 8.4 28.7 9.1 28.7L23.3 28.7C24 28.7 24.7 28.3 25.1 27.7L32.2 15.4C32.5 14.7 32.5 14 32.2 13.3L25.1 1ZM20.3 14.3C20.3 13.1 21.3 12.2 22.5 12.2 23.7 12.2 24.6 13.1 24.6 14.3 24.6 15.5 23.7 16.5 22.5 16.5 21.3 16.5 20.3 15.5 20.3 14.3ZM19.4 14.3C19.4 16 20.8 17.4 22.5 17.4 24.2 17.4 25.5 16 25.5 14.3 25.5 12.6 24.2 11.3 22.5 11.3 20.8 11.3 19.4 12.6 19.4 14.3ZM6.9 14.3C6.9 16 8.3 17.4 10 17.4 11.7 17.4 13.1 16 13.1 14.3 13.1 12.6 11.7 11.3 10 11.3 8.3 11.3 6.9 12.6 6.9 14.3Z"></path>
                </svg>
            </span>
            <h1 class="navigation__headline-title">
                <b>ubio</b>
                <span>CSS Framework</span>
                <sub class="text--muted">v2.0</sub>
            </h1>
        </div>

        <menu class="navigation__menu">
            <a
                v-for="(section, key) in sections"
                class="navigation__menu-item"
                :class="{ 'navigation__menu-item--active': key === activeMenuItem }"
                @click="activeMenuItem = key"
                :href="'#' + key"
                :key="key">
                <i class="fa navigation-icon" :class="{
                    'fas fa-paint-brush': key === 'colour',
                    'fas fa-font': key === 'typography',
                    'fas fa-hand-pointer': key === 'buttons',
                    'fas fa-keyboard': key === 'inputs',
                    'fas fa-columns': key === 'containers',
                    'fas fa-certificate': key === 'badges',
                    'fas fa-tag': key === 'tags',
                    'fas fa-spinner': key === 'loaders',
                    'fas fa-gift': key === 'other'
                }"></i>
                {{ section }}
            </a>
        </menu>

        <a href="#top" class="navigation__up" title="UP!">
            <i class="fas fa-angle-double-up"></i>
        </a>
    </header>
</template>

<script>
module.exports = {
    props: {
        sections: { type: Object, required: true }
    },

    created() {
        this.$nextTick(() => this.scrollToActive());
    },

    watch: {
        activeMenuItem(hash) {
            if (hash) {
                this.scrollToActive();
            }
        }
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
        }
    }
};
</script>
