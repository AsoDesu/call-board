<script lang="ts">
    import Button, { Label } from "@smui/button";
    import ActionItem from "./ActionItem.svelte";
    import { department_selected } from "$lib/state/flow_state";
    import { production_departments } from "$lib/state/production_state";
    export let advanceFlow: () => void;

    function selectDepartment(department: string) {
        return () => {
            $department_selected = department;
            advanceFlow();
        };
    }
</script>

<div class="select-department">
    <span class="question">What department are you apart of?</span>
    <div class="buttons">
        {#each $production_departments as department}
            <Button variant="unelevated" onclick={selectDepartment(department.toLowerCase())}>
                <Label>{department}</Label>
            </Button>
        {/each}
    </div>
</div>

<style lang="scss">
    @use "$lib/vars";

    .select-department :global {
        padding-bottom: 35%;
        width: 100%;
        .question {
            font-size: 15px;
            color: vars.$secondary-text;
        }

        .buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-top: 5px;
            padding-left: 15px;
            padding-right: 15px;
            button {
                font-size: 18px;
                height: 40px;
            }
        }
    }
</style>
