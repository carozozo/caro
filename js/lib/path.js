
/*
 * Path
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /*
   * get dir-path
   * @param {string} path
   * @return {string}
   */
  self.getDirPath = function(path) {
    var filename;
    filename = caro.getFileName(path);
    return path = caro.replaceLast(path, filename, '');
  };

  /*
   * get file name in path
   * @param {string} path
   * @param {boolean} [getFull] if return file-name by full (with extend-name)
   * @return {string}
   */
  self.getFileName = function(path, getFull) {
    var extendName, lastIndex, lastIndex2;
    getFull = getFull !== false;
    lastIndex = path.lastIndexOf('\\');
    lastIndex2 = path.lastIndexOf('/');
    path = path.slice(lastIndex + 1);
    path = path.slice(lastIndex2 + 1);
    if (getFull) {
      return path;
    }
    extendName = caro.getExtendName(path);
    return path.replace(extendName, '');
  };

  /*
   * get extend name of file
   * @param {string} path
   * @param {boolean} [withDot] if return extend-name with '.'
   * @return {string}
   */
  self.getExtendName = function(path, withDot) {
    var aFileName, extendName, fileName;
    withDot = withDot !== false;
    fileName = caro.getFileName(path);
    aFileName = caro.splitStr(fileName, '.');
    if (aFileName.length === 1) {
      return '';
    }
    extendName = aFileName[aFileName.length - 1];
    if (withDot) {
      extendName = '.' + extendName;
    }
    return extendName;
  };
})();
