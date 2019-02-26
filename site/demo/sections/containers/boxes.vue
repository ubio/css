<template>
    <div>
        <article>
            <header class="article__title">Boxes</header>
            <spec
                name="Sizing"
                :code="`.box\n.box.box--small\n.box.box--large`"
                source="box.css">
                <div class="group group--gap">
                    <div class="grid grid--gap">
                        <div class="box box--blue">
                            <p>
                                <span class="badge badge--blue">Regular box</span>
                            </p>
                            <p>Mauris suscipit pretium lectus</p>
                        </div>
                        <div class="box box--small box--red">
                            <p>
                                <span class="badge badge--red">Small box</span>
                            </p>
                            <p>Mauris suscipit pretium lectus, nec pharetra.</p>
                        </div>
                    </div>
                    <div class="box box--large box--green">
                        <p>
                            <span class="badge badge--green">Large box</span>
                        </p>
                        <p>Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie, nec pharetra mauris vulputate molestie.</p>
                    </div>
                </div>
            </spec>
            <spec
                name="Custom size"
                :code="`.box.box--yellow`"
                :hint="`Amend variables:\n<code>--font-size</code>`"
                source="variables.css, button.css">
                <div
                    class="box box--yellow stretch"
                    style="--font-size: 16px">
                    <p>
                        <i class="icon far fa-clock"></i><b>This might take a moment</b>
                    </p>
                    <p class="shift">We generate live data for test jobs. Hold on while we get it.</p>
                </div>
            </spec>
            <spec
                name="Tinting & outline"
                :code="`.box.box--outline.color--blue`"
                source="box.css">
                <div class="box box--outline color--blue stretch">
                    <p><b>Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque.</b></p>
                    <p> Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.</p>
                </div>
            </spec>
        </article>

        <box-tinted />

        <box-outlined />
    </div>
</template>

<script>
module.exports = {
    name: 'containers-boxes',

    components: {
        'box-tinted': require('./box-tinted.vue'),
        'box-outlined': require('./box-outlined.vue')
    }
};
</script>
