<template>
    <div>
        <article>
            <header class="article__title">Blocks</header>
            <spec
                name="Sizing & tinting"
                :code="`.block--small\n.block--large\n.block--[colour-name]--pale`"
                source="block.css">
                <div class="grid stretch grid--gap--small">
                    <div class="block block--small block--mono--pale">
                        <b>Small block panel</b>
                        Mauris suscipit pretium lectus, nec pharetra.
                    </div>
                    <div class="block block--warm--pale">
                        <b>Regular block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--large block--cool--pale">
                        <b>Large block panel</b>
                        Mauris suscipit pretium lectus, nec pharetra.
                    </div>
                </div>
            </spec>
            <spec
                name="Rounded"
                :code="`.block.block--[colour-name].block--rounded`"
                source="block.css">
                <div
                    class="grid grid--gap stretch"
                    style="grid-template-columns: 1fr 1fr 1fr 1fr">
                    <div class="block block--rounded block--red text--truncate">
                        Regular block panel Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--rounded block--green text--truncate">
                        Regular block panel Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--rounded block--yellow text--truncate">
                        Regular block panel Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--rounded block--blue text--truncate">
                        Regular block panel Mauris suscipit pretium lectus.
                    </div>
                </div>
            </spec>
        </article>

        <boxes />
        <tabs />
    </div>
</template>

<script>
import Boxes from './boxes.vue';
import Tabs from './tabs.vue';

export default {
    name: 'containers',

    components: {
        'boxes': Boxes,
        'tabs': Tabs
    }
};
</script>
