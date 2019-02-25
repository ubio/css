<template>
    <spec
        name="Toggle"
        :code="`small toggle[label=Small]
toggle[label=Regular]
big toggle[label=Big]`"
        source="vue-component">
        <div
            style="grid-template-columns: 1fr 1fr 1fr"
            class="grid grid--gap stretch">
            <small><toggle :bool="bool" label="Small" @update="val => bool = val" /></small>
            <toggle :bool="bool" label="Regular" @update="val => bool = val" />
            <big><toggle :bool="bool" label="Big" @update="val => bool = val" /></big>
        </div>
    </spec>
</template>

<script>
module.exports = {
    name: 'input-toggle',

    data() {
        return {
            bool: false
        };
    },

    components: {
        'toggle': require('../../../inbox-components/toggle.vue')
    }
};
</script>
