<script lang="ts">
    import type { Production } from "$lib/types/production";
    import { fade, fly } from "svelte/transition";
    import ProductionField from "./ProductionField.svelte";
    import ProductionInfo from "./ProductionInfo.svelte";

    export let production: Production;
    export let showFields: boolean = true;
</script>

<div class="production-info">
    <ProductionInfo {production} />
    {#if showFields}
        <div class="list" in:fade={{ duration: 100 }} out:fly={{ duration: 100 }}>
            {#each production.fields as field}
                <ProductionField {field} />
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .production-info {
        gap: 15px;
        display: flex;
        flex-direction: column;

        .list {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
</style>
