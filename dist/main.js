/*eslint-disable*/
var fs = require('promisify-fs');

/**
 * plugin context
 */
var context, cx;

/**
 * wbp plugin context (cx)
 * @param {string}  __plugindir  plugin's absolute path
 * @param {string}  __cwd        working directory
 * @param {string}  __name       current plugin's name
 * @param {string}  info         utils log info
 * @param {string}  warn         utils log warn
 * @param {string}  error        utils log error
 * @param {function}  call       wbp plugin-call interface
 */
module.exports = function main(params, options) {
  context = cx = this;

  //invoke the dev-tool specified by user.
  if (params && params.length) {
    var devtool = params[0];
    return context.call('dev-' + devtool);
  }

  //invoke the dev-tool based on the project type created by initialization process.
  return fs
    .getModulePackInfo(module)
    .get('wbp')
    .get('project')
    .then(function (project) {
      if (project) return cx.call('dev-' + project);
      throw "don't know what type of this project is.";
    });
}

