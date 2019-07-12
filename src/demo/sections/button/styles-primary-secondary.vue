<template>
    <spec
        name="Primary & Secondary"
        :code="`.button.button--primary\n.button.button--secondary`"
        hint="There supposed to be only one primary action per context"
        source="button.css">
        <div class="grid grid--gap">
            <div class="group group--gap">
                <a class="button button--primary">Primary</a>
                <a class="button button--secondary">Secondary</a>
                <a class="button button--primary" disabled>Disabled primary</a>
                <a class="button button--secondary" disabled>Disabled secondary</a>
            </div>
        </div>
    </spec>
</template>

<script>
export default {
    name: 'button-styles-primary-secondary'
};
</script>
