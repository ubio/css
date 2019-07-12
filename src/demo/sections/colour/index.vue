<template>
    <div>
        <article class="article">
            <header class="article__title">Palette</header>
            <swatches/>
        </article>

        <semantics />
        <semaphore />
        <bg-pale />
    </div>
</template>

<script>
import Swatches from './swatches.vue';
import Semantics from './semantics.vue';
import Semaphore from './semaphore.vue';
import BgPale from './bg-pale.vue';

export default {
    name: 'colour',

    components: {
        'swatches': Swatches,
        'semantics': Semantics,
        'semaphore': Semaphore,
        'bg-pale': BgPale
    }
};
</script>
