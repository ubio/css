<template>
    <div class="section" id="colours" :class="{ 'section--active': activeItem === 'colours' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'colours' }">
            <i class="fa fa-paint-brush section__title-icon"></i>
            <span class="section__title-label">Colours</span>
        </div>
        <div class="section__body">
            <article v-if="false" style="float: left; margin-right: var(--gap-large)">
                <h3>Palette</h3>
                <ul class="ui-palete">
                    <li>
                        <div>
                            <span><b>mono</b></span>
                            <div class="ui-palete__color">
                                <span class="ui-palete__color-swatch" style="background: #ccc">#ccc</span>
                                <span class="ui-palete__color-swatch" style="background: white; height: 50px"></span>
                                <span class="ui-palete__color-swatch" style="background: black; height: 50px"></span>
                            </div>
                        </div>
                    </li>
                    <li><palette-stripe color="#687789" name="cool" :gray="true" /></li>
                    <li><palette-stripe color="#d6d6d0" name="warm" :gray="true" /></li>
                    <li><palette-stripe color="#32539D" name="accent" /></li>
                </ul>
            </article>
            <article v-if="false" style="float: left; margin-right: var(--gap-large)">
                <h3>Traffic Lights</h3>
                <ul class="ui-palete">
                    <li><palette-stripe color="#3E71B5" name="info" /></li>
                    <li><palette-stripe color="#4A90E2" name="info" /></li>
                    <li><palette-stripe color="#F4CF6C" name="warning" /></li>
                    <li><palette-stripe color="#619068" name="success" /></li>
                    <li><palette-stripe color="#41a982" name="success" /></li>
                    <li><palette-stripe color="#59bc69" name="CS success" /></li>
                    <li><palette-stripe color="#28a745" name="GH-green" /></li>
                    <li><palette-stripe color="#B95769" name="failure" /></li>
                    <li><palette-stripe color="var(--ui-danger)" name="danger" /></li>
                </ul>
            </article>
            <article style="float: left; margin-right: var(--gap-large)">
                <h3>Box</h3>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--base ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">BASE</span>
                            <small>brand white</small>
                            <code class="ui-swatch__code">white</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--area ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">AREA</span>
                            <code class="ui-swatch__code">#f6f6f6</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--panel ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">PANEL</span>
                            <code class="ui-swatch__code">#edeeef</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--secondary ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">SECONDARY</span>
                            <small>brand secondary</small>
                            <code class="ui-swatch__code">#d6d6d0</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--tertiary ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">TERTIARY</span>
                            <code class="ui-swatch__code">#e1e9ed</code>
                        </span>
                    </li>
                </ul>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--base--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">BASE inverse</span>
                            <code class="ui-swatch__code">#242a2e</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--area--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">AREA inverse</span>
                            <small>brand black</small>
                            <code class="ui-swatch__code">black</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--panel--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">PANEL inverse</span>
                            <code class="ui-swatch__code">#4a4a4a</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--secondary--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">SECONDARY inverse</span>
                            <small>brand tertiary</small>
                            <code class="ui-swatch__code">#424b54</code>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--tertiary--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">
                            <span class="ui-swatch__name">TERTIARY inverse</span>
                            <code class="ui-swatch__code">#687789</code>
                        </span>
                    </li>
                </ul>
            </article>
            <article>
                <h4>Base</h4>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--round ui-swatch--primary">
                        <span>CTA primary</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--panel">
                        <span>CTA default</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--secondary">
                        <span>
                            CTA secondary
                            <small>brand secondary</small>
                        </span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--danger">
                        <span>CTA danger</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--text">
                        <span>TEXT</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--muted">
                        <span>
                            TEXT muted
                            <small>brand tertiary</small>
                        </span>
                    </li>
                </ul>
                <h4>Traffic lights</h4>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--round ui-swatch--idle">
                        <span>idle</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--info">
                        <span>info</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--warning">
                        <span>warning</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--success">
                        <span>success</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--failure">
                        <span>failure</span>
                    </li>
                </ul>
            </article>
            <article>
                <h4>Environments</h4>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--round ui-swatch--stag">
                        <span>STAG</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--prod">
                        <span>
                            PROD
                            <small>brand contrast</small>
                        </span>
                    </li>
                </ul>
            </article>

        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        activeItem: { type: String, required: false, default: '' },
    },

    components: {
        'palette-stripe': require('./palette-stripe.vue'),
    },
};
</script>

<style lang="css">
.ui-palete {
    display: flex;
}

.ui-swatches {
    --swatch-size: 90px;
    --swatch-size--round: 60px;
    display: flex;
}

.ui-swatch {
    display: inline-flex;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    flex-direction: column;
    letter-spacing: 0.025em;
}

.ui-swatch--bg {
    width: var(--swatch-size);
    height: calc(var(--swatch-size) * 2);
    border-radius: 0;
    margin: 0;
}

.ui-swatch--round {
    justify-content: center;
    align-items: center;
    margin: 0 var(--gap-small) var(--gap) 0;
    width: var(--swatch-size--round);
    height: var(--swatch-size--round);
    border-radius: var(--swatch-size--round);
    position: relative;
    text-align: center;
    font-size: 10px;
    padding: var(--gap-small);
    box-shadow: 0 0 0 1px rgba(0,0,0,.1) inset;
}

.ui-swatch__label {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--gap-small);
    width: 100%;
    margin-top: 2px;
    font-size: 90%;
}

.ui-swatch__name {
    font-weight: 500;
    padding: 3px 0;
    line-height: 1.2;
    flex: 1;
}

.ui-swatch__code {
    line-height: 1;
    display: inline-flex;
    padding: var(--gap-small) 0 0;
}

.ui-swatch--base {
    background: var(--ui-base);
    color: var(--ui-base--inverse);
}

.ui-swatch--area {
    background: var(--ui-pale);
    color: var(--ui-pale--inverse);
}

.ui-swatch--panel {
    background: var(--ui-default);
    color: var(--ui-default--inverse);
}

.ui-swatch--base--inverse {
    background: var(--ui-base--inverse);
    color: var(--ui-base);
}

.ui-swatch--area--inverse {
    background: var(--ui-pale--inverse);
    color: var(--ui-pale);
}

.ui-swatch--panel--inverse {
    background: var(--ui-default--inverse);
    color: var(--ui-default);
}

.ui-swatch--secondary {
    background: var(--ui-secondary);
    color: var(--ui-secondary--inverse);
}

.ui-swatch--secondary--inverse {
    background: var(--ui-secondary--inverse);
    color: var(--ui-secondary);
}

.ui-swatch--tertiary {
    background: var(--ui-tertiary);
    color: var(--ui-tertiary--inverse);
}

.ui-swatch--tertiary--inverse {
    background: var(--ui-tertiary--inverse);
    color: var(--ui-tertiary);
}

.ui-swatch--prod {
    background: var(--ui-prod);
    color: var(--ui-prod--inverse);
}

.ui-swatch--stag {
    background: var(--ui-stag);
    color: var(--ui-stag--inverse);
}

.ui-swatch--primary {
    background: var(--ui-primary);
    color: var(--ui-primary--inverse);
}

.ui-swatch--text {
    background: var(--ui-base--inverse);
    color: var(--ui-base);
}

.ui-swatch--idle {
    background: #F6F6F4;
    color: #E1E1E1;
}

.ui-swatch--info {
    background: var(--ui-info);
    color: var(--ui-info--inverse);
}

.ui-swatch--warning {
    background: var(--ui-warning);
    color: var(--ui-warning--inverse);
}

.ui-swatch--success {
    background: var(--ui-success);
    color: var(--ui-success--inverse);
}

.ui-swatch--failure {
    background: var(--ui-failure);
    color: var(--ui-failure--inverse);
}

.ui-swatch--danger {
    background: var(--ui-danger);
    color: var(--ui-danger--inverse);
}

.ui-swatch--muted {
    background: var(--ui-muted);
    color: var(--ui-muted--inverse);
}
</style>
