<template>
    <div class="section" id="typography" :class="{ 'section--active': activeItem === 'typography' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'typography' }">
            <i class="fa fa-font section__title-icon"></i>
            <span class="section__title-label">Typography</span>
        </div>
        <div class="section__body">
            <h1><strong>We are <b>ubio</b></strong>. We automate the web.</h1>
            <h2><strong>We are <b>ubio</b></strong>. We automate the web.</h2>
            <h3><strong>We are <b>ubio</b></strong>. We automate the web.</h3>
            <h4><strong>We are <b>ubio</b></strong>. We automate the web.</h4>
            <h5><strong>We are <b>ubio</b></strong>. We automate the web.</h5>
            <h6><strong>We are <b>ubio</b></strong>. We automate the web.</h6>
            <p>Paragraph text – 12px LF Regular <code>#242a2e</code> – showing <b>bold type</b>, <span class="highlight">highlight</span>, <span class="ui-muted">muted</span> text, a <a href="#">multi-word link</a> and also lots of flowing text lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare non odio sed lobortis. Mauris in tortor vitae ex venenatis tempus. Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.</p>
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
