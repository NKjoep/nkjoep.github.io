module.exports = () => {
  let REVISION = 'norev';
    // get the revision git rev-parse --short HEAD
    const spawn = require('child_process').spawnSync;
    const gitRevCmd = spawn('git', ['rev-parse', '--short', 'HEAD']);

    // if error, notify
    if (gitRevCmd.stderr && gitRevCmd.stderr.toString()) {
      console.error('build-index', gitRevCmd.stderr.toString(), 'using default rev `norev`');
    } else {
      REVISION = gitRevCmd.stdout.toString().trim();
    }
    return `${REVISION}-${new Date().toISOString()}`;
}
