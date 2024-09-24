'use strict';

var gulp = require('gulp'),
    // uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),


    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    spritesmith = require('gulp.spritesmith'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-media-queries');

var path = {
    // Пути, куда складывать готовые после сборки файлы
    build: {
        html: './',
        js: 'htdocs/js/',
        css: 'css/',
        img: '/img/',
        fonts: 'htdocs/fonts/',
        pic: '/pic/',
        root: 'htdocs/'
    },
    // Пути откуда брать исходники
    src: {
        html: 'template/*.html',
        js: 'js/*.js',
        style: 'css/**/*.*',
        img: 'img/*.*',             //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        spr_icon: 'img/icons/*.png',     //Выбираем все картинки в папке с спрайтами
        spr_arrow: 'img/icons-arrows/*.png',     //Выбираем все картинки в папке с спрайтами
        spr_social: 'img/icons-socials/*.png',     //Выбираем все картинки в папке с спрайтами
        fonts: 'fonts/**/*.*',
        pic: 'pic/**/*.*',
        sass: 'sass/**/*.scss*',
        jade: './jade/pagers/*.jade'
    },
    // Указываем, за изменением каких файлов мы хотим наблюдать
    watch: {
        html: '**/*.html',
        js: 'js/**/*.js',
        style: 'css/**/*.css',
        img: 'img/**/*.*',
        fonts: 'fonts/**/*.*',
        pic: 'pic/**/*.*',
        sass: 'sass/**/*.scss*',
        jade: './jade/pagers/*.jade'
    },
    clean: './htdocs'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) // Выберем файлы по нужному пути
        // .pipe(rigger()) // Прогоним через rigger
        .pipe(prettify({indent_char: ' ', indent_size: 2}))
        .pipe(gulp.dest(path.build.html)); // Выплюнем их в папку build

    gulp.src('src/favicon.ico')
        .pipe(gulp.dest(path.build.root));
});


//Jade Task
gulp.task('jade:build', function() {
  gulp.src(path.src.jade)
    .pipe(jade({
      locals:'index.html',
      pretty: true
    }))
    .on('error', function(err){
      gutil.log(gutil.colors.red(err))
    })
    .pipe(gulp.dest(path.build.html))
    // .pipe(refresh(server))
    // .pipe(notify({ message: 'Your Jade file has been molded into HTML.' }));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)           // Найдем наш main файл
        .pipe(rigger())             // Прогоним через rigger
        .pipe(uglify())             //Сожмем наш js
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build

    gulp.src('src/js/html5.js')
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(cssmin()) //Сожмем
        .pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)); //И бросим в build

    gulp.src(path.src.pic) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.pic)); //И бросим в build
});

gulp.task('img:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)); //И бросим в build
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('sass:build', function () {
    gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [path.src.sass],
      // style: 'compressed',
      // precision: 10,
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ["last 50 version", "> 1%", "ie 8", "ie 7"],
      cascade: true
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.build.css));
});

// SPRITE
gulp.task('sprite', function() {
    var spriteData =
        gulp.src('img/sprite/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite-icons.png',
                cssName: '_sprite-icons.scss',
                imgPath: '../img/sprite-icons.png',
                algorithm: 'top-down',
                cssOpts: {
                      functions: true
                    },
            }));
    // var spriteData =
    //   gulp.src('img/icons-socials/*.png') // путь, откуда берем картинки для спрайта
    //         .pipe(spritesmith({
    //             imgName: 'sprite-socials.png',
    //             cssName: '_sprite-socials.scss',
    //             imgPath: '../img/sprite-socials.png',
    //             algorithm: 'top-down'
    //         }));
    spriteData.img.pipe(gulp.dest('./img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sass/')); // путь, куда сохраняем стили
});

gulp.task('sprite-menu', function() {
    var spriteData =
        gulp.src('img/sprite-menu/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite-menu.png',
                cssName: '_sprite-menu.scss',
                imgPath: '../img/sprite-menu.png',
                algorithm: 'top-down',
                cssOpts: {
                      functions: true
                    },
            }));
    spriteData.img.pipe(gulp.dest('./img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sass/')); // путь, куда сохраняем стили
});





gulp.task('watch', function() {
  gulp.watch(path.src.sass, ['sass:build']);
  gulp.watch(path.src.jade, ['jade:build']);
  gulp.watch(path.src.spr_icon, ['sprite']);
  gulp.watch(path.src.spr_arrow, ['sprite-menu']);
  // gulp.watch(path.src.spr_social, ['sprite-social']);
  gulp.watch(path.src.img, ['image:build']);
  gulp.watch(path.src.pic, ['image:build']);

});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('go', [
    'sass:build',
    'html:build'
]);

// var config = {
//     server: {
//         baseDir: "./htdocs"
//     },
//     tunnel: true,
//     host: 'localhost',
//     port: 9000,
//     logPrefix: "Frontend_Devil"
// };

// var browserSync = require("browser-sync");
// gulp.task('webserver', function () {
//     browserSync(config);
// });