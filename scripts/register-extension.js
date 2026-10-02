#!/usr/bin/env node
'use strict';

/**
 * Register Microbit More (mbit-more-v2) as a pre-installed extension of
 * the Xcratch editor (xcratch/scratch-editor monorepo).
 *
 *   node scripts/register-extension.js \
 *     --editor=../scratch-editor --ext=../mbit-more-v2 \
 *     --url=https://microbit-more.github.io/dist/microbitMore.mjs [--core]
 *
 * Steps:
 *  1. Set the extensionURL in the extension sources (block and entry).
 *  2. Link scratch-vm sources into the extension (npm run setup-dev) and build it
 *     (npm run build -> dist/<extensionId>.mjs).
 *  3. Copy the built module into scratch-gui/src/lib/libraries/extensions/preInstall
 *     and import it from preInstall/index.js (extensionManager.addBultinExtension).
 *  4. With --core, load the extension when the editor starts.
 */

const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');

const args = {};
process.argv.slice(2).forEach(arg => {
    const m = arg.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) args[m[1]] = m[2] === undefined ? true : m[2];
});

const editorRoot = path.resolve(process.cwd(), args.editor || '../scratch-editor');
const extRoot = path.resolve(process.cwd(), args.ext || '../mbit-more-v2');
const url = args.url;
if (!url) {
    console.error('--url is required');
    process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(extRoot, 'package.json'), 'utf-8'));
const extId = pkg.extensionId;
const guiRoot = path.join(editorRoot, 'packages/scratch-gui');
const vmRoot = path.join(editorRoot, 'packages/scratch-vm');

const replaceInFile = (file, regexp, replacement) => {
    const src = fs.readFileSync(file, 'utf-8');
    if (!regexp.test(src)) {
        throw new Error(`Pattern ${regexp} not found in ${file}`);
    }
    fs.writeFileSync(file, src.replace(regexp, replacement));
};

// 1. extensionURL
replaceInFile(
    path.join(extRoot, 'src/vm/extensions/block/index.js'),
    /let\s+extensionURL\s*=\s*'[^']*';/,
    `let extensionURL = '${url}';`);
replaceInFile(
    path.join(extRoot, 'src/gui/lib/libraries/extensions/entry/index.jsx'),
    /extensionURL:\s*'[^']*',/,
    `extensionURL: '${url}',`);
console.log(`extensionURL = ${url}`);

// 2. link vm sources and build
execSync(`node ./scripts/setup-dev.mjs ${vmRoot}`, {cwd: extRoot, stdio: 'inherit'});
execSync('npm run build', {cwd: extRoot, stdio: 'inherit'});
const builtModule = path.join(extRoot, 'dist', `${extId}.mjs`);

// 3. pre-install into scratch-gui
const preInstallDir = path.join(guiRoot, 'src/lib/libraries/extensions/preInstall');
fs.copyFileSync(builtModule, path.join(preInstallDir, `${extId}.mjs`));
const indexFile = path.join(preInstallDir, 'index.js');
const importLine = `import('./${extId}.mjs'),`;
const indexCode = fs.readFileSync(indexFile, 'utf-8');
if (indexCode.includes(importLine)) {
    console.log('Already registered in preInstall');
} else {
    replaceInFile(indexFile, /const importModules = \[/, `const importModules = [\n    ${importLine}`);
}

// 4. load the extension on startup (same as `xcratch-register --core`)
if (args.core) {
    const loadLine = `if (entry.extensionId === '${extId}') extensionManager.loadExtensionIdSync('${extId}');`;
    if (fs.readFileSync(indexFile, 'utf-8').includes(loadLine)) {
        console.log('Already loaded on startup');
    } else {
        replaceInFile(
            indexFile,
            /(\n(\s*)extensionManager\.addBultinExtension\(entry, blockClass\);)/,
            `$1\n$2${loadLine}`);
        console.log(`${extId} will be loaded on startup`);
    }
}
console.log(`Registered ${extId} as a pre-installed extension in ${guiRoot}`);
