<template>
    <spec
        name="Primary & Secondary custom"
        :code="`.button.button--primary\n.button.button--secondary`"
        :hint="`Amend variables:\n<code>--cta-color--accent</code>\n<code>--cta-color--accent--active</code>\n<code>--font-size</code>`"
        source="variables.css, button.css">
        <div
            style="--cta-color--accent--active: var(--color-brand-red--600); --cta-color--accent: var(--color-brand-red--500); --font-size: 16px"
            class="group group--gap">
            <a class="button button--primary">Primary</a>
            <a class="button button--secondary">Secondary</a>
        </div>
    </spec>
</template>

<script>
module.exports = {
    name: 'button-styles-primary-secondary-custom'
};
</script>
