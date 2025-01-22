<script lang="ts">
    import Icon from "@iconify/svelte";
    import Ripple from "@smui/ripple";
    export let person: ProductionMember;
    export let onSelect: (person: ProductionMember) => void = (person) => {};

    let icons = {
        crew: "material-symbols:engineering-outline-rounded",

        $else: "material-symbols:person-outline-rounded"
    } as { [key: string]: string };

    function onClick() {
        onSelect(person);
    }
    function onKeyPress() {
        onSelect(person);
    }
</script>

<div
    class="box member"
    use:Ripple={{ surface: true, color: "primary" }}
    onclick={onClick}
    onkeypress={onKeyPress}
    role="button"
    aria-disabled="false"
    tabindex="0"
>
    {#if person.icon}
        <div class="icon icon-img" style={`background-image: url("${person.icon}")`}></div>
    {:else}
        <div class="icon">
            <Icon icon={icons[person.department.toLowerCase()] ?? icons.$else} height={48} />
        </div>
    {/if}
    <div class="detail">
        <span class="name">{person.name}</span>
        <span class="desc">{person.department} • {person.role}</span>
    </div>
</div>

<style lang="scss">
    .member {
        display: flex;
        gap: 10px;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.15);

        padding: 10px;

        .icon {
            height: 48px;
            width: 48px;
        }

        .icon-img {
            border-radius: 100%;
            background-size: cover;
        }

        .detail {
            display: flex;
            flex-direction: column;
            line-height: 100%;
            gap: 2.5px;

            .name {
                font-size: 18px;
                font-weight: 500;
            }
            .desc {
                color: #cccccc;
                font-size: 14px;
                font-weight: 300;
                text-overflow: ellipsis;
            }
        }
    }
</style>
