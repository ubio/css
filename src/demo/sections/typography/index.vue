<template>
    <div>
        <base-headings />
        <base-copy />

        <article class="article">
            <header class="article__title">Custom headings</header>
            <spec
                name="All caps h1"
                code="h1.all-caps.color--secondary"
                source="typography.css">
                <h1 class="all-caps color--secondary">We are <strong>ubio</strong>. We automate the web.</h1>
            </spec>
            <spec
                name="All caps h2"
                code="h2.all-caps.color--secondary"
                source="typography.css">
                <h2 class="all-caps color--secondary">We are <strong>ubio</strong>. We automate the web.</h2>
            </spec>
            <spec
                name="All caps h3"
                code="h3.all-caps.color--secondary"
                source="typography.css">
                <h3 class="all-caps color--secondary">We are <strong>ubio</strong>. We automate the web.</h3>
            </spec>
            <spec
                name="All caps h4"
                code="h4.all-caps.color--secondary"
                source="typography.css">
                <h4 class="all-caps color--secondary">We are <strong>ubio</strong>. We automate the web.</h4>
            </spec>
            <spec
                name="All caps h5"
                code="h5.all-caps.color--secondary"
                source="typography.css">
                <h5 class="all-caps color--secondary">We are <strong>ubio</strong>. We automate the web.</h5>
            </spec>
            <spec
                name="All caps h6"
                code="h6.all-caps.color--secondary"
                source="typography.css">
                <h6 class="all-caps color--secondary">We are <strong>ubio</strong>. We automate the web.</h6>
            </spec>
        </article>

        <article class="article">
            <header class="article__title">Text helpers</header>
            <spec
                name="Highlight"
                code=".text--highlight"
                source="typography.css">
                <p><b class="text--highlight">Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Ut ornare non odio sed lobortis. <i>Mauris in tortor</i> vitae ex venenatis tempus. <em class="text--highlight">Donec efficitur <a href="#">eget</a> lectus eget placerat. Ut non condimentum mauris, eu sodales neque</em>. Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec <strong>pharetra</strong> <span  class="text--highlight">mauris vulputate molestie.</span></p>
            </spec>
            <spec
                name="Truncate"
                code=".text--truncate"
                source="typography.css">
                <p class="text--truncate"><b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Ut ornare non odio sed lobortis. <i>Mauris in tortor</i> vitae ex venenatis tempus. Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec <strong>pharetra</strong> <span  class="text--highlight">mauris vulputate molestie.</span></p>
            </spec>
            <spec
                name="All caps"
                code=".all-caps"
                source="typography.css">
                <p class="all-caps"><b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. <i>Mauris in tortor</i> vitae ex venenatis tempus. Mauris suscipit pretium lectus, nec <strong>pharetra</strong></p>
            </spec>
            <spec
                name="Monospaced"
                code=".text--mono"
                source="typography.css">
                <p class="text--mono">
                    THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG.<br />
                    The quick brown fox jumped over the lazy dog.<br />
                    0123456789<br />
                    11111.11<br />
                    88888.88<br />
                    0Oo il1I! Z2z 8$s5S😺‼✏⚠😭⤴⤵</p>
            </spec>
            <spec
                name="Code"
                :code="`.code`"
                source="typography.css">
                <div>
                    <p>
                        <strong>During the lifecycle of a Job its state changes. You poll to get the latest status.</strong><br />
                        <code class="code">processing</code>,
                        <span class="code">awaitingInput</span>,
                        <code class="code">awaitingTds</code>,
                        <span class="code">success</span>,
                        <code class="code">fail</code>
                    </p>
                </div>
            </spec>
            <spec
                name="Dark preformated code snippet"
                code=".pre"
                source="base.css">
                <div class="pre stretch">curl -X GET \
        https://api-staging.automationcloud.net/services \
        -H 'authorization: $BASIC_AUTH_HEADER' \
        -H 'content-type: application/json'</div>
            </spec>
        </article>
    </div>
</template>

<script>
import BaseHeadings from './base-headings.vue';
import BaseCopy from './base-copy.vue';

export default {
    name: 'typography',

    components: {
        'base-headings': BaseHeadings,
        'base-copy': BaseCopy
    }
};
</script>
