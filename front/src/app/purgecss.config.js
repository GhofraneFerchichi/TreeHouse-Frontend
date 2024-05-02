const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgecssPlugin = require('webpack-purgecss');
module.exports = {
    content: [
      "./src/**/*.{html,js}", // Adjust paths based on your project structure
      "./public/index.html",    // Include your main HTML file
    ],
    plugins: [
        new CleanWebpackPlugin(),
        new PurgecssPlugin({
          paths: ['src/**/*.{html,js}'], // Adjust paths based on your configuration
          whitelist: ['whitelist-class'], // Optional: Add whitelisted classes
        }),
      ],
    };

const gulp = require('gulp');
const purgecss = require('gulp-purgecss');

gulp.task('purgecss', () => {
  return gulp.src('./public/**/*.css') // Adjust paths based on your configuration
    .pipe(purgecss({
      content: ['src/**/*.{html,js}'], // Adjust paths based on your configuration
    }))
    .pipe(gulp.dest('./public'));
});