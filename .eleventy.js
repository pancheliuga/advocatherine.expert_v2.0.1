const fs = require('fs');
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const isProduction = process.env.NODE_ENV === 'production';

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

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  eleventyConfig.addWatchTarget('./src/assets/styles/');
  eleventyConfig.addWatchTarget('./src/assets/js/');

  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/js/libraries': 'assets/js/libraries' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/svg': 'assets/svg' });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src/pages',
      output: 'dist'
    },
  };
};
