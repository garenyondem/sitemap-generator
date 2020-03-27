import { SERVER_PORT } from "./config";
import { Server } from "./app";

init(SERVER_PORT).catch(err => {
    console.error(err);
    process.exit();
});

export async function init(port: string) {
    new Server(port).start();
}