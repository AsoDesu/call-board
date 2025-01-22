<script lang="ts">
    import type { Production } from "$lib/types/production";

    export let production: Production;
</script>

<div class="box production-info">
    <h1>{production.name}</h1>
    <h2>{production.company}</h2>
</div>

<style lang="scss">
    .production-info {
        padding: 25px 20px 25px 20px;

        h1 {
            margin: 0;
            font-weight: 500;
            font-size: 32px;
            line-height: 100%;
            padding-bottom: 2px;
        }

        h2 {
            margin: 0;
            font-weight: 300;
            font-size: 22px;
            line-height: 100%;
        }
    }
</style>
