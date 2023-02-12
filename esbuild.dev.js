import * as esbuild from 'esbuild';
import config from "./esbuild.config.js";
import { platform } from 'os';
import { exec } from 'child_process';
const WINDOWS_PLATFORM = 'win32';
const MAC_PLATFORM = 'darwin';
const osPlatform = platform();

let ctx = await esbuild.context(config);

await ctx.watch();

let { host, port } = await ctx.serve({
    servedir: 'dist'
});

const url = `http:${host}:${port}`;
let command;

if (osPlatform === WINDOWS_PLATFORM) {
    command = `start microsoft-edge:${url}`;
} else if (osPlatform === MAC_PLATFORM) {
    command = `open -a "Google Chrome" ${url}`;
} else {
    command = `google-chrome --no-sandbox ${url}`;
}

exec(command);

console.log(`serve:${url}`);
