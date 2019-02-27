<template>
    <article>
        <header>Styles</header>
        <spec
            name=".input"
            :code="`input.input input, textarea.input`"
            source="input.css">
            <div
                style="grid-template-columns: 1fr 1fr"
                class="block block--rounded grid grid--gap stretch">
                <input class="input" type="text" placeholder="I'm input">
                <textarea class="input">I'm text area</textarea>
            </div>
        </spec>
        <spec
            name=".input on dark"
            :code="`input.input input, textarea.input`"
            source="input.css">
            <div
                style="grid-template-columns: 1fr 1fr"
                class="dark-mode block block--rounded grid grid--gap stretch">
                <input class="input" type="text" placeholder="I'm input">
                <textarea class="input">I'm text area</textarea>
            </div>
        </spec>
        <spec
            name="Text area input"
            :code="`.input.input--area\n.input.input--area.input--area--fixed`"
            source="input.css">
            <div class="group group--gap stretch box box--warm">
                <textarea class="input input--area">I'm flexible text area</textarea>
                <textarea class="input input--area input--area--fixed">I'm fixed width text area</textarea>
            </div>
        </spec>
        <spec
            name="Inner text area"
            :code="`.input.input--area textarea`"
            source="input.css">
            <div class="box box--cool stretch">
                <div class="input input--area stretch">
                    <textarea>I'm text area</textarea>
                </div>
            </div>
        </spec>

        <spec
            name="Frameless input"
            :code="`.input.frameless input|textarea`"
            source="input.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <div >
                    <input class="input frameless" type="text" placeholder="I'm input">
                </div>
                <div class="input frameless">
                    <textarea>I'm text area</textarea>
                </div>
            </div>
        </spec>
        <spec
            name=".input--area"
            :code="`.input.input--area textarea`"
            source="input.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <div class="input input--area">
                    <textarea>I'm text area</textarea>
                </div>
            </div>
        </spec>

        <spec
            name="Input-styled dropdowns"
            :code="`big.input select
    span.input select
    small.input select`"
            source="input.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap--large">
                <big class="input">
                    <select>
                        <option :value="undefined">Please select an option</option>
                        <option value="1">Bourbon</option>
                        <option value="2">Custard cream</option>
                        <option value="3">Digestive</option>
                    </select>
                </big>

                <span class="input">
                    <select>
                        <option :value="undefined">Please select an option</option>
                        <optgroup label="Set 1">
                            <option value="1">Bourbon</option>
                            <option value="2">Custard cream</option>
                            <option value="3">Digestive</option>
                        </optgroup>
                        <optgroup label="Set 2">
                            <option value="4">Chocolate hobnob</option>
                            <option value="5">Garibaldi</option>
                            <option value="6">Brandy snap</option>
                        </optgroup>
                    </select>
                </span>

                <small class="input">
                    <select>
                        <option :value="undefined">Please select an option</option>
                        <option value="1">Bourbon</option>
                        <option value="2">Custard cream</option>
                        <option value="3">Digestive</option>
                    </select>
                </small>
            </div>
        </spec>

        <spec
            name="Button-styled dropdowns"
            :code="`.button.button--large select
    .button select
    .button.button--small select`"
            source="button.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap--large">
                <span class="button button--large">
                    <select>
                        <option :value="undefined">Please select an option</option>
                        <option value="1">Bourbon</option>
                        <option value="2">Custard cream</option>
                        <option value="3">Digestive</option>
                    </select>
                </span>

                <span class="button">
                    <select>
                        <option :value="undefined">Please select an option</option>
                        <optgroup label="Set 1">
                            <option value="1">Bourbon</option>
                            <option value="2">Custard cream</option>
                            <option value="3">Digestive</option>
                        </optgroup>
                        <optgroup label="Set 2">
                            <option value="4">Chocolate hobnob</option>
                            <option value="5">Garibaldi</option>
                            <option value="6">Brandy snap</option>
                        </optgroup>
                    </select>
                </span>

                <span class="button button--small">
                    <select>
                        <option :value="undefined">Please select an option</option>
                        <option value="1">Bourbon</option>
                        <option value="2">Custard cream</option>
                        <option value="3">Digestive</option>
                    </select>
                </span>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'input-class'
};
</script>

