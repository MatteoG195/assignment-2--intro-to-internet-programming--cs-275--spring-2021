const { src, dest, series, watch } = require(`gulp`);
const babel = require(`gulp-babel`);
const cssLinter = require(`gulp-stylelint`);
const cssCompressor = require(`gulp-clean-css`);
const htmlCompressor = require(`gulp-htmlmin`);
const htmlValidator = require(`gulp-html`);
const jsLinter = require(`gulp-eslint`);
const jsCompressor = require(`gulp-uglify`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
/*
#### Development
* Ensure your editor is configured to use the enclosed `.editorconfig` file.
* Your HTML must validate via the `gulp-html` module.
* Your CSS must validate via the `gulp-stylelint` module using the enclosed `.stylelintrc.json` file.
* Your JavaScript must validate via the `gulp-eslint` module using the included `.eslintrc.json` file.
* Your JavaScript must transpile using `gulp-babel`, and, possibly, `@babel/core` and `babel-present-env`.
* The development track must lint/validate HTML, CSS, and JavaScript each time you save an `.html`, `.css`, or `.js` file. It must also refresh the browser when any of these files have changed.
* `gulp dev` must trigger the development track.
*/

let validateHTML = () => {
    return src([
        `html/*.html`,
        `html/**/*.html`])
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src([`html/*.html`,`html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};


let lintCSS = () => {
    return src(`css/*.css`)
    .pipe(cssLinter())
    .pipe(dest(`temp/css`));
};
/*
TODO: Transpile CSS for production, complete prod scaffold
*/
let transpileCSSForProd = () => {
    return src(`css/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/css`));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter({
            parserOptions: {
                ecmaVersion: 2017,
                sourceType: `module`
            },
            rules: {
                indent: [2, 4, {SwitchCase: 1}],
                quotes: [2, `backtick`],
                semi: [2, `always`],
                'linebreak-style': [2, `unix`],
                'max-len': [1, 85, 4]
            },
            env: {
                es6: true,
                node: true,
                browser: true
            },
            extends: `eslint:recommended`
        }))
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};


let dev = () => {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 50,
        server: {
            baseDir: [
                'html',
                './'
            ]
        }
    });

    watch(`js/*.js`,
        series(lintJS, transpileJSForDev)
    ).on(`change`, reload);

    watch(`css/**/*.css`,
        series(lintCSS)
    ).on(`change`, reload);

    watch(`html/**/*.html`,
        series(validateHTML)
    ).on(`change`, reload);
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.transpileCSSForProd = transpileCSSForProd;
exports.dev = series(
    validateHTML,
    lintJS,
    transpileJSForDev,
    dev
);
exports.build = series(
    compressHTML,
    transpileJSForProd,
    transpileCSSForProd
);
