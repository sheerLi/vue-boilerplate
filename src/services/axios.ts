import axios from 'axios'
import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  CreateAxiosDefaults,
} from 'axios'
import { message } from 'ant-design-vue'
import { camelize } from '@/utils/humps'

interface CustomInternalRequestConfig<D = any>
  extends InternalAxiosRequestConfig<D> {
  offErrorMessage?: boolean
  camelize?: boolean
}

export interface CustomRequestConfig<D = any> extends AxiosRequestConfig<D> {
  offErrorMessage?: boolean
  camelize?: boolean
}

export interface CustomResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: CustomInternalRequestConfig<D>
  ok: boolean
  message?: string
}

const isDev = process.env.NODE_ENV === 'development'

const useInterceptors = (
  type: 'request' | 'response',
  instance: AxiosInstance,
  interceptors: {
    onFulfilled: (value: any) => any | Promise<any>
    onRejected: (error?: any) => any | undefined
  },
) =>
  instance.interceptors[type].use(
    interceptors.onFulfilled,
    interceptors.onRejected,
  )

const requestInterceptors = {
  onFulfilled: (config: CustomInternalRequestConfig) => {
    return config
  },
  onRejected: (error: any) => console.error(error),
}

const responseInterceptors = {
  onFulfilled: (response: CustomResponse) => {
    const config = response.config as CustomInternalRequestConfig

    return {
      ...response,
      data: config.camelize ? camelize(response.data) : response.data,
      ok: true,
    }
  },
  onRejected: async (error: any) => {
    const response = (error.response || {}) as CustomResponse
    const config = (error.config || {}) as CustomRequestConfig

    const dataMessage = response.data?.message || ''
    const offErrorMessage = config.offErrorMessage

    if (!offErrorMessage) {
      message.error({
        content: dataMessage || '请求失败，请稍后再试',
        style: {
          marginTop: '100px',
        },
      })
    }

    return {
      ...response,
      data: camelize(response.data || {}),
      ok: false,
      message: dataMessage,
    }
  },
}

const methods = (instance: AxiosInstance) => ({
  get: <T = any, R = CustomResponse<T>, D = any>(
    url: string,
    config?: CustomRequestConfig<D>,
  ): Promise<R> => instance.get(url, config),

  post: <T = any, R = CustomResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CustomRequestConfig<D>,
  ): Promise<R> => instance.post(url, data, config),

  put: <T = any, R = CustomResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CustomRequestConfig<D>,
  ): Promise<R> => instance.put(url, data, config),

  patch: <T = any, R = CustomResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: CustomRequestConfig<D>,
  ): Promise<R> => instance.patch(url, data, config),

  delete: <T = any, R = CustomResponse<T>, D = any>(
    url: string,
    config?: CustomRequestConfig<D>,
  ): Promise<R> => instance.delete(url, config),
})

// axios instance with camelize
const instanceWithCamelize = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL as string,
  timeout: 30000,
  withCredentials: true,
  camelize: true,
} as CreateAxiosDefaults)
useInterceptors('request', instanceWithCamelize, requestInterceptors)
useInterceptors('response', instanceWithCamelize, responseInterceptors)

// axios instance without camelize
const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL as string,
  timeout: 30000,
  withCredentials: true,
})
useInterceptors('request', instance, requestInterceptors)
useInterceptors('response', instance, responseInterceptors)

// axios request methods with camelize
export const $axios = methods(instanceWithCamelize)

// axios request methods without camelize
export default methods(instance)
