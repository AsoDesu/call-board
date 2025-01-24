<script lang="ts">
    export let member: ProductionMember;
</script>

<div class="detail">
    <span class="name">{member.name}</span>
    <span class="desc">{member.department} • {member.role}</span>
</div>

<style lang="scss">
    .detail {
        display: flex;
        flex-direction: column;
        line-height: 100%;
        gap: 2.5px;

        .name {
            font-size: 18px;
            font-weight: 500;
        }
        .desc {
            color: #cccccc;
            font-size: 14px;
            font-weight: 300;
            text-overflow: ellipsis;
        }
    }
</style>
