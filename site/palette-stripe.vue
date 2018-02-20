<template>
    <div>
        <span>{{ name }}</span>
        <div class="ui-palete__color" :style="{ background: color }">
            <span class="ui-palete__color-swatch">{{ color }}</span>
            <span class="ui-palete__color-swatch ui-palete__color-swatch--subtle"></span>
            <span class="ui-palete__color-swatch ui-palete__color-swatch--pale"></span>
            <span class="ui-palete__color-swatch ui-palete__color-swatch--light"></span>
            <span class="ui-palete__color-swatch ui-palete__color-swatch--dust"></span>
            <span class="ui-palete__color-swatch ui-palete__color-swatch--dark"></span>
            <span v-if="gray" class="ui-palete__color-swatch ui-palete__color-swatch--dim"></span>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        name: { type: String, required: true },
        color: { type: String, required: true },
        gray: { type: Boolean, required: false },
    },
};
</script>

<style lang="css">
.ui-palete {
    display: flex;
    font-size: 80%;
}

.ui-palete__color {
    display: flex;
    flex-direction: column;
}

.ui-palete__color-swatch {
    display: inline-flex;
    width: 60px;
    height: 30px;
    color: white;
    padding: var(--gap);
    white-space: nowrap;
}

.ui-palete__color-swatch--subtle {
    background: rgba(255, 255, 255, .7);
    height: 50px;
}

.ui-palete__color-swatch--pale {
    background: rgba(255, 255, 255, .5);
    height: 50px;
}

.ui-palete__color-swatch--light {
    background: rgba(255, 255, 255, .2);
    height: 120px;
}

.ui-palete__color-swatch--dust {
    background: rgba(0, 0, 10, .2);
    height: 120px;
}

.ui-palete__color-swatch--dark {
    background: rgba(0, 0, 10, .45);
    height: 120px;
}

.ui-palete__color-swatch--dim {
    background: rgba(0, 0, 0, .6);
    height: 120px;
}
</style>
