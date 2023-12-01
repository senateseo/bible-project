import express, { Application} from 'express';
import Server from './index'
import fs from 'fs';
import http from 'http';
import https from 'https';

const app: Application = express();
const server: Server = new Server(app);
const PORT = process.env.PORT || 3000;

const options = {
    key: fs.readFileSync("./cert/private.key"),
    cert: fs.readFileSync("./cert/certificate.crt"),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(PORT, () => {
    console.log(`HTTP Server is running on PORT ${PORT}`)
}).on("error", (err: any) => {
    if(err.code === "EADDRINUSE"){
        console.log("Error: address already in use");
    }else {
        console.log(err)
    }
});
httpsServer.listen(8443, () => {
    console.log(`HTTPS Server is running on PORT 8443`)
}).on("error", (err: any) => {
    if(err.code === "EADDRINUSE"){
        console.log("Error: address already in use");
    }else {
        console.log(err)
    }
});;