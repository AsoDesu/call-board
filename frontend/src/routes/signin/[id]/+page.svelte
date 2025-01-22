<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Icon from "@iconify/svelte";
    import type { Production } from "$lib/types/production";
    import ProductionDetail from "./components/ProductionDetail.svelte";
    import Logo from "$lib/components/Logo.svelte";
    import { fly } from "svelte/transition";
    import ActionItem from "./components/flow/ActionItem.svelte";
    import SignInFlow from "./components/flow/SignInFlow.svelte";

    let production: Production = {
        name: "Production Name",
        company: "Theatre Company",
        fields: [
            { type: "location", content: "Venue Name" },
            { type: "date", content: "23rd December 2025 • 3pm" }
        ]
    };

    let action: string;
    $: showFields = action == "signin";
</script>

<div class="mobile-container sign-in" style="--hue: 316">
    <header class="header">
        <Icon icon="material-symbols:done-all-rounded" />
    </header>

    <ProductionDetail {production} bind:showFields />
    <SignInFlow bind:action />

    <div class="logo">
        <Logo />
    </div>
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
