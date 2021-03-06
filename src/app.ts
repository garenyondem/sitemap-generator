import express, { Express } from "express";
import { routes } from "./routes";
import path from "path";
import http from 'http';
import { NODE_ENV } from "./utils/enums";
import morgan from 'morgan';
import compression from 'compression';
import favicon from 'serve-favicon';

export class Server {
    public app: Express;
    public httpServer: http.Server | undefined;
    #port: string;

    constructor(port: string) {
        const app = express();

        if (process.env.NODE_ENV !== NODE_ENV.PRODUCTION) {
            app.use(morgan('dev'));
        }
        app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')))
        app.use(compression());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        app.use('/', express.static(path.join(__dirname, 'public')));
        app.use('/css', express.static(path.join(__dirname, 'public', 'stylesheets')));
        app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
        app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

        app.use("/api", routes);

        this.app = app;
        this.#port = port;
    }

    public start = () => {
        this.httpServer = this.app.listen(this.#port);
        console.info(`http://localhost:${this.#port}`);
    };
}