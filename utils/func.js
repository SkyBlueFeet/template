const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * 生成随机字符串
 * @param  {Number} len  生成随机字符串长度，默认为32
 * @return {String} randomStr  返回len位随机字符串
 */
exports.randomString = (len = 32) => {
  let $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return randomStr;
};

/**
 * 获取字符串的哈希值
 * @param {String} str 需要进行哈希编码的字符串
 * @param {Boolean} caseSensitive 如果为true则不将字符串化为小写，默认为false
 * @return {Number} hashCode 字符串对应的哈希编码
 */
exports.getHashCode = (str, caseSensitive = false) => {
  if (!caseSensitive) str = str.toLowerCase();
  // 1315423911=b'1001110011001111100011010100111'
  let hash = 1315423911,
    i,
    ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= (hash << 5) + ch + (hash >> 2);
  }

  return hash & 0x7fffffff;
};

// 格式化HTML字符串
exports.convertHtml = str => {
  return str.replace(/(&#x)(\w{4});/gi, $0 =>
    String.fromCharCode(
      parseInt(
        encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'),
        16
      )
    )
  );
};

exports.stripTags = (str, tags) => {
  const $ = cheerio.load(str, { decodeEntities: false });

  if (!tags || tags.length === 0) {
    return str;
  }

  tags = !Array.isArray(tags) ? [tags] : tags;
  let len = tags.length;

  while (len--) {
    $(tags[len]).remove();
  }

  return $.html();
};

/**
 * 检测文件或文件夹是否存在
 * @param  {String} dir 要写入文件的文件夹
 * @param  {String} filename 写入文件的文件名
 * @param  {String} data 写入文件的数据
 */
exports.WriteFile = (dir, filename, data) => {
  let FilePath = path.resolve(dir, filename);
  try {
    fs.mkdirSync(dir, {
      recursive: true //是否递归,默认false
    });
    fs.writeFileSync(FilePath, data, { flag: 'w+' });
    return FilePath;
  } catch (error) {
    console.error(error);
    return null;
  }
};
