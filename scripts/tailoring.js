const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process')

function getArgs () {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach( arg => {
            if (arg.slice(0,2) === '--') {
                // long arg
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2,longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            else if (arg[0] === '-') {
                // flags
                const flags = arg.slice(1,arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

const args = getArgs();

const GuiRoot = args['gui'] ?
    path.resolve(process.cwd(), args['gui'])
    : path.resolve(__dirname, '../../scratch-gui');

// Change images
try {
    fs.copyFileSync(path.resolve(__dirname, '../editor/static/scratch-logo.svg'), path.resolve(GuiRoot, 'src/components/menu-bar/scratch-logo.svg'));
    console.log(`Overwrote scratch-logo.svg`);
    fs.copyFileSync(path.resolve(__dirname, '../editor/static/favicon.ico'), path.resolve(GuiRoot, 'static/favicon.ico'));
    console.log(`Overwrote editor favicon.ico`);
    fs.copyFileSync(path.resolve(__dirname, '../editor/static/pwa-icon.png'), path.resolve(GuiRoot, 'static/pwa-icon.png'));
    console.log(`Overwrote pwa-icon.png `);
    fs.copyFileSync(path.resolve(__dirname, '../editor/static/pwa-maskable_icon.png'), path.resolve(GuiRoot, 'static/pwa-maskable_icon.png'));
    console.log(`Overwrote pwa-maskable_icon.png `);
} catch (err) {
    console.error(err);
}

// Applay patch to scratch-gui
try {
    execSync(`cd ${GuiRoot} && patch -p1 -N -s --no-backup-if-mismatch < ${path.resolve(__dirname, 'tailoring/tailoring-gui.patch')}`);
    console.log(`Applied tailoring-gui.patch')}`);
} catch (err) {
    console.error(err);
}
