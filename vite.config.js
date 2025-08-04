// vite.config.js
export default {
  build: {
    rollupOptions: {
      input: {
        content: 'src/content.js',
        background: 'src/background.js'
      },
      output: {
        entryFileNames: '[name].js',
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false
  }
};
