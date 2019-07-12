<template>
    <div>
        <input-base />
        <input-styles />
        <input-toggle />
        <input-groups />
    </div>
</template>

<script>
import InputBase from './input-base.vue';
import InputStyles from './input-styles.vue';
import InputGroups from './input-groups.vue';
import InputToggle from './input-toggle.vue';

export default {
    name: 'inputs',

    components: {
        'input-base': InputBase,
        'input-styles': InputStyles,
        'input-groups': InputGroups,
        'input-toggle': InputToggle
    }
};
</script>
