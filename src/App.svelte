<script>
    import { onMount } from 'svelte';
    import Card from "./Components/Card.svelte";
    import DynamicText from "./Components/DynamicText.svelte";
    import { loadCSV, loadSubstations } from './loadCSV.js';

    let cardText = [];
    let showMore = [];
    let loading = true;
    let error = null;
    let substationLists = {};

    // Load the CSV data when component mounts
    loadCSV('/data/Contact.csv').then(data => {
        console.log('CSV Data loaded:', data);
        cardText = data;
        showMore = Array(data.length).fill(false);
        loading = false;
    }).catch(err => {
        console.error('Error loading CSV:', err);
        error = err;
        loading = false;
    });

    async function toggleViewMore(index) {
        showMore[index] = !showMore[index];
        
        if (showMore[index] && !substationLists[cardText[index].Division]) {
            try {
                substationLists[cardText[index].Division] = await loadSubstations(cardText[index].Division);
            } catch(err) {
                console.error('Error loading substations:', err);
            }
        }
    }
</script>

<main>
    <h1>Central DCC DSOE Area Coverage</h1>
    <h2>
        <a href="http://10.248.84.230:8082/" target="_blank" rel="noopener noreferrer">
            For any support outside of regular hours - click here for "On-Call" DSOE contact information
        </a>
    </h2>

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error.message}</p>
    {:else if cardText.length === 0}
        <p>No data loaded</p>
    {:else}
        <div class="card-container">
            {#each cardText as card, i}
                <div class="card-wrapper">
                    <Card>
                        <h3 slot="Division">{card.Division}</h3> 
                        <div slot="Photo" class="image-container">
                            <img src={card.DSOE_Photo} alt="Photo of {card.DSOE}" class="card-image">
                        </div>
                        <h4 slot="DSOE">{card.DSOE}</h4>
                        <h5 slot="BackupDSOE">Backup: {card.BackupDSOE}</h5>
                        <button slot="Substation" on:click={() => toggleViewMore(i)}>
                            {showMore[i] ? 'Hide' : 'Display Substation List'}
                        </button>
                    </Card>
                    {#if showMore[i]}
                        <DynamicText substations={substationLists[card.Division] || []} />
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</main>

<style>
    h1 {
        text-align: center;
        font-weight: bold;
    }

    h2 {
        text-align: center;
        font-weight: bold;
        font-size: 1.5rem;
        text-transform: uppercase;
    }

    h3 {
        text-align: center;
        font-weight: bold;
        font-size: 1.6rem;
    }

    h4 {
        text-align: center;
        font-weight: bold;
        font-size: 1.2rem;
    }

    h5 {
        text-align: center;
        font-weight: bold;
        font-size: 0.7rem;
        transition: font-size 0.3s ease;
    }

    h5:hover {
        font-size: 0.9rem;
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        padding: 0rem;
    }

    .card-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0rem;
    }

    .image-container {
        text-align: center;
    }

    .card-image {
        max-width: 40%;
        height: auto;
        border-radius: 4px;
    }
</style>