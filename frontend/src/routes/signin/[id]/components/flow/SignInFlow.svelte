<script>
    import Button, { Label } from "@smui/button";
    import CircularProgress from "@smui/circular-progress";
    import ActionItem from "./ActionItem.svelte";
    import SignInButtonItem from "./SignInButtonItem.svelte";
    import SelectDepartmentItem from "./SelectDepartmentItem.svelte";
    import SelectUserItem from "./select_users/SelectMemberItem.svelte";
    import { selected_member } from "$lib/state/flow_state";
    import { production_info } from "$lib/state/production_state";
    import { api } from "$lib/api/api";
    import { current_show_sign_in } from "$lib/state/sign_in_state";
    import LoadingFlowItem from "./LoadingFlowItem.svelte";
    import SignedInFlowItem from "./signed_in/SignedInFlowItem.svelte";

    let flow = ["signin", "select_department", "select_human"];
    export let action = "signin";

    let loading = false;

    function advanceFlow() {
        let i = flow.indexOf(action) + 1;
        if (i >= flow.length) {
            finishFlow();
        }
        action = flow[i];
    }

    async function finishFlow() {
        loading = true;
        if ($selected_member == null) {
            console.log("selected member is null....");
            return;
        }

        await api.signIn($selected_member);
        action = "signin";
        loading = false;
    }
</script>

<div class="actions">
    {#if loading}
        <ActionItem><LoadingFlowItem /></ActionItem>
    {:else if $current_show_sign_in != null}
        <ActionItem><SignedInFlowItem signIn={$current_show_sign_in} /></ActionItem>
    {:else if action == "signin"}
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
