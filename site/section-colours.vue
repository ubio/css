<template>
    <div class="section" id="colours" :class="{ 'section--active': activeItem === 'colours' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'colours' }">
            <i class="fa fa-paint-brush section__title-icon"></i>
            <span class="section__title-label">Colours</span>
        </div>
        <div class="section__body">
            <article>
                <h3>Backgrounds</h3>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--base ui-swatch--bg">
                        <span class="ui-swatch__label">base</span>
                    </li>
                    <li class="ui-swatch ui-swatch--pale ui-swatch--bg">
                        <span class="ui-swatch__label">pale</span>
                    </li>
                    <li class="ui-swatch ui-swatch--default ui-swatch--bg">
                        <span class="ui-swatch__label">default</span>
                    </li>
                    <li class="ui-swatch ui-swatch--secondary ui-swatch--bg">
                        <span class="ui-swatch__label">secondary</span>
                    </li>
                    <li class="ui-swatch ui-swatch--base--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">base--inverse</span>
                    </li>
                    <li class="ui-swatch ui-swatch--pale--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">pale--inverse</span>
                    </li>
                    <li class="ui-swatch ui-swatch--default--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">default--inverse</span>
                    </li>
                    <li class="ui-swatch ui-swatch--secondary--inverse ui-swatch--bg">
                        <span class="ui-swatch__label">secondary--inverse</span>
                    </li>
                </ul>
            </article>
            <article>
                <h3>Controls and text</h3>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--round ui-swatch--primary">
                        <span class="ui-swatch__label">primary</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--secondary">
                        <span class="ui-swatch__label">secondary</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--text">
                        <span class="ui-swatch__label">text base</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--muted">
                        <span class="ui-swatch__label">text muted</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--danger">
                        <span class="ui-swatch__label">danger</span>
                    </li>
                </ul>
            </article>
            <article>
                <h3>Messaging</h3>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--round ui-swatch--info">
                        <span class="ui-swatch__label">info</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--warning">
                        <span class="ui-swatch__label">warning</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--success">
                        <span class="ui-swatch__label">success</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--failure">
                        <span class="ui-swatch__label">failure</span>
                    </li>
                </ul>
            </article>
            <article>
                <h3>Environments</h3>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--round ui-swatch--stag">
                        <span class="ui-swatch__label">stag</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--prod">
                        <span class="ui-swatch__label">prod</span>
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
};
</script>

<style lang="css">
.ui-swatches {
    --swatch-size: 90px;
    --swatch-size--round: 60px;
    display: flex;
}

.ui-swatch {
    display: inline-flex;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--font__family--mono);
    letter-spacing: 0.025em;
}

.ui-swatch--bg {
    width: var(--swatch-size);
    height: calc(var(--swatch-size) * 1.5);
    border-radius: 0;
    margin: 0 0 var(--gap-large);
}

.ui-swatch--round {
    margin: 0 var(--gap-small) var(--gap) 0;
    width: var(--swatch-size--round);
    height: var(--swatch-size--round);
    border-radius: var(--swatch-size--round);
    position: relative;
    text-align: center;
    font-size: 10px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1) inset;
}

.ui-swatch__label {
    display: inline-block;
    text-align: center;
    padding: 3px;
    text-align: center;
    width: 90%;
    margin-top: 2px;
    font-size: 90%;
}

.ui-swatch--base {
    background: var(--ui-base);
    color: var(--ui-base--inverse);
}

.ui-swatch--pale {
    background: var(--ui-pale);
    color: var(--ui-pale--inverse);
}

.ui-swatch--default {
    background: var(--ui-default);
    color: var(--ui-default--inverse);
}

.ui-swatch--base--inverse {
    background: var(--ui-base--inverse);
    color: var(--ui-base);
}

.ui-swatch--pale--inverse {
    background: var(--ui-pale--inverse);
    color: var(--ui-pale);
}

.ui-swatch--default--inverse {
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
