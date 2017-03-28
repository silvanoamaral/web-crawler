var gulp = require('gulp'),
	htmlclean = require('gulp-htmlclean');


gulp.task('teste', function(){
	console.log("teste de task do GulpJS");
});

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