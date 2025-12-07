import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'path';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        globals: true,
        environment: 'jsdom',
        alias: {
            '@none/shared': path.resolve(__dirname, '../shared/src'),
        },

        setupFiles: './vitest.setup.ts',
    },
});
