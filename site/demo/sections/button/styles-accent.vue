<template>
    <spec
        name="Accent"
        code=".button.button--accent"
        hint="To use with sets"
        source="button.css">
        <div class="group group--gap--large">
            <div class="box box--mono group group--semi-merged">
                <button class="button button--accent">All</button>
                <button class="button">Live</button>
                <button class="button">Test</button>
            </div>
            <div class="box bg--cool--dark group group--semi-merged">
                <button class="button button--accent">All</button>
                <button class="button button--dark-mode">Live</button>
                <button class="button button--dark-mode">Test</button>
            </div>
        </div>
    </spec>
</template>

<script>
module.exports = {
    name: 'button-styles-accent',
};
</script>
