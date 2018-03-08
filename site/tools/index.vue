<template>
    <div class="section" id="tools" :class="{ 'section--active': activeItem === 'tools' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'tools' }">
            <i class="fa fa-wrench section__title-icon"></i>
            <span class="section__title-label">tools</span>
        </div>
        <div class="section__body">
            <h3>Copy to clipboard</h3>
            <table class="section__table">
                <thead>
                    <tr>
                        <th>base</th>
                        <th>:label, :title</th>
                        <th>:icon-size</th>
                        <th>.button</th>
                        <th>:fa-icon-class-name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <clipboard data="We are ubio. We automate the web." />
                        </td>
                        <td>
                            <clipboard
                                data="We are ubio. We automate the web."
                                title="Hint text (optional, default: Copy to Clipboard)"
                                label="We are <b>ubio</b>" />
                        </td>
                        <td>
                            <span class="block group group--gap group--nowrap">
                                <clipboard data="We are ubio. We automate the web." :icon-size="9" label="9" />
                                <clipboard data="We are ubio. We automate the web." :icon-size="11" label="10 (default)" />
                                <clipboard data="We are ubio. We automate the web." :icon-size="12" label="12" />
                                <clipboard data="We are ubio. We automate the web." :icon-size="13" label="13" />
                                <clipboard data="We are ubio. We automate the web." :icon-size="14" label="14" />
                            </span>
                        </td>
                        <td>
                            <span class="block group group--gap">
                                <button class="button button--small button--primary">
                                    <clipboard
                                        data="We are ubio. We automate the web."
                                        :icon-size="9"
                                        label="Click Me!" />
                                </button>
                                <button class="button button--primary">
                                    <clipboard
                                        data="We are ubio. We automate the web."
                                        title="Hint text (optional)"
                                        label="Click Me!" />
                                </button>
                                <button class="button button--large button--primary">
                                    <clipboard
                                        data="We are ubio. We automate the web."
                                        title="Hint text (optional)"
                                        :icon-size="15"
                                        label="Click Me!" />
                                </button>
                            </span>
                        </td>
                        <td>
                            <span class="block group group--gap">
                                <clipboard
                                    data="We are ubio. We automate the web."
                                    fa-icon-class-name="fa-clipboard" label="fa-clipboard" />
                                <clipboard
                                    data="We are ubio. We automate the web."
                                    fa-icon-class-name="fa-copy" label="fa-copy" />
                                <clipboard
                                    data="We are ubio. We automate the web."
                                    fa-icon-class-name="fa-key" label="fa-key" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        activeItem: { type: String, required: false, default: '' },
    },

    components: {
        'clipboard': require('./clipboard.vue'),
    },
};
</script>
