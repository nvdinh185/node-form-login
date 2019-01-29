const express = require('express');
const app = express();
const os = require('os');

function main(isHttp) {

  const cors = require('./handlers/cors-handler');
  app.use(cors.CorsHandler.cors);

  app.use(express.static(__dirname + '/www'));
    
  const resource1 = require('./routes/resource-excel');
  app.use('/excel', resource1);

  const resource = require('./routes/resource-sqlite');
  app.use('/db', resource);

  if (isHttp) {
    const httpServer = require('http').createServer(app);
    const portHttp = process.env.PORT || isHttp;
    httpServer.listen(portHttp, () => {
      console.log("Server HTTP (" + os.platform() + "; " + os.arch() + ") is started with PORT: "
        + portHttp
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      );
    });   
  }
}

const isHttp = 8080;

main(isHttp);