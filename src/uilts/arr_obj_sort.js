export default function arrObjSort(arr, key) {
  return arr.sort((prev, next) => {//a与b是arr_obj数组中的元素对象 每一次传两个元素对象给回调函数进行处理
    return (prev[key].charCodeAt()) - parseInt(next[key].charCodeAt())//按照age的升序进行排序
  })
}


