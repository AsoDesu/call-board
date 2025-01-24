<script>
    import CircularProgress from "@smui/circular-progress";
</script>

<div class="loading-flow">
    <CircularProgress indeterminate />
</div>

<style lang="scss">
    .loading-flow :global {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .mdc-circular-progress {
            width: 20%;
            height: 20%;
        }
    }
</style>
