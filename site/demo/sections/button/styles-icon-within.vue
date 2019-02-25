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
                    <i class="button__icon fas fa-bullseye"></i>
                    Regular
                </a>
                <a class="button button--small">
                    <i class="button__icon fas fa-bullseye"></i>
                    Small
                </a>
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
                    <i class="button__icon fas fa-bullseye"></i>
                    Small
                </a>
            </div>
            <div
                class="grid grid--gap"
                style="grid-template-columns: repeat(7, auto);">
                <a class="button button--secondary button--large">
                    <i class="button__icon fas fa-bullseye"></i>
                    Large
                </a>
                <a class="button button--secondary">
                    <i class="button__icon fas fa-bullseye"></i>
                    Regular
                </a>
                <a class="button button--secondary button--small">
                    <i class="button__icon fas fa-bullseye"></i>
                    Small
                </a>
            </div>
        </div>
    </spec>
</template>

<script>
module.exports = {
    name: 'button-styles-icon-within'
};
</script>
