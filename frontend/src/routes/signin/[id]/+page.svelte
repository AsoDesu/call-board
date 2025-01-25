<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Icon from "@iconify/svelte";
    import type { Production } from "$lib/types/production";
    import ProductionDetail from "./components/ProductionDetail.svelte";
    import Logo from "$lib/components/Logo.svelte";
    import { fly } from "svelte/transition";
    import ActionItem from "./components/flow/ActionItem.svelte";
    import SignInFlow from "./components/flow/SignInFlow.svelte";
    import { production_info, show_info } from "$lib/state/production_state";
    import { api } from "$lib/api/api";
    import type { PageProps } from "./$types";
    import { flow_action } from "$lib/state/flow_state";
    import { doAsync } from "$lib/utils";
    import LoadingFlowItem from "./components/flow/LoadingFlowItem.svelte";
    import { Icons, preloadIcons } from "$lib/icons";

    let { data }: PageProps = $props();
    let showFields = $derived.by(() => $flow_action == "signin");

    let loadPromise = doAsync(async () => {
        await preloadIcons();
        $show_info = await api.getShow(data.show_id);
        $production_info = await api.getProduction($show_info.production_id);
    });
</script>

<div class="mobile-container sign-in" style="--hue: 316">
    {#await loadPromise}
        <LoadingFlowItem />
    {:then data}
        <header class="header">
            <Icon icon={Icons.doneAll} />
        </header>

        <ProductionDetail production={$production_info} showing={$show_info} {showFields} />
        <SignInFlow />

        <div class="logo">
            <Logo />
        </div>
    {:catch err}
        {err?.message}
    {/await}
</div>

<style lang="scss">
    @use "$lib/vars";

    .sign-in {
        display: flex;
        flex-direction: column;

        background: linear-gradient(
            180deg,
            hsl(var(--hue), 31%, 11%) 0%,
            hsl(var(--hue), 31%, 25%) 100%
        );

        width: 100%;
        height: 100dvh;

        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
    }

    .header {
        $height: calc(vars.$screen-height * 0.115);
        width: 100%;
        height: $height;
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: calc($height * 0.9);
        padding-bottom: vars.$safe-area-padding;
    }

    .logo {
        padding-top: 15px;
    }
</style>
