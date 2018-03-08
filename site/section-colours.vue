<template>
    <div id="colours"
        class="section section-colours"
        :class="{ 'section--active': activeItem === 'colours' }">
        <div
            class="section__title"
            :class="{ 'section__title--active': activeItem === 'colours' }">
            <i class="fa fa-paint-brush section__title-icon"></i>
            <span class="section__title-label">Colours</span>
        </div>

        <div class="section__body">
            <h2>Palette</h2>
            <swatches/>
        </div>

    </div>
</template>

<script>
module.exports = {

    components: {
        swatches: require('./swatches.vue'),
    },

    props: {
        activeItem: { type: String, required: false, default: '' },
    },

};
</script>

<style>
</style>
