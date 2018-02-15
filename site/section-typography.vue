<template>
    <div class="section" id="typography" :class="{ 'section--active': activeItem === 'typography' }">
        <div class="section__title" :class="{ 'section__title--active': activeItem === 'typography' }">
            <i class="fa fa-font section__title-icon"></i>
            <span class="section__title-label">Typography</span>
        </div>
        <div class="section__body">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <p>Paragraph text – 12px LF Regular #000 – showing <b>bold type</b>, <span class="highlight">highlight</span>, <span class="muted">muted</span> text, a <a href="#">multi-word link</a> and also lots of flowing text lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare non odio sed lobortis. Mauris in tortor vitae ex venenatis tempus. Donec efficitur eget lectus eget placerat. Ut non condimentum mauris, eu sodales neque. Proin porttitor bibendum ullamcorper. Mauris suscipit pretium lectus, nec pharetra mauris vulputate molestie.</p>
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
