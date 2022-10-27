const {src, dest, watch, parallel} = require("gulp");

// dependencias de css
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');


//dependencias de imgenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// dependencia de javascript
const terser = require('gulp-terser-js');


function css(cb){

    src('src/scss/**/*.scss')// identificar el archivo de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())// compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))// almacenarlo en el disco duro

    cb();//callback que avisa a gulp que llegamos al final
}

function imagenes(cb){
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    cb();
}

function versionWebp(cb){
    //calidad de img
    const opciones = {
        quality: 50
    };

    // cuando busco de forma recursiva en una ruta 
    // y es solo una terminacion no pongo nada
    // peto cuando son 2 o mas las cierro con llaves
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    cb();
}

function versionAvif(cb){
    //calidad de img
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    cb();
}

function javascript(cb){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))

    cb();
}

function dev(cb){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    cb();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (imagenes, versionWebp, versionAvif, javascript, dev);