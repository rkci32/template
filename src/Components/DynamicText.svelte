<script>
    export let substations = [];
</script>

<div class="substation-list">
    {#if substations.length > 0}
        <ul>
            {#each substations as substation}
                <li>{substation}</li>
            {/each}
        </ul>
    {:else}
        <p>Loading substations...</p>
    {/if}
</div>

<style>
    .substation-list {
        margin-top: 0.5rem;
        padding: 0.5rem;
        background-color: #f5f5f5;
        border-radius: 8px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        font-size: 0.7rem;
        padding: 0.2rem 0;
    }
</style>