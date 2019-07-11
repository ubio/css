<template>
    <article>
        <header>Base (pure HTML)</header>
        <spec
            name="Base input"
            code="input, input:disabled, input:readonly"
            source="base.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <input placeholder="Placeholder" type="text" />
                <input placeholder="Placeholder" disabled type="text" />
                <input placeholder="Placeholder" readonly type="text" />
                <input value="Value" type="text" />
                <input value="Value" disabled type="text" />
                <input value="Value" readonly type="text" />
            </div>
        </spec>
        <spec
            name="Base textarea"
            code="textarea, textarea:disabled, textarea:readonly"
            source="base.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <textarea placeholder="Placeholder"></textarea>
                <textarea placeholder="Placeholder" disabled></textarea>
                <textarea placeholder="Placeholder" readonly></textarea>

                <textarea>Ut non condimentum mauris, eu sodales neque.</textarea>
                <textarea disabled>Ut non condimentum mauris, eu sodales neque.</textarea>
                <textarea readonly>Ut non condimentum mauris, eu sodales neque.</textarea>
            </div>
        </spec>
        <spec
            name="Base text (email, password) input, disabled, readonly"
            code="input[type=text|email|password]"
            source="base.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <input value="text" type="text" />
                <input value="text" disabled type="text" />
                <input value="text" readonly type="text" />
            </div>
        </spec>
        <spec
            name="Base number"
            code="input[type=number]"
            source="base.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <input value="10" type="number" />
                <input value="10" disabled type="number" />
                <input value="10" readonly type="number" />
            </div>
        </spec>

        <spec
            name="Base select"
            :code="`big select
    select:disabled
    small select`"
            source="base.css">
            <base-select />
        </spec>

        <spec
            name="Base checkbox (initial, active, disabled)"
            code="input[type=checkbox]"
            source="base.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <label>
                    <input value="10" type="checkbox" />
                    Initial
                </label>
                <label>
                    <input value="10" type="checkbox" checked />
                    Active
                </label>
                <label disabled>
                    <input value="10" disabled type="checkbox" />
                    Disabled
                </label>
            </div>
        </spec>
        <spec
            name="Base radio (initial, active, disabled)"
            code="input[type=radio]"
            source="base.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <label>
                    <input value="10" type="radio" />
                    Initial
                </label>
                <label>
                    <input value="10" type="radio" checked />
                    Active
                </label>
                <label disabled>
                    <input value="10" disabled type="radio" />
                    Disabled
                </label>
            </div>
        </spec>
    </article>
</template>

<script>
import BaseSelect from './input-base-select.vue';

export default {
    name: 'input-base',

    components: {
        'base-select': BaseSelect
    }
};
</script>
