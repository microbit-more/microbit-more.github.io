const path = require('path');
const fs = require('fs');

function getArgs () {
    const args = {};
    process.argv.slice(2).forEach(arg => {
        const m = arg.match(/^--?([^=]+)(?:=(.*))?$/);
        if (m) args[m[1]] = m[2] === undefined ? true : m[2];
    });
    return args;
}

const args = getArgs();

// Root of the xcratch/scratch-editor monorepo (use -editor=... or the legacy -gui=<path to scratch-gui>)
const GuiRoot = args.gui ?
    path.resolve(process.cwd(), args.gui) :
    path.resolve(process.cwd(), args.editor || '../scratch-editor', 'packages/scratch-gui');

const SiteUrl = 'https://microbit-more.github.io/';

// Change images
const copies = [
    ['../editor/static/scratch-logo.svg', 'src/components/menu-bar/scratch-logo.svg'],
    ['../editor/static/favicon.ico', 'static/favicon.ico'],
    ['../editor/static/pwa-icon.png', 'static/pwa-icon.png'],
    ['../editor/static/pwa-maskable_icon.png', 'static/pwa-maskable_icon.png']
];
copies.forEach(([from, to]) => {
    fs.copyFileSync(path.resolve(__dirname, from), path.resolve(GuiRoot, to));
    console.log(`Overwrote ${to}`);
});

// Replace text. Fails if the pattern is not found, to notice upstream changes.
const patch = (file, replacements) => {
    const target = path.resolve(GuiRoot, file);
    let code = fs.readFileSync(target, 'utf-8');
    replacements.forEach(([from, to]) => {
        if (!code.includes(from)) {
            throw new Error(`"${from}" not found in ${file}`);
        }
        code = code.split(from).join(to);
    });
    fs.writeFileSync(target, code);
    console.log(`Patched ${file}`);
};

patch('src/components/stage-header/stage-header.jsx', [
    ['href="https://xcratch.github.io"', `href="${SiteUrl}"`]
]);
patch('src/playground/render-gui.jsx', [
    ["window.location = 'https://xcratch.github.io';", `window.location = '${SiteUrl}';`]
]);
patch('webpack.config.js', [
    ["short_name: 'Xcratch',", "short_name: 'Microbit More',"],
    ["\n            name: 'Xcratch',", "\n            name: 'Microbit More',"],
    ["description: 'Extendable Scratch3 mod'", "description: 'Scratch3 mod for micro:bit'"],
    ["'apple-mobile-web-app-title': 'Xcratch'", "'apple-mobile-web-app-title': 'Microbit More'"],
    ["title: 'Scratch 3.0 GUI'\n", "title: 'Microbit More'\n"]
]);
