<template>
    <div>
        <article>
            <header class="article__title">Blocks</header>
            <spec
                name="Sizing & tinting"
                :code="`.block.block--small.block--mono\n.block.block--warm\n.block.block--large.block--cool`"
                source="box.css">
                <div class="grid grid--gap stretch">
                    <div class="block block--small block--mono">
                        <b>Small block panel</b>
                        Mauris suscipit pretium lectus, nec pharetra.
                    </div>
                    <div class="block block--warm">
                        <b>Regular block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--large block--cool">
                        <b>Large block panel</b>
                        Mauris suscipit pretium lectus, nec pharetra.
                    </div>
                </div>
            </spec>
            <spec
                name="Bordered"
                :code="`.block.block--border.block--[color]`"
                source="box.css">
                <div class="grid grid--gap stretch">
                    <div class="block block--large block--border block--yellow">
                        <b>Large block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--border block--blue">
                        <b>Regular block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--border block--red">
                        <b>Regular block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--small block--border block--green">
                        <b>Small block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                </div>
            </spec>
        </article>

        <boxes />
        <tabs />
    </div>
</template>

<script>
module.exports = {
    name: 'containers',

    components: {
        'boxes': require('./boxes.vue'),
        'tabs': require('./tabs.vue'),
    },
};
</script>
