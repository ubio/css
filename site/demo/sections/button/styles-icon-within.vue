<template>
    <spec
        name="Icon within"
        :code="`.button
        .button__icon.fas.fa-bullseye
        ...`"
        source="button.css">
        <div class="grid grid--gap--large">
            <div
                class="grid grid--gap"
                style="grid-template-columns: repeat(7, auto);">
                <a class="button button--large">
                    <i class="button__icon fas fa-bullseye"></i>
                    Large
                </a>
                <a class="button">
                    <spinner class="button__icon" />
                    Regular
                </a>
                <a class="button button--small">
                    <i class="button__icon fas fa-bullseye"></i>
                    Small link
                </a>
                <button class="button--small">
                    <i class="button__icon fas fa-bullseye"></i>
                    Small button
                </button>
            </div>
            <div
                class="grid grid--gap"
                style="grid-template-columns: repeat(7, auto);">
                <a class="button button--primary button--large">
                    <i class="button__icon fas fa-bullseye"></i>
                    Large
                </a>
                <a class="button button--primary">
                    <i class="button__icon fas fa-bullseye"></i>
                    Regular
                </a>
                <a class="button button--primary button--small">
                    <spinner class="button__icon" />
                    Small link
                </a>
                <button class="button--primary button--small">
                    <spinner class="button__icon" />
                    Small button
                </button>
            </div>
            <div
                class="grid grid--gap"
                style="grid-template-columns: repeat(7, auto);">
                <a class="button button--secondary button--large">
                    <spinner class="button__icon" />
                    Large
                </a>
                <a class="button button--secondary">
                    <i class="button__icon fas fa-bullseye"></i>
                    Regular
                </a>
                <a class="button button--secondary button--small">
                    <i class="button__icon fas fa-bullseye"></i>
                    Small link
                </a>
                <button class="button--secondary button--small">
                    <spinner class="button__icon" />
                    Small button
                </button>
            </div>
        </div>
    </spec>
</template>

<script>
module.exports = {
    name: 'button-styles-icon-within',

    components: {
        spinner: require('../loaders/spinner.vue')
    }
};
</script>
