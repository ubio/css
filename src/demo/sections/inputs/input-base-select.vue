<template>
    <div
        style="grid-template-columns: auto 1fr 1fr"
        class="grid grid--gap--large">
        <big>
            <select>
                <option :value="undefined">Please select an option</option>
                <option value="1">Bourbon</option>
                <option value="2">Custard cream</option>
                <option value="3">Digestive</option>
            </select>
        </big>

        <select disabled>
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

        <small>
            <select>
                <option :value="undefined">Please select an option</option>
                <option value="1">Bourbon</option>
                <option value="2">Custard cream</option>
                <option value="3">Digestive</option>
            </select>
        </small>
    </div>
</template>

<script>
export default {
    name: 'input-base-select'
};
</script>
