import axios from 'axios'
import type { ResponseType } from 'axios'

export interface Request {
  url: string
  method?: string
  responseType?: ResponseType
  headers?: any
  params?: any
  data?: any
  paramsSerializer?: (params: object | string) => string
}

export interface BaseResponse<T> {
  data: T
  body?: any
}

function makeRequest<T>({
  url = '/',
  method = 'get',
  headers,
  params,
  data,
  responseType = 'json',
  paramsSerializer,
}: Request): Promise<BaseResponse<T>> {
  return axios({
    url,
    method,
    responseType,
    headers: { ...headers },
    params,
    data,
    paramsSerializer,
  })
}
export default makeRequest