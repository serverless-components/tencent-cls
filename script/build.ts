import { execSync } from 'child_process';

const commands = [
    'npx tsc -p .',
    'cp ./src/package.json ./lib/package.json',
    'cd lib && npm i',
]

for (const c of commands) {
    execSync(c, { stdio: 'inherit' });
}