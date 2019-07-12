<template>
    <article>
        <header>Toggle</header>
        <spec
            name="Toggle vue-component"
            :code="`toggle`"
            source="toggle.vue">
            <div
                style="grid-template-columns: 1fr 1fr 1fr"
                class="grid grid--gap stretch">
                <small><toggle :bool="bool" label="Small" @update="val => bool = val" /></small>
                <toggle :bool="bool" label="Regular" @update="val => bool = val" />
                <big><toggle :bool="bool" label="Big" @update="val => bool = val" /></big>
            </div>
        </spec>
    </article>
</template>

<script>
import Toggle from '../../../inbox-components/toggle.vue';

export default {
    name: 'input-toggle',

    data() {
        return {
            bool: false
        };
    },

    components: {
        'toggle': Toggle
    }
};
</script>
