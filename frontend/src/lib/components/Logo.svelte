<script>
    import { Icons } from "$lib/icons";
    import Icon from "@iconify/svelte";
</script>

<div class="logo">
    <Icon icon={Icons.developerBoard} width={32} />
    <span>Call Board</span>
</div>

<style lang="scss">
    .logo :global {
        display: flex;
        align-items: center;
        gap: 5px;

        svg {
            width: 32px;
        }

        span {
            font-size: 16px;
            font-weight: 700;
        }
    }
</style>
