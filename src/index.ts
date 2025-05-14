import express, { Application } from "express";
import config from "config";
import path from "path";
import db from "./startup/db";
import errorHandler from "./startup/error";
import models from "./startup/models";
import routes from "./startup/router";

const app: Application = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

db();
models();
routes(app);
errorHandler();

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`connected on port ${port}`));