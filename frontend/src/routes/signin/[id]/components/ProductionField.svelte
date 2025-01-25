<script lang="ts">
    import { getIcon, type ProductionField } from "$lib/types/production";
    import { ordinalSuffix } from "$lib/utils";
    import Icon from "@iconify/svelte";

    let { field }: { field: ProductionField } = $props();

    let convertedContent = $derived.by(() => {
        if (field.type == "date") {
            let date = new Date(+field.content);

            let dateString = date.toLocaleDateString("default", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });
            let timeString = date.toLocaleTimeString("default", {
                hour12: true,
                hour: "numeric",
                minute: "numeric"
            });
            return `${dateString} • ${timeString}`;
        } else {
            return field.content;
        }
    });
</script>

<div class="field">
    <div class="box icon">
        <Icon icon={getIcon(field.type)}></Icon>
    </div>
    <div class="box content">{convertedContent}</div>
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
