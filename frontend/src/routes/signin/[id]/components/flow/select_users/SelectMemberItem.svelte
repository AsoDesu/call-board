<script lang="ts">
    import Icon from "@iconify/svelte";
    import Select, { Option } from "@smui/select";
    import Textfield from "@smui/textfield";
    import TextIcon from "@smui/textfield/icon";
    import HelperText from "@smui/textfield/helper-text";
    import SelectMember from "./SelectMember.svelte";
    import { compareName, containsIgnoreCase, seperateArray } from "$lib/utils";
    import { department_selected, selected_member } from "$lib/state/flow_state";
    import { production_departments, production_members } from "$lib/state/production_state";
    import { previous_show_sign_in } from "$lib/state/sign_in_state";
    import { Icons } from "$lib/icons";

    let { search = $bindable(""), advanceFlow, ...props } = $props();

    let lastSelected = $derived.by(() => {
        let memberId = $previous_show_sign_in?.member_id;
        if (memberId == null) return null;
        return $production_members.find((member) => member.id == memberId);
    });

    let sortedHumans = $derived.by(() => {
        let members = Array.of(...$production_members);
        if (search == "") {
            let [inDepartment, rest] = seperateArray(
                members,
                (it) => it.department.toLowerCase() == $department_selected
            );
            sortMembers(inDepartment);
            sortMembers(rest);
            return [inDepartment, rest];
        } else {
            let filtered = members.filter(
                (it) => containsIgnoreCase(it.name, search) || containsIgnoreCase(it.role, search)
            );
            return [filtered];
        }
    });

    function sortMembers(members: ProductionMember[]) {
        return members.sort((a, b) => {
            let aValue = a.department.toLowerCase() == $department_selected ? 1 : -1;
            let bValue = b.department.toLowerCase() == $department_selected ? 1 : -1;

            if (aValue != bValue) return bValue - aValue;
            else return compareName(a.name, b.name);
        });
    }
    function onSelect(person: ProductionMember) {
        $selected_member = person;
        advanceFlow();
    }
</script>

<div class="select-human">
    <div class="controls">
        <Select variant="outlined" bind:value={$department_selected} class="select">
            {#each $production_departments as department}
                <Option value={department.toLowerCase()}>{department}</Option>
            {/each}
        </Select>

        <Textfield variant="outlined" bind:value={search} label="Search" class="search">
            {#snippet leadingIcon()}
                <TextIcon><Icon icon={Icons.search} height={25} /></TextIcon>
            {/snippet}
        </Textfield>
    </div>
    <div class="box humans-container">
        <div class="humans">
            <!-- TODO: last selected -->
            {#if search == "" && lastSelected != null}
                <div class="divider">Last Selected</div>
                <div class="last-selected">
                    <SelectMember person={lastSelected} {onSelect}></SelectMember>
                </div>
                <div class="divider"></div>
            {/if}

            {#each sortedHumans as category, categoryIndex}
                {#each category as person}
                    <SelectMember {person} {onSelect} />
                {/each}
                {#if categoryIndex < sortedHumans.length - 1}
                    <div class="divider"></div>
                {/if}
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .select-human :global {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: calc(100% - 25px);

        .controls {
            display: flex;
            gap: 10px;

            .select {
                width: 33%;

                .mdc-select__dropdown-icon {
                    margin-left: 2px;
                    margin-right: 16px;
                }
            }

            .search {
                flex-grow: 1;

                * {
                    font-size: 15px;
                }

                .mdc-text-field__icon--leading {
                    margin-left: 15px;
                    margin-right: 15px;
                }
            }
        }

        .humans-container {
            height: 100%;
            overflow: scroll;
        }

        ::-webkit-scrollbar {
        }

        .humans {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding: 15px;
            gap: 10px;
            overflow: scroll;
        }
    }
</style>
