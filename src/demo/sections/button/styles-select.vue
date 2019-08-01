<template>
    <spec
        name="Select in a .button"
        :code="`.button.button--large select, \n.button select, \n.button.button--small select`"
        source="button.css">
        <div
            class="grid grid--gap"
            style="grid-template-columns: auto auto auto">
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
                    <option value="1">Bourbon</option>
                    <option value="2">Custard cream</option>
                    <option value="3">Digestive</option>
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
</template>

<script>
export default {
    name: 'button-styles-primary-secondary'
};
</script>
