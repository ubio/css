<template>
    <div>
        <base-size />
        <button-styles />
        <button-groups />
    </div>
</template>

<script>
module.exports = {
    name: 'buttons',

    components: {
        'base-size': require('./base-size.vue'),
        'button-styles': require('./styles.vue'),
        'button-groups': require('./button-groups.vue'),
    },
};
</script>
