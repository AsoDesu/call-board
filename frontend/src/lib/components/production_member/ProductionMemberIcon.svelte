<script lang="ts">
    import Icon from "@iconify/svelte";

    export let member: ProductionMember;

    let icons = {
        crew: "material-symbols:engineering-outline-rounded",

        $else: "material-symbols:person-outline-rounded"
    } as { [key: string]: string };
</script>

{#if member.icon}
    <div class="icon icon-img" style={`background-image: url("${member.icon}")`}></div>
{:else}
    <div class="icon">
        <Icon icon={icons[member.department.toLowerCase()] ?? icons.$else} height={48} />
    </div>
{/if}

<style lang="scss">
    .icon-img {
        border-radius: 100%;
        background-size: cover;
    }
</style>
