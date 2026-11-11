/** Tailwind build for the site. After changing classes in the HTML run:
 *  npx tailwindcss@3.4.17 -c tailwind.config.js -o styles.css --minify
 */
module.exports = {
  content: ['./index.html', './projekty/**/*.html']
};
