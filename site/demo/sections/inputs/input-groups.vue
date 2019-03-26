<template>
    <article>
        <header>Groups</header>
        <spec
            name="Labeled input"
            code=".group.group--gap"
            source="group.css">
            <div class="group group--gap">
                <label for="input1">Label</label>
                <input id="input1" placeholder="Placeholder" type="text" />
            </div>
        </spec>
        <spec
            name="Labeled input stretched"
            code=".group.group--gap.stretch"
            source="group.css">
            <div class="group group--gap stretch">
                <label for="input2">Label</label>
                <input
                    id="input2"
                    placeholder="Placeholder"
                    type="text" />
            </div>
        </spec>
        <spec
            name="Labeled input"
            code=".grid.box, .grid.box.stretch"
            source="grid.css">
            <div class="group stretch group--gap--large">
                <div class="grid box box--cool">
                    <label for="input3">Label</label>
                    <input id="input3" placeholder="Placeholder" type="text" />
                </div>
                <div class="grid box stretch">
                    <label for="input4">Label</label>
                    <input id="input4" placeholder="Placeholder" type="text" />
                </div>
            </div>
        </spec>
        <spec
            name="Icon label"
            code=".group"
            source="group.css">
            <div class="group group--gap stretch">
                <div class="box box--mono group stretch">
                    <label class="icon">
                        <i class="fa fa-search"></i>
                    </label>
                    <input
                        type="text"
                        placeholder="Search" />
                </div>
                <div class="box group">
                    <label class="icon">
                        <i class="fa fa-search"></i>
                    </label>
                    <input
                        type="text"
                        placeholder="Search" />
                </div>
            </div>
        </spec>
        <spec
            name="Icon label stretch"
            code=".group.stretch"
            source="group.css">
            <div class="box box--warm group stretch">
                <label class="icon">
                    <i class="fa fa-search"></i>
                </label>
                <input
                    type="text"
                    placeholder="Search" />
            </div>
        </spec>
        <spec
            name="Icon inside"
            :code="`.input.stretch
        .icon.color--muted
        input[type=text]`"
            source="input.css">
            <span class="input stretch">
                <span class="icon color--muted">
                    <i class="fa fa-search"></i>
                </span>
                <input
                    type="text"
                    placeholder="key for user@ub.io" />
            </span>
        </spec>
        <spec
            name="Frameless button inside"
            :code="`.button.button--icon frameless`"
            source="input.css, button.css">
            <div class="group group--gap--large">
                <span class="input stretch">
                    <input
                        type="text"
                        placeholder="key for user@ub.io" />
                    <button class="button button--primary button--icon frameless">
                        <i class="fa fa-sync"></i>
                    </button>
                </span>
                <span class="input">
                     <input
                        type="text"
                        placeholder="key for user@ub.io" />
                    <button class="button button--secondary button--icon frameless">
                        <i class="fa fa-sync"></i>
                    </button>
                </span>
                <span class="input">
                     <input
                        type="text"
                        placeholder="key for user@ub.io" />
                    <button class="button button--accent button--icon frameless">
                        <i class="fa fa-sync"></i>
                    </button>
                </span>
                <span class="input">
                     <input
                        type="text"
                        placeholder="key for user@ub.io" />
                    <button class="button button--icon frameless">
                        <i class="fa fa-sync"></i>
                    </button>
                </span>
            </div>
        </spec>
        <spec
            name="Icon inside"
            :code="`.input
        .icon.color--muted
        input[type=text]`"
            source="input.css">
            <span class="input">
                <span class="icon color--muted">
                    <i class="fa fa-search"></i>
                </span>
                <input
                    type="text"
                    placeholder="key for user@ub.io" />
            </span>
        </spec>
        <spec
            name="Button aside"
            :code="`.group.group--gap--small`"
            source="input.css, button.css">
            <div class="grid">
                <div class="group group--gap--small">
                    <input
                        type="text"
                        placeholder="key for user@ub.io" />
                    <button class="button button--primary">
                        <i class="icon fa fa-sync"></i>
                        Search
                    </button>
                </div>
            </div>
        </spec>
        <spec
            name="Button merged with input"
            :code="`.group.group--merged`"
            source="input.css, button.css">
            <div class="group group--gap--large">
                <div class="group group--merged">
                    <input
                        type="text"
                        class="input"
                        placeholder="key for user@ub.io" />
                    <button class="button button--primary">
                        Search
                    </button>
                </div>
                <div class="group group--merged group--merged--border">
                    <input
                        type="text"
                        class="input"
                        placeholder="key for user@ub.io" />
                    <button class="button">
                        Search
                    </button>
                </div>
            </div>
        </spec>
        <spec
            name="Buttons merged with input"
            :code="`.group.group--merged`"
            source="input.css, button.css">
            <div class="grid">
                <div class="group group--merged">
                    <input
                        type="text"
                        class="input"
                        placeholder="key for user@ub.io" />
                    <button class="button button--icon button--secondary">
                        <i class="fa fa-cog"></i>
                    </button>
                    <button class="button button--icon button--flat button--primary">
                        <i class="fas fa-mouse-pointer"></i>
                    </button>
                </div>
            </div>
        </spec>
    </article>
</template>

<script>
module.exports = {
    name: 'controls-groups'
};
</script>
