<script lang="ts">
    import { Icons } from "$lib/icons";
    import Icon from "@iconify/svelte";

    export let member: ProductionMember;

    let icons = {
        crew: Icons.engineering,

        $else: Icons.person
    } as { [key: string]: string };
</script>

{#if member.icon}
    <div class="icon icon-img" style={`background-image: url("${member.icon}")`}></div>
{:else}
    <div class="icon icon-svg">
        <Icon icon={icons[member.department.toLowerCase()] ?? icons.$else} height="100%" />
    </div>
{/if}

<style lang="scss">
    .icon-img {
        border-radius: 100%;
        background-size: cover;
    }
</style>
