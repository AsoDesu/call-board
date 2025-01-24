<script lang="ts">
    import ProductionMemberDetail from "$lib/components/production_member/ProductionMemberDetail.svelte";
    import ProductionMemberIcon from "$lib/components/production_member/ProductionMemberIcon.svelte";
    import { production_members } from "$lib/state/production_state";
    import type { SignInState } from "$lib/types/sign_in";
    import Icon from "@iconify/svelte";

    let { signIn }: { signIn: SignInState } = $props();

    let member = $derived.by(() => {
        let selectedMember = $production_members.find((it) => it.id == signIn.member_id);
        if (selectedMember == null) {
            return signIn.member_info;
        }
        return selectedMember;
    });
    $inspect(member);
</script>

<div class="signed-in-container">
    <div class="text">
        <Icon icon="material-symbols:how-to-reg-outline-rounded" />
        <span>You're signed in!</span>
    </div>

    <div class="field">
        <div class="field-icon box">
            <ProductionMemberIcon {member} />
        </div>
        <div class="content box">
            <ProductionMemberDetail {member} />
        </div>
    </div>
</div>

<style lang="scss">
    .signed-in-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 30px;
        gap: 15px;
    }

    .text :global {
        display: flex;
        align-items: center;
        gap: 15px;

        svg {
            font-size: 60px;
        }

        span {
            font-size: 28px;
            font-weight: 500;
        }
    }

    .field :global {
        display: flex;
        width: 100%;
        gap: 7.5px;

        .field-icon {
            $padding: 10px;
            $size: 64px;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            width: $size;
            height: $size;

            .icon {
                width: calc($size - ($padding * 2));
                height: calc($size - ($padding * 2));
            }
        }

        .content {
            flex-grow: 1;
            display: flex;
            align-items: center;
            padding: 15px;
        }
    }
</style>
