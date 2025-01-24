<script lang="ts">
    import ProductionMemberDetail from "$lib/components/production_member/ProductionMemberDetail.svelte";
    import ProductionMemberIcon from "$lib/components/production_member/ProductionMemberIcon.svelte";
    import Icon from "@iconify/svelte";
    import Ripple from "@smui/ripple";
    export let person: ProductionMember;
    export let onSelect: (person: ProductionMember) => void = (person) => {};

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
    <ProductionMemberIcon member={person} />
    <ProductionMemberDetail member={person} />
</div>

<style lang="scss">
    .member :global {
        display: flex;
        gap: 10px;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.15);

        padding: 10px;

        .icon {
            height: 48px;
            width: 48px;
        }
    }
</style>
