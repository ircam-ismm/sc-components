const path = require('path');
const connect = require('connect');
const serveStatic = require('serve-static');
const portfinder = require('portfinder');
const livereload = require('livereload');

const publicDir = process.cwd();

const lrserver = livereload.createServer();
lrserver.watch(publicDir);

// static file server
portfinder.basePort = 3000;
portfinder.getPortPromise()
  .then(port => {
    connect()
      .use(serveStatic(publicDir))
      .listen(port, () => console.log(`
-----------------------------------------------
> server running on http://127.0.0.1:${port}
-----------------------------------------------
`   ));
  })
  .catch((err) => {
    console.error('no available port');
  });
