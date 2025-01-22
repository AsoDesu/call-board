<script lang="ts">
    import { getIcon, type ProductionField } from "$lib/types/production";
    import Icon from "@iconify/svelte";

    export let field: ProductionField;
</script>

<div class="field">
    <div class="box icon">
        <Icon icon="material-symbols:{getIcon(field.type)}"></Icon>
    </div>
    <div class="box content">{field.content}</div>
</div>

<style lang="scss">
    .field {
        display: flex;
        width: 100%;
        gap: 5px;

        .icon :global {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            svg {
                font-size: 20px;
            }
        }

        .content {
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: 10px;

            font-weight: 300;
        }
    }
</style>
