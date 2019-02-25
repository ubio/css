<template>
    <div>
        <article>
            <spec
                name="Basic loaders"
                :code="`.loader.loader--small.color--default\n.loader.color--primary\n.loader.loader--large.color--muted`"
                source="loader.css">
                <div class="group group--gap--large">
                    <div class="box box--mono group group--gap--large">
                        <loader  class="loader--small color--default" />
                        <loader class="color--primary" />
                        <loader class="color--secondary" />
                        <loader class="loader--large color--muted" />
                    </div>
                    <div class="box bg--dark-mode group group--gap--large">
                        <loader  class="loader--small color--dark-mode" />
                        <loader class="color--primary" />
                        <loader class="color--secondary" />
                        <loader class="loader--large color--muted" />
                    </div>
                </div>
            </spec>
            <spec
                name="Spinners"
                :code="`.spinner.spinner--small\n.spinner\n.spinner.spinner--large`"
                source="spinner.css">
                <div class="group group--gap--large">
                    <div class="box box--mono group group--gap--large">
                        <spinner class="spinner--small color--default" />
                        <spinner class="color--primary" />
                        <spinner class="color--secondary" />
                        <spinner class="spinner--large color--muted" />
                    </div>
                    <div class="box bg--dark-mode group group--gap--large">
                        <spinner class="spinner--small color--dark-mode" />
                        <spinner class="color--primary" />
                        <spinner class="color--secondary" />
                        <spinner class="spinner--large color--muted" />
                    </div>
                </div>
            </spec>
            <spec
                name="Progress bar"
                source="progress-bar.css"
                :code="`.progress-bar\n.progress-bar.progress-bar--large`">
                <div class="grid grid--gap--large">
                    <div class="group group--gap--large">
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
                    </div>

                    <div class="group group--gap--large">
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
