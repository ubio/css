<template>
    <div>
        <article>
            <header class="article__title">Blocks</header>
            <spec
                name="Sizing & tinting"
                :code="`.block.block--small\n.block\n.block.block--large`"
                source="box.css">
                <div class="grid grid--gap stretch">
                    <div class="block block--small bg--mono--pale">
                        <b>Small block panel</b>
                        Mauris suscipit pretium lectus, nec pharetra.
                    </div>
                    <div class="block bg--warm--pale">
                        <b>Regular block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--large bg--cool--pale">
                        <b>Large block panel</b>
                        Mauris suscipit pretium lectus, nec pharetra.
                    </div>
                </div>
            </spec>
            <spec
                name="Rounded"
                :code="`.block.block--large.block--rounded`"
                source="box.css">
                <div class="grid grid--gap stretch">
                    <div class="block block--large block--rounded bg--brand-red color--dark-mode">
                        <b>Large block panel</b>
                        Mauris suscipit pretium lectus.
                    </div>
                    <div class="block block--small block--rounded bg--green color--dark-mode">
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
        'tabs': require('./tabs.vue')
    }
};
</script>
