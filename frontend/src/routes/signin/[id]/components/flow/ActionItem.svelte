<script>
    import { fly } from "svelte/transition";
</script>

<div class="action-item" in:fly={{ duration: 350, x: 150 }} out:fly={{ duration: 350, x: -150 }}>
    <slot />
</div>
