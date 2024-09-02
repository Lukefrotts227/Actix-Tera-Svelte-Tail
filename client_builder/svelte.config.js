import adapter from '@sveltejs/adapter-static';
const config = {
  kit: {
    adapter: adapter({
      pages: '../static/svelte',  // Output directory for the prerendered pages
      assets: '../static/svelte', // Output directory for static assets
      fallback: null,  // No fallback (not using SPA mode)
      precompress: false, 
    }),
  },

  
};

export default config;
