<template>
    <div class="section" id="badges" :class="{ 'section--active': activeItem === 'badges' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'badges' }">
            <i class="fa fa-font section__title-icon"></i>
            <span class="section__title-label">Badges</span>
        </div>
        <div class="section__body">
            <div class="block">
                <span class="badge badge--info">info</span>
                <span class="badge badge--success">success</span>
                <span class="badge badge--warning">warning</span>
                <span class="badge badge--failure">failure</span>
            </div>
            <div class="block">
                <span class="badge badge--outlined-info">info</span>
                <span class="badge badge--outlined-success">success</span>
                <span class="badge badge--outlined-warning">warning</span>
                <span class="badge badge--outlined-failure">failure</span>
            </div>
            <div class="block">
                <span class="badge badge--staging">staging</span>
                <span class="badge badge--production">production</span>
            </div>
            <div class="block">
                <span class="badge badge--info">
                    <i class="fa fa-info-circle"></i>
                    info
                </span>
                <span class="badge badge--success">
                    <i class="fa fa-flag-checkered"></i>
                    success
                </span>
                <span class="badge badge--warning">
                    <i class="fa fa-exclamation-circle"></i>
                    warning
                </span>
                <span class="badge badge--failure">
                    <i class="fa fa-flag-checkered"></i>
                    failure
                </span>
            </div>
            <div class="block">
                <span class="badge badge--round badge--info">
                    round
                </span>
                <span class="badge badge--round badge--success">
                    1
                </span>
                <span class="badge badge--round badge--warning">
                    <i class="fa fa-exclamation-triangle"></i>
                </span>
            </div>
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
