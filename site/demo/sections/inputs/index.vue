<template>
    <div>
        <input-base />
        <input-styles />
        <input-toggle />
        <input-groups />
    </div>
</template>

<script>
module.exports = {
    name: 'inputs',

    components: {
        'input-base': require('./input-base.vue'),
        'input-styles': require('./input-styles.vue'),
        'input-groups': require('./input-groups.vue'),
        'input-toggle': require('./input-toggle.vue')
    }
};
</script>
