import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [svelte()],
    server: {
        host: '0.0.0.0',          // Listen on all network interfaces
        port: 8082,               // Port number
        hmr: {
            host: '172.22.194.204', // Your IP address
            port: 8082              // Same port as above
        }
    }
});