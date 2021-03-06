var gulp = require('gulp'),// Núcleo do Gulp
	htmlclean = require('gulp-htmlclean'),
    nodemon = require('gulp-nodemon'),
    strip = require('gulp-strip-comments'),//removes comments from JSON, JavaScript, CSS, HTML, etc.
    spawn = require('child_process').spawn, node,
    prettify = require('gulp-jsbeautifier');



gulp.task('templates', function(){
	gulp.src(['*.html'])// O "gulp.src" define onde está seu arquivo base para a tarefa
    .pipe(replace("scr=*", ''))
    .pipe(gulp.dest('./dist/'));// "gulp.dest" dizendo onde deverá ser salvo o arquivo final já compilado.
});

//
gulp.task('htmlclean', function(){
	return gulp.src('*.html')
    .pipe(htmlclean({
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
    }))
    .pipe(gulp.dest('./dist/'));
});


//removes comments from JSON, JavaScript, CSS, HTML, etc.
gulp.task('removes', function () {
    return gulp.src('home.html')
    .pipe(strip())
    .pipe(gulp.dest('./dist/'));
});

// indent file
gulp.task('prettify', function() {
    //gulp.src(['./*.css', './*.html', './*.js'])
    gulp.src(['./*.html'])
        .pipe(prettify())
        .pipe(gulp.dest('./dist'));
});


/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
    if (node) node.kill()
    node = spawn('node', ['spider.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

/**
 * referencia: https://gist.github.com/webdesserts/5632955 
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {
    gulp.run('server')
    // Need to watch for sass changes too? Just add another watch call!
    // no more messing around with grunt-concurrent or the like. Gulp is
    // async by default.
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});

//executa todas as rotinas
gulp.task('run', ['server', 'removes', 'prettify']);