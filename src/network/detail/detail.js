import { request } from '../requests'

export function getDetailData(config) {
  return request(config)
}

export class FormatDetailData {
  constructor(storeIndexData) {
    this.rst = storeIndexData.rst.body
    this.menu = storeIndexData.menu.body;
    this.recommend = storeIndexData.recommend.body;
    this.redpack = storeIndexData.redpack.body;
  }
}