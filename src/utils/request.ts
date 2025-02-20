import { isObject } from '@cc-heart/utils'
import { Request } from '@cc-heart/utils-client'

export const request = new Request(location.origin)
export interface IResponse<T> {
  code: number
  message: string
  data: T
}

request.useResponseInterceptor((response: IResponse<any>, opts) => {
  if (IS_DEV) {
    console.log('[response]: ', response)
  }

  if (opts.data.headers?.['Content-type'] === 'application/json') {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
      if (isObject(response)) {
        if (response.code === 200) {
          return response
        }
        return Promise.reject(response)
      }
    } catch (e) {
      return Promise.reject(response)
    }
  }
  return response
})

request.useRequestInterceptor((config) => {
  if (IS_DEV) {
    console.log('[request]: ', config)
  }

  return config
})

request.useErrorInterceptor((error) => {
  if (IS_DEV) {
    console.log('[request error]: ', error)
  }
})
