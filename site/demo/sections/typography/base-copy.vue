<template>
    <article class="article">
        <header class="article__title">Base: Copy styles</header>
        <spec
            name="Standard paragraph"
            code="p"
            source="base.css">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare non odio sed lobortis. Mauris in tortor vitae ex venenatis tempus. Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.</p>
        </spec>
        <spec
            name="Inline elements <br />(bolds, italics, links, code, time)"
            :code="`b, strong\ni, em\na\ncode, time\nmark`"
            source="base.css">
            <p><b>Lorem <strong>STRONGER TEXT</strong> dolor sit amet</b>, consectetur <code>I'm code sample: 1ee37a17-a730-405e-b066</code> adipiscing elit. Ut ornare non odio sed lobortis. <i>Mauris in tortor</i> vitae ex venenatis tempus. <em>Donec efficitur <a href="#">eget</a> lectus <mark>eget placerat. Ut non condimentum mauris, eu sodales neque</mark></em>. <time>I'm time sample: 11.12.2019</time> porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec <strong>pharetra</strong> mauris vulputate molestie.
        </p>
        </spec>
        <spec
            name="Preformated code"
            :code="`pre`"
            source="base.css">
            <pre>{{ `curl -X GET \\
    https://api.automationcloud.net/services \\
    -H 'authorization: $BASIC_AUTH_HEADER' \\
    -H 'content-type: application/json'` }}
            </pre>
        </spec>
        <spec
            name="Unordered list"
            code="ul li"
            source="base.css">
            <ul>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Ut ornare non odio sed lobortis</li>
            </ul>
        </spec>
        <spec
            name="Ordered list"
            code="ol li"
            source="base.css">
            <ol>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Ut ornare non odio sed lobortis</li>
            </ol>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'typography-base-copy'
};
</script>
