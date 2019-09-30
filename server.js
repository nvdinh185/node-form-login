const express = require('express');
const app = express();

function main(isHttp) {
  const cors = require('./handlers/cors-handler');
  app.use(cors.CorsHandler.cors);

  const resource = require('./routes/resource-sqlite');
  app.use('/db', resource);

  if (isHttp) {
    const httpServer = require('http').createServer(app);
    const portHttp = process.env.PORT || isHttp;
    httpServer.listen(portHttp, () => {
      console.log("Server HTTP is started with PORT: " + portHttp);
    });
  }
}

const isHttp = 8080;

main(isHttp);