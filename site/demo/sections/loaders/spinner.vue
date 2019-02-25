<template>
    <svg
        class="spinner no-print" title="Loading..."
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg">
        <circle
            cx="50%"
            cy="50%"
            stroke="currentColor"
            stroke-width="3"
            fill="none"
            stroke-dasharray="30 18"
            r="10.5">
        </circle>
    </svg>
</template>

<script>

module.exports = {
    name: 'spinner'
};
</script>
