/*
 * Path
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  /*
   * get dir-path
   * @param {string} path
   * @return {string}
   */
  self.getDirPath = function (path) {
    var filename = caro.getFileName(path);
    return caro.replaceLast(path, filename, '');
  };
  /*
   * get file name in path
   * @param {string} path
   * @param {boolean} [getFull] if return file-name by full (with extend-name)
   * @return {string}
   */
  self.getFileName = function (path, getFull) {
    getFull = getFull !== false;

    var lastIndex = path.lastIndexOf('\\');
    var lastIndex2 = path.lastIndexOf('/');

    path = path.slice(lastIndex + 1);
    path = path.slice(lastIndex2 + 1);
    if (getFull) {
      return path;
    }

    var extendName = caro.getExtendName(path);
    return path.replace(extendName, '');
  };
  /*
   * get extend name of file
   * @param {string} path
   * @param {boolean} [withDot] if return extend-name with '.'
   * @return {string}
   */
  self.getExtendName = function (path, withDot) {
    withDot = withDot !== false;

    var fileName = caro.getFileName(path);
    var aFileName = caro.splitStr(fileName, '.');
    if (aFileName.length === 1) {
      return '';
    }

    var extendName = aFileName[aFileName.length - 1];
    if (withDot) {
      extendName = '.' + extendName;
    }
    return extendName;
  };
})();
