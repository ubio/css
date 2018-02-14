<template>
    <div class="section" id="colours" :class="{ 'section--active': activeItem === 'colours' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'colours' }">
            <h1>
                <i class="fa fa-paint-brush"></i>
                <span>Colours</span>
            </h1>
        </div>
        <div class="section__body">
            <h2>Backgrounds</h2>
            <ul class="ui-swatches">
                <li class="ui-swatch ui-swatch--base ui-swatch--bg">base</li>
                <li class="ui-swatch ui-swatch--pale ui-swatch--bg">pale</li>
                <li class="ui-swatch ui-swatch--default ui-swatch--bg">default</li>
                <li class="ui-swatch ui-swatch--primary">primary</li>
                <li class="ui-swatch ui-swatch--secondary">secondary</li>
                <li class="ui-swatch ui-swatch--muted">muted</li>
                <li class="ui-swatch ui-swatch--warning">warning</li>
                <li class="ui-swatch ui-swatch--success">success</li>
                <li class="ui-swatch ui-swatch--failure">failure</li>
                <li class="ui-swatch ui-swatch--danger">danger</li>
                <li class="ui-swatch ui-swatch--accent">accent</li>
            </ul>
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
    overflow: hidden;
}

.ui-swatch {
    width: var(--swatch-size);
    height: calc(var(--swatch-size) / 2);
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    /*margin: var(--gap-small) var(--gap) var(--gap-small) 0;*/
    /*margin: 1px;*/
    display: inline-flex;
    float: left;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    letter-spacing: 0.025em;
    border-radius: 0;
}

.ui-swatch--bg {
    height: calc(var(--swatch-size) * 1.5);
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
