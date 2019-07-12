<template>
    <spec
        name="Primary & Secondary custom"
        :code="`.button.button--primary\n.button.button--secondary`"
        :hint="`Amend variables:\n<code>--ui-color--accent</code>\n<code>--ui-color--accent--hover</code>\n<code>--font-size</code>`"
        source="variables.css, button.css">
        <div
            style="--ui-color--accent--hover: var(--color-brand-red--600); --ui-color--accent: var(--color-brand-red--500); --font-size: 16px"
            class="group group--gap">
            <a class="button button--primary">Primary</a>
            <a class="button button--secondary">Secondary</a>
        </div>
    </spec>
</template>

<script>
export default {
    name: 'button-styles-primary-secondary-custom'
};
</script>
