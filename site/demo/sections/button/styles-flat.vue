<template>
    <spec
        name="Flat button"
        :code="`.button.button--flat`"
        source="button.css">
        <div class="group group--gap">
            <a class="button button--flat button--small">Small</a>
            <a class="button button--flat">Regular</a>
            <a class="button button--flat button--primary">Primary</a>
            <a class="button button--secondary button--primary">Secondary</a>
            <a class="button button--flat button--large">Large</a>
        </div>
    </spec>
</template>

<script>
module.exports = {
    name: 'button-styles-flat',
};
</script>
