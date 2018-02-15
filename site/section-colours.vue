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
                    <li class="ui-swatch ui-swatch--round ui-swatch--muted">
                        <span class="ui-swatch__label">muted</span>
                    </li>
                </ul>
            </article>
            <article>
                <h3>States</h3>
                <ul class="ui-swatches">
                    <li class="ui-swatch ui-swatch--round ui-swatch--warning">
                        <span class="ui-swatch__label">warning</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--success">
                        <span class="ui-swatch__label">success</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--failure">
                        <span class="ui-swatch__label">failure</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--danger">
                        <span class="ui-swatch__label">danger</span>
                    </li>
                    <li class="ui-swatch ui-swatch--round ui-swatch--accent">
                        <span class="ui-swatch__label">accent</span>
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
    --swatch-size: 100px;
    --swatch-size--round: 60px;
    display: flex;
}

.ui-swatch {
    display: inline-flex;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1) inset;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    letter-spacing: 0.025em;
    margin: 0 var(--gap-small) var(--gap) 0;
}

.ui-swatch--bg {
    width: var(--swatch-size);
    height: calc(var(--swatch-size) * 1.5);
    border-radius: 0;
}

.ui-swatch--round {
    width: var(--swatch-size--round);
    height: var(--swatch-size--round);
    border-radius: var(--swatch-size--round);
    position: relative;
    font-size: 10px;
}

.ui-swatch small {
    display: inline-block;
    text-align: center;
    padding: 3px;
    text-align: center;
    width: 80%;
    margin-top: 2px;
    font-size: 70%;
    color: var(--ui-base);
    background: var(--ui-base--inverse);
    border-radius: var(--border-radius);
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

.ui-swatch--secondary {
    background: var(--ui-secondary);
    color: var(--ui-secondary--inverse);
}

.ui-swatch--accent {
    background: var(--ui-accent);
    color: var(--ui-accent--inverse);
}

.ui-swatch--primary {
    background: var(--ui-primary);
    color: var(--ui-primary--inverse);
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
