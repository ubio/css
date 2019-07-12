<template>
    <div>
        <article>
            <header>Styling</header>
            <spec
                name="Foundation"
                :code="`.badge, .badge--outline`"
                source="badge.css">
                <div
                    style="grid-template-columns: repeat(6, auto)"
                    class="grid grid--gap">
                    <span class="badge badge--small">Small</span>
                    <span class="badge">Default</span>
                    <span class="badge badge--large">Large</span>
                    <span class="badge badge--outline badge--small">Small</span>
                    <span class="badge badge--outline">Default</span>
                    <span class="badge badge--outline badge--large">Large</span>
                </div>
            </spec>
            <spec
                name="Custom"
                :code="`.badge.badge--yellow`"
                :hint="`Size is relative:\n<code>font-size</code>`"
                source="variables.css, badge.css">
                <div
                    style="font-size: 16px"
                    class="group group--gap">
                    <span class="badge badge--yellow">PROCESSING</span>
                </div>
            </spec>
            <spec
                name="Tinted"
                :code="`.badge.badge--[name]\n.badge.badge--[name]--light\n.badge.badge--[name]--outline`"
                source="badge.css">
                <div
                    style="grid-template-columns: repeat(4, auto)"
                    class="grid grid--gap">
                    <span
                        v-for="color of $root.colorsSemaphore"
                        :key="color"
                        class="badge badge--fixed all-caps"
                        :class="`badge--${ color }`">
                        {{ color }}
                    </span>
                    <span class="badge all-caps badge--blue--light">
                        <i class="fas fa-info-circle"></i>
                        info
                    </span>
                    <span class="badge all-caps badge--yellow--light">
                        <i class="fas fa-exclamation-triangle"></i>
                        warning
                    </span>
                    <span class="badge all-caps badge--red--light">
                        <i class="fas fa-exclamation-circle"></i>
                        failure
                    </span>
                    <span class="badge all-caps badge--green--light">
                        <i class="fas fa-check-circle"></i>
                        success
                    </span>
                    <span class="badge all-caps badge--blue--outline">
                        <i class="fas fa-info-circle"></i>
                        info
                    </span>
                    <span class="badge all-caps badge--yellow--outline">
                        <i class="fas fa-exclamation-triangle"></i>
                        warning
                    </span>
                    <span class="badge all-caps badge--red--outline">
                        <i class="fas fa-exclamation-circle"></i>
                        failure
                    </span>
                    <span class="badge all-caps badge--green--outline">
                        <i class="fas fa-check-circle"></i>
                        success
                    </span>
                </div>
            </spec>
            <spec
                name="No caps"
                :code="`.badge.badge--[name].no-caps\n.badge.badge--[name]--outline.no-caps`"
                source="badge.css">
                <div
                    style="grid-template-columns: repeat(3, auto)"
                    class="grid grid--gap--small">
                    <span class="badge no-caps badge--yellow">awaitingInput</span>
                    <span class="badge no-caps badge--yellow--outline">awaitingTds</span>
                </div>
            </spec>
            <spec
                name="Fixed width"
                :code="`.badge.badge--[name].no-caps\n.badge.badge--[name]--outline.no-caps`"
                source="badge.css">
                <div
                    style="grid-template-columns: repeat(5, 1fr);"
                    class="grid grid--gap">
                    <div
                        v-for="colour of [
                            ...$root.colorsGrey,
                            ...$root.colorsSemaphore,
                            ...$root.colorsBrand
                        ]"
                        :key="colour"
                        class="grid grid--gap--small">
                        <span class="badge no-caps badge--fixed" :class="`bg--${ colour }`">
                            {{ colour }}
                        </span>
                        <span class="badge no-caps badge--fixed" :class="`bg--${ colour }`">
                            <i class="fas fa-bullseye"></i>
                            {{ colour }}
                        </span>
                        <span
                            class="badge no-caps badge--fixed"
                            :class="`badge--${ colour }--outline`">{{ colour }}</span>
                        <span
                            class="badge no-caps badge--fixed"
                            :class="`badge--${ colour }--outline`">
                            <i class="fas fa-bullseye"></i>
                            {{ colour }}
                        </span>
                        <span
                            class="badge badge--fixed"
                            :class="`badge--${ colour }`">
                            {{ colour }}
                        </span>
                        <span
                            class="badge badge--fixed"
                            :class="`badge--${ colour }`">
                            <i class="fas fa-bullseye"></i>
                            {{ colour }}
                        </span>
                        <span
                            class="badge badge--fixed"
                            :class="`badge--${ colour }--outline`">
                            {{ colour }}
                        </span>
                        <span
                            class="badge badge--fixed"
                            :class="`badge--${ colour }--outline`">
                            <i class="fas fa-bullseye"></i>
                            {{ colour }}
                        </span>
                    </div>
                </div>
            </spec>
            <spec
                name="In-table small badge"
                :code="`.badge.badge--inline.badge--blue--outline`"
                source="badge.css">
                <div class="box box--mono">
                    <span class="badge badge--inline badge--blue--outline">
                        c69
                    </span>
                </div>
            </spec>
            <spec
                name="Environment"
                :code="`.badge.badge--production\n.badge.badge--staging`"
                source="badge.css">
                <div
                    style="grid-template-columns: repeat(7, 1fr)"
                    class="grid grid--gap--small">
                    <span class="badge badge--production">
                        production
                    </span>
                    <span class="badge badge--staging">
                        staging
                    </span>
                </div>
            </spec>
            <spec
                name="Round"
                :code="`.badge.badge--round`"
                source="badge.css">
                <div class="group group--gap--large">
                    <span class="badge badge--large badge--production badge--round">p</span>
                    <span class="badge badge--large badge--staging badge--round">s</span>
                    <span class="badge badge--large badge--round">126</span>
                    <span class="badge badge--production badge--round">p</span>
                    <span class="badge badge--staging badge--round">s</span>
                    <span class="badge badge--round">126</span>
                    <span class="badge badge--small badge--production badge--round">p</span>
                    <span class="badge badge--small badge--staging badge--round">s</span>
                    <span class="badge badge--small badge--round">126</span>
                </div>
            </spec>
        </article>
    </div>
</template>

<script>
export default {
    name: 'badges'
};
</script>
