<article class="card">
    <slot name="Division"></slot>
    <slot name="Photo"></slot>
    <slot name="DSOE"></slot>
    <!-- <slot name="Regular Hours"></slot> -->
    <slot name="BackupDSOE"></slot>
    <slot name="Substation"></slot>
</article>

<style>
    .card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: white;
        cursor: pointer;
        max-width: 200px;  /* Reduced from 250px */
        margin: 0.2rem;    /* Reduced from 0.5rem */
    }

    .card:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

</style>