console.log(process.cwd());

console.warn(`
# @ircam/simple-components

> Since v2, this package has moved to lit@2, which might cause issues if your
> application is using lit-html@1.x.x and/or lit-element@1.x.x

> to update your app, see: https://lit.dev/docs/releases/upgrade/

> if you don't want to update your app now, please fall back to version 1.x.x
\`npm install --save @ircam/simple-components@1.3.0\`
`);
