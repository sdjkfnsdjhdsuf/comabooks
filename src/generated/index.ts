/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /**
   * show loading status
   */
  loading?: boolean;
  /**
   * display error message
   */
  showError?: boolean;
  /**
   * data security, extended fields are encrypted using the specified algorithm
   */
  security?: Record<string, 'md5' | 'sha1' | 'aes' | 'des'>;
  /**
   * indicates whether Authorization credentials are required for the request
   * @default true
   */
  withAuthorization?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AnswerService {
  /**
   *
   */
  static answersControllerGetMyAnswersByTemplate(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AnswerEntityDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/answers/my/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static answersControllerEditAnswer(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: AnswerEditDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AnswerEntityDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/answers/edit/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class AuthService {
  /**
   *
   */
  static authContollerSignIn(
    params: {
      /** requestBody */
      body?: SingReauestDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SignResponceDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static authContollerGetId(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/getId';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class TemplateService {
  /**
   *
   */
  static templateControllerGetTemplate(options: IRequestOptions = {}): Promise<TempalteResponceDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/template/my';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export interface AnswerEntityDto {
  /**  */
  _id: string;

  /**  */
  questionId: string;

  /**  */
  answer: string;

  /**  */
  userId: string;

  /**  */
  templateId: string;
}

export interface AnswerEditDto {
  /**  */
  questionMessage: string;
}

export interface SingReauestDto {
  /**  */
  login: string;

  /**  */
  password: string;
}

export interface SignResponceDto {
  /**  */
  accessToken: string;

  /**  */
  refreshToken: string;
}

export interface QuestionTemplateDto {
  /**  */
  question: string;

  /**  */
  _id: string;
}

export interface TempalteResponceDto {
  /**  */
  _id: string;

  /**  */
  name: string;

  /**  */
  questions: QuestionTemplateDto[];
}
