<template>
    <div>
        <article>
            <spec
                name="Basic loaders"
                :code="`.loader.loader--small\n.loader.color--[name]\n.loader.loader--large.color--[name]`"
                source="loader.css">
                <div
                    style="grid-template-columns: 1fr 1fr"
                    class="stretch grid grid--gap--large">
                    <div class="box box--center box--mono group group--gap--large">
                        <loader  class="loader--small" />
                        <loader class="color--primary" />
                        <loader class="color--secondary" />
                        <loader class="loader--large color--muted" />
                    </div>
                    <div class="box box--center group group--gap--large night-dark">
                        <loader  class="loader--small" />
                        <loader class="color--primary" />
                        <loader class="color--secondary" />
                        <loader class="loader--large color--muted" />
                    </div>
                </div>
            </spec>
            <spec
                name="Spinners"
                code=".spinner.color--[name]"
                source="spinner.css">
                <div
                    style="grid-template-columns: 1fr 1fr"
                    class="stretch grid grid--gap--large">
                    <div class="box box--center box--mono group group--gap--large">
                        <small><spinner class="color--primary" /></small>
                        <spinner class="color--secondary" />
                        <big><spinner class="color--muted" /></big>
                    </div>
                    <div class="box box--center group group--gap--large night-dark">
                        <small><spinner class="color--primary" /></small>
                        <spinner class="color--secondary" />
                        <big><spinner class="color--muted" /></big>
                    </div>
                </div>
            </spec>
            <spec
                name="Progress bar"
                source="progress-bar.css"
                :code="`.progress-bar\n.progress-bar.progress-bar--large`">
                <div
                    style="grid-template-columns: repeat(3, 1fr)"
                    class="stretch grid grid--gap">
                    <div class="progress-bar">
                        <span
                            class="progress-bar__width"
                            :style="`width: 0%`">
                        </span>
                        <span class="progress-bar__counter">0%</span>
                    </div>
                    <div class="progress-bar">
                        <span
                            class="progress-bar__width"
                            :style="`width: 50%`">
                        </span>
                        <span class="progress-bar__counter">50%</span>
                    </div>
                    <div class="progress-bar">
                        <span
                            class="progress-bar__width"
                            :style="`width: 100%`">
                        </span>
                        <span class="progress-bar__counter">100%</span>
                    </div>

                    <div class="progress-bar progress-bar--large">
                        <span
                            class="progress-bar__width"
                            :style="`width: 0%`">
                        </span>
                        <span class="progress-bar__counter">0%</span>
                    </div>
                    <div class="progress-bar progress-bar--large">
                        <span
                            class="progress-bar__width"
                            :style="`width: 50%`">
                        </span>
                        <span class="progress-bar__counter">50%</span>
                    </div>
                    <div class="progress-bar progress-bar--large">
                        <span
                            class="progress-bar__width"
                            :style="`width: 100%`">
                        </span>
                        <span class="progress-bar__counter">100%</span>
                    </div>
                </div>
            </spec>
        </article>
    </div>
</template>

<script>
module.exports = {
    name: 'loaders',

    components: {
        spinner: require('./spinner.vue'),
        loader: require('./loader.vue')
    }
};
</script>
