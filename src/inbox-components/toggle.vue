<template>
    <label class="toggle">
        <span class="toggle__toggler">
            <input
                class="toggle__input"
                type="checkbox"
                v-model="val" />
            <span
                class="toggle__slider"
                :class="{
                    'toggle__slider--on': bool,
                    'toggle__slider--off': !bool }">
            </span>
        </span>
        <span class="toggle__label" v-if="label">
            {{ label }}
        </span>
    </label>
</template>

<script>
export default {
    props: {
        label: { type: String, required: false, default: '' },
        bool: { type: Boolean, required: true }
    },

    data() {
        return {
            val: this.bool
        };
    },

    watch: {
        bool(value) {
            this.val = value;
        },

        val(value) {
            this.$emit('update', value);
        }
    }
};
</script>
