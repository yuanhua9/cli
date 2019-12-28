const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const pkg = require('../package.json')

module.exports = (done, opt) => {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    return console.log(
      chalk.red(`  You must upgrade node to >=' + pkg.engines.node + '.x to use ${pkg.name}`)
    )
  }

  /**
   * 检查版本号
   */
  request(
    {
      url: `https://registry.npmjs.org/${pkg.name}`,
      timeout: 1000
    },
    (err, res, body) => {
      if (!err && body) {
        const obj = JSON.parse(body || null) || {};
        const latestV = obj['dist-tags'].latest || {}
        const localV = pkg.version
        if (semver.lt(localV, latestV)) {
          console.log(chalk.yellow(`  A newer version of ${pkg.name} is available.`))
          console.log()
          console.log('  latest:    ' + chalk.green(latestV))
          console.log('  installed: ' + chalk.red(localV))
          console.log(`  update:  npm i ${pkg.name} `)
          console.log()
        } else {
          if (opt.show) {
            console.log(chalk.yellow(`current version is latest`))
            console.log()
            console.log('  latest:    ' + chalk.green(latestV))
            console.log('  installed: ' + chalk.green(localV))
            console.log()
          }
        }
      }
      done()
    }
  )
}
