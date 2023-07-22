import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { CustomHmr } from './src/utils/customHmr.js';

export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        svgrPlugin(),
        CustomHmr()
    ],
    server: {
        port: 3000
    },
    build: {
        outDir: 'build',
        minify: 'esbuild',
    },
    esbuild: {
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
    },
    resolve: {
        alias: {
          process: 'process/browser',
          stream: 'stream-browserify',
          zlib: 'browserify-zlib',
          util: 'util'
        }
    },
})
