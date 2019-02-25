<template>
    <article>
        <spec
            name="Base pure HTML button"
            code="button, button:disabled"
            source="base.css">
            <div class="group group--gap">
                <button>Base button</button>
                <button disabled>Base button disabled</button>
            </div>
        </spec>
        <spec
            name=".button"
            :code="`a.button\na.button[disabled]`"
            source="button.css">
            <div class="group group--gap">
                <a class="button">Link as a button</a>
                <a class="button" disabled>Disabled link as a button</a>
            </div>
        </spec>
        <spec
            name="Small, normal & large scalers"
            :code="`.button.button--small\n.button\n.button.button--large`"
            source="button.css">
            <div class="group group--gap">
                <a class="button button--small">Small</a>
                <a class="button">Regular</a>
                <a class="button button--large">Large</a>
            </div>
        </spec>
        <spec
            name="Custom size & colour"
            :code="`.button, .button--small, .button--large`"
            :hint="`Amend variables:\n<code>--cta-color--default</code>\n<code>--cta-color--default--active</code>\n<code>--font-size</code>`"
            source="variables.css, button.css">
            <div
                class="group group--gap"
                style="--font-size: 16px;">
                <a class="button button--small">Small button</a>
                <a class="button">Regular button</a>
                <a class="button button--large">Large button</a>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'button-base-size'
};
</script>
