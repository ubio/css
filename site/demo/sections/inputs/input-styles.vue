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
            name="Sizes"
            :code="`.input--small, .input--large`"
            source="input.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="block block--rounded grid grid--gap stretch">
                <input class="input input--small" type="text" placeholder="I'm small input">
                <input class="input" type="text" placeholder="I'm default input">
                <input class="input input--large" type="text" placeholder="I'm large input">
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
            :code="`select.input.input--large
    select.input
    select.input.input--small`"
            source="input.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap--large">
                <select class="input input--large">
                    <option :value="undefined">Please select an option</option>
                    <option value="1">Bourbon</option>
                    <option value="2">Custard cream</option>
                    <option value="3">Digestive</option>
                </select>

                <select class="input">
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

                <select class="input input--small">
                    <option :value="undefined">Please select an option</option>
                    <option value="1">Bourbon</option>
                    <option value="2">Custard cream</option>
                    <option value="3">Digestive</option>
                </select>
            </div>
        </spec>

        <spec
            name="Button-styled dropdowns"
            :code="`select.button.button--large
    select.button
    select.button.button--small`"
            source="button.css">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap--large">
                <span>
                    <select class="button button--large">
                        <option :value="undefined">Please select an option</option>
                        <option value="1">Bourbon</option>
                        <option value="2">Custard cream</option>
                        <option value="3">Digestive</option>
                    </select>
                </span>

                <span>
                    <select class="button">
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

                <span>
                    <select class="button button--small">
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

