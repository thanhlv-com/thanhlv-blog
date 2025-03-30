import {execSync} from 'child_process';
const dataInject = process.argv.slice(2); // Input data from command-line arguments

execSync(`node script/about/author/index.js ${dataInject}`,{stdio: 'inherit'});
