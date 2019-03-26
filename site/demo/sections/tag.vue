<template>
    <div>
        <article>
            <spec
                name="Basic tags"
                :code="`.tag`"
                source="tag.css">
                <div
                    style="grid-template-columns: repeat(6, auto)"
                    class="grid grid--gap">
                    <small class="tag">
                        <span class="tag__label">Small</span>
                        <a class="tag__remover"><i class="fas fa-times"></i></a>
                    </small>
                    <span class="tag">
                        <span class="tag__label">Default</span>
                        <a class="tag__remover"><i class="fas fa-times"></i></a>
                    </span>
                    <big class="tag">
                        <span class="tag__label">Big</span>
                        <a class="tag__remover"><i class="fas fa-times"></i></a>
                    </big>
                </div>
            </spec>
            <spec
                name="Tinted"
                :code="`.tag.tag--[name]`"
                source="tag.css">
                <div
                    class="grid grid--gap"
                    style="grid-template-columns: repeat(9, 1fr)">
                    <span
                        v-for="color of $root.colors"
                        :key="color"
                        class="tag"
                        :class="`tag--${ color }`">
                        <span class="tag__label">Lorem</span>
                        <a class="tag__remover"><i class="fas fa-times"></i></a>
                    </span>
                </div>
            </spec>
        </article>
    </div>
</template>

<script>
module.exports = {
    name: 'badges'
};
</script>
