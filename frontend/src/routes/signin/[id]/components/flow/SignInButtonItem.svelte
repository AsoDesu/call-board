<script>
    import Button, { Label } from "@smui/button";

    export let advanceFlow;
</script>

<div class="sign-in-button">
    <Button variant="unelevated" onclick={advanceFlow}>
        <Label>Sign In</Label>
    </Button>
</div>

<style lang="scss">
    .sign-in-button :global {
        padding-bottom: 35%;
        width: 100%;
        button {
            width: 100%;
            font-size: 18px;
            height: 40px;
        }
    }
</style>
