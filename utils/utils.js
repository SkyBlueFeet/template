/**
 * 获取字符串的哈希值
 * @param {String} str 需要进行哈希编码的字符串
 * @param {Boolean} caseSensitive 如果为true则不将字符串化为小写，默认为false
 * @return {Number} hashCode 字符串对应的哈希编码
 */
export const getHashCode = (str, caseSensitive = false) => {
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