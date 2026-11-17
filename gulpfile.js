const { src, dest, watch, series, parallel } = require('gulp');
const fileinclude = require('gulp-file-include');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const del = require('del');

// File paths
const paths = {
  html: {
    src: ['src/*.html', '!src/_*.html'],
    watch: 'src/**/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/css/**/*.css',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  },
  audio: {
    src: 'src/audio/**/*',
    dest: 'dist/audio/'
  }
};

// Clean dist directory
function clean() {
  return del(['dist']);
}

// Compile HTML with Partials
function html() {
  return src(paths.html.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Process Styles
function styles() {
  return src(paths.styles.src, { sourcemaps: true, allowEmpty: true })
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

// Process Scripts
function scripts() {
  return src(paths.scripts.src, { sourcemaps: true, allowEmpty: true })
    .pipe(terser())
    .pipe(dest(paths.scripts.dest, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

// Copy Images
function images() {
  return src(paths.images.src, { encoding: false, allowEmpty: true })
    .pipe(dest(paths.images.dest));
}

// Copy Audio
function audio() {
  return src(paths.audio.src, { encoding: false, allowEmpty: true })
    .pipe(dest(paths.audio.dest));
}

// BrowserSync Local Server & Watcher
function serve(done) {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000,
    open: false,
    notify: false
  });

  watch(paths.html.watch, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images).on('change', browserSync.reload);
  watch(paths.audio.src, audio).on('change', browserSync.reload);
  done();
}

// Complex tasks
const build = series(clean, parallel(html, styles, scripts, images, audio));
const dev = series(build, serve);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.audio = audio;
exports.build = build;
exports.default = dev;
