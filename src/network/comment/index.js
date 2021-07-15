import { request } from '../requests'
export function getComment(config) {
  return request(config)
}

export class formatCommentData {
  constructor(data) {
    this.comments = data.comments
    this.rating = data.rating
    this.tags = data.tags
  }
}