const utils = {
  isImage: function(type) {
    return "png" === type || "jpg" === type || "jpeg" === type || "bmp" === type || "gif" === type;
  },
  isVideo: function(type) {
    return "mp4" === type;
  },
  getParam: function(url, variable) {
    var query = url.split("?");
    query = query.pop();
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (false);
  }
}

module.exports = utils;