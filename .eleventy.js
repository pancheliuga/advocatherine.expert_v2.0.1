const fs = require('fs');

module.exports = function (eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('dist/404/index.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          res.writeHead(404);
          res.end();
        });
      },
    },
    files: ['dist/**/*'],
  });

  eleventyConfig.addWatchTarget('./src/assets/styles/');
  eleventyConfig.addWatchTarget('./src/assets/js/');

  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/js/libraries': 'assets/js/libraries' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/svg': 'assets/svg' });
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

  return {
    dir: {
      input: 'src/pages',
      output: 'dist'
    },
  };
};
