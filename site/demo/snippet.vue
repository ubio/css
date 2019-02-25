<template>
    <div class="demo__snippet">
        <em class="demo__snippet-source">{{ source }}</em>
        <pre class="demo__snippet-code">{{ code }}</pre>
    </div>
</template>

<script>
module.exports = {
    name: 'snippet',

    props: {
        code: { type: String, required: true },
        source: { type: String, required: true }
    }
};
</script>
