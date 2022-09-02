const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const glslify = require('./gulp/gulp-glslify');
const roadroller = require('./gulp/gulp-roadroller');
const gulpif = require('gulp-if');
const gulpCopy = require('gulp-copy');
const webp = require('gulp-webp');
const preprocess = require("gulp-preprocess");
//const inlinesource = require('gulp-inline-source');
const htmlmin = require('gulp-htmlmin');
const fileInline = require('gulp-file-inline');
const closure = require('gulp-closure-compiler');

function isJavaScript(file) {
    // Check if file extension is '.js'
    return file.extname === '.js';
}

function isShader(file) {
    return file.extname === '.glsl';
}

function javascript(cb) {
    {
        return gulp.src(['./src/lib/*.js', './src/classes/**/*.js', './src/index.js'])
            .pipe(sourcemaps.init())
            // .pipe(gulpif(isJavaScript, terser({
            //     compress: false,
            //     keep_fnames: true,
            //     mangle: false
            // })))
            .pipe(concat('main.js'))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/'));
    }
}

function copyStatic(cb) {
    return gulp.src('./src/static/*.html')
        .pipe(gulpCopy('./dist', { prefix: 3 }));
}

function doWebp(cb) {
    return gulp.src('./src/static/*.png')
        .pipe(webp({ lossless: true, method: 6 }))
        .pipe(gulp.dest('./dist'));
}

gulp.task('watch', function () {
    return gulp.watch(['./src/**/*.js']),
        { ignoreInitial: false },
        gulp.series(copyStatic, doWebp, javascript);
});

function production() {
    return gulp.src(['./src/lib/*.js', './src/classes/**/*.js', './src/index.js'])
        .pipe(preprocess())
        .pipe(gulpif(isJavaScript, terser({
            ecma: 2020,
            compress: {
                unsafe: true,
                unsafe_Function: true,
                unsafe_arrows: true,
                unsafe_comps: true,
                unsafe_math: true,
                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                unsafe_symbols: true,
                unsafe_undefined: true,
                drop_console: true,
                passes: 10,
                dead_code: true,
            }
        })))
        .pipe(gulpif(isShader, glslify()))
        .pipe(concat('main.js'))
        .pipe(roadroller({
            contextBits: 24,
            maxMemoryMB: 500,
            allowFreeVars: true
        }))
        .pipe(gulp.dest('./dist/'));
};

function productionc() {
    return gulp.src(['./src/lib/*.js', './src/classes/**/*.js', './src/index.js'])
        .pipe(preprocess())
        .pipe(gulpif(isJavaScript, closure({
            language: 'ECMASCRIPT6',

        })))
        .pipe(gulpif(isShader, glslify()))
        .pipe(concat('main.js'))
        .pipe(roadroller({
            contextBits: 24,
            maxMemoryMB: 500,
            allowFreeVars: true
        }))
        .pipe(gulp.dest('./dist/'));
};

function production2() {
    return gulp.src(['./src/lib/*.js', './src/classes/**/*.js', './src/index.js'])
        .pipe(preprocess())
        .pipe(gulpif(isJavaScript, terser({
            ecma: 2020,
            compress: {
                unsafe: true,
                unsafe_Function: true,
                unsafe_arrows: true,
                unsafe_comps: true,
                unsafe_math: true,
                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                unsafe_symbols: true,
                unsafe_undefined: true,
                drop_console: true,
                passes: 10,
                dead_code: true,
                pure_getters: true
            },
            
        }
        )))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/'));
};

function inlinesource() {
    return gulp.src('./dist/index.html')
        .pipe(fileInline())
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            html5: true,
            removeOptionalTags: true,
            useShortDoctype: true
        }))
        .pipe(gulp.dest('./dist/'));
};


exports.prod = gulp.series(copyStatic, doWebp, production, inlinesource);
exports.prodc = gulp.series(copyStatic, doWebp, productionc, inlinesource);
exports.prod2 = gulp.series(copyStatic, doWebp, production2);
exports.copy = copyStatic;
exports.dev = gulp.series(copyStatic, doWebp, javascript);

