<script>
    import Button, { Label } from "@smui/button";
    import ActionItem from "./ActionItem.svelte";
    import SignInButtonItem from "./SignInButtonItem.svelte";
    import SelectDepartmentItem from "./SelectDepartmentItem.svelte";
    import SelectUserItem from "./select_users/SelectMemberItem.svelte";

    let flow = ["signin", "select_department", "select_human"];
    export let action = "signin";

    function advanceFlow() {
        let i = (flow.indexOf(action) + 1) % flow.length;
        action = flow[i];
        console.log(action);
    }
</script>

<div class="actions">
    {#if action == "signin"}
        <ActionItem><SignInButtonItem {advanceFlow} /></ActionItem>
    {:else if action == "select_department"}
        <ActionItem><SelectDepartmentItem {advanceFlow} /></ActionItem>
    {:else if action == "select_human"}
        <ActionItem><SelectUserItem {advanceFlow} /></ActionItem>
    {/if}
</div>

<style lang="scss">
    @use "$lib/vars";

    .actions :global {
        $padding: 15px;
        $width: calc(100vw - ($padding * 2) - (vars.$safe-area-padding * 2));

        overflow: hidden;
        position: relative;
        height: 100px;
        flex-grow: 1;

        .action-item :global {
            width: $width;
            padding-left: $padding;
            padding-right: $padding;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: end;
            top: 0;
            left: 0;
        }
    }
</style>
