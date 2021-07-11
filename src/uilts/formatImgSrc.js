// 格式化图片地址
function formatImgSrc(hash, size, auto) {

  /* 
     7e76a23eb90dada42528bc41499d6f8jpeg 
   /7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg
	
  */

  if (!hash) return '';
  hash = hash.replace(/^(.{1})(.{2})(.+(jpeg|png))$/g, '$1/$2/$3.$4');
  size = size || 90;
  size = auto ? size : size + 'x' + size;
  return auto ? `//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/${size}x/` : `//fuss10.elemecdn.com/${hash}?imageMogr/format/webp/thumbnail/!${size}r/gravity/Center/crop/${size}/`;
}

export default formatImgSrc;