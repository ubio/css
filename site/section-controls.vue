<template>
    <div class="section">
        <div class="section__title">
            <h1>Controls</h1>
        </div>
        <div class="section__body">
            <h2>Buttons</h2>
            <div class="ctl-line">
                <button class="btn btn--default">Default</button>
                <button class="btn btn--primary">Primary</button>
                <button class="btn btn--secondary">Secondary</button>
                <button class="btn btn--success">Success</button>
                <button class="btn btn--warning">Warning</button>
                <button class="btn btn--danger">Danger</button>
                <button class="btn btn--muted">Muted</button>
            </div>

            <hr />
            <div class="ctl-line">
                <button class="btn btn--large btn--default">Default</button>
                <button class="btn btn--large btn--primary">Primary</button>
                <button class="btn btn--large btn--secondary">Secondary</button>
                <button class="btn btn--large btn--accent">Accent</button>
            </div>

            <hr />
            <div class="ctl-line">
                <button class="btn btn--small btn--default">Default</button>
                <button class="btn btn--small btn--primary">Primary</button>
                <button class="btn btn--small btn--secondary">Secondary</button>
                <button class="btn btn--small btn--success">Success</button>
                <button class="btn btn--small btn--warning">Warning</button>
                <button class="btn btn--small btn--danger">Danger</button>
                <button class="btn btn--small btn--muted">Muted</button>
            </div>

            <h2>Button states</h2>
            <div class="ctl-line">
                <button class="btn btn--default">Normal</button>
                <button class="btn btn--default btn--active">Active</button>
                <button class="btn btn--default" disabled>Disabled</button>
            </div>

            <h2>Text inputs</h2>
            <div class="ctl-line">
                <input type="text" class="input" placeholder="Regular input"/>
                <input type="text" class="input" placeholder="Disabled" disabled/>
                <button class="btn btn--default">Adjacent Button</button>
            </div>

            <h2>Control groups</h2>
            <div class="ctl-line">
                <div class="ctl-group ctl-group--inline">
                    <button class="btn btn--default">Button</button>
                    <button class="btn btn--default">Another button</button>
                </div>
                <div class="ctl-group ctl-group--inline">
                    <input type="text" class="input" placeholder="Text input">
                    <button class="btn btn--default">Button</button>
                </div>
            </div>
        </div>
    </div>
</template>
