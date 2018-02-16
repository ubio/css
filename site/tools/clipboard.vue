<template>
    <a class="clipboard" @click.stop="copy()" :title="title ? title : 'Copy to Clipboard'">
        <span class="clipboard__icon">
            <i v-if="copied" class="fa fa-check"></i>
            <i v-else-if="faIconClassName" :class="`fa ${ faIconClassName }`"></i>
            <svg
                v-else
                :width="iconSize"
                :height="iconSize"
                viewBox="340 364 14 15"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="currentColor"
                    d="M342 375.974h4v.998h-4v-.998zm5-5.987h-5v.998h5v-.998zm2 2.994v-1.995l-3 2.993 3 2.994v-1.996h5v-1.995h-5zm-4.5-.997H342v.998h2.5v-.997zm-2.5 2.993h2.5v-.998H342v.998zm9 .998h1v1.996c-.016.28-.11.514-.297.702-.187.187-.422.28-.703.296h-10c-.547 0-1-.452-1-.998v-10.976c0-.546.453-.998 1-.998h3c0-1.107.89-1.996 2-1.996 1.11 0 2 .89 2 1.996h3c.547 0 1 .452 1 .998v4.99h-1v-2.995h-10v8.98h10v-1.996zm-9-7.983h8c0-.544-.453-.996-1-.996h-1c-.547 0-1-.453-1-.998 0-.546-.453-.998-1-.998-.547 0-1 .452-1 .998 0 .545-.453.998-1 .998h-1c-.547 0-1 .452-1 .997z"
                    fill-rule="evenodd">
                </path>
            </svg>
        </span>
        <span v-if="label" class="clipboard__label" v-html="label"></span>
    </a>
</template>

<script>
/* eslint-disable no-console */

module.exports = {
    props: {
        data: { required: true },
        label: { type: String, required: false },
        iconSize: { type: Number, required: false, default: 10 },
        faIconClassName: {
            type: String,
            required: false,
            validator: value => value.match(/^fa-/),
        },
        title: { type: String, required: false },
    },

    data() {
        return {
            copied: false,
        };
    },

    methods: {
        copy() {
            this.copyDataToClipboard(this.data);
            this.copied = true;
            setTimeout(() => this.copied = false, 300);
        },

        copyDataToClipboard(data) {
            const text = typeof data === 'string' ? data : JSON.stringify(data, null, 4);
            const textArea = document.createElement('textarea');
            textArea.style.position = 'fixed';
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                const msg = successful ? 'successful' : 'unsuccessful';
                console.info('Copying text command was ' + msg);
            } catch (err) {
                console.error('Oops, unable to copy');
            }

            document.body.removeChild(textArea);
        },
    },
};
</script>

<style>
.clipboard {
    display: inline-block;
    color: inherit;
}

.clipboard__icon {
    width: 1.2em;
    height: 1em;
    font-size: .9em;
    line-height: 1;
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    color: currentColor;
}

.clipboard__label {
    line-height: 1;
    vertical-align: baseline;
}
</style>
