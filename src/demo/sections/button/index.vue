<template>
    <div>
        <base-size />
        <button-styles />
        <button-groups />
    </div>
</template>

<script>
import BaseSize from './base-size.vue';
import ButtonStyles from './styles.vue';
import ButtonGroups from './button-groups.vue';

export default {
    name: 'buttons',

    components: {
        'base-size': BaseSize,
        'button-styles': ButtonStyles,
        'button-groups': ButtonGroups
    }
};
</script>
