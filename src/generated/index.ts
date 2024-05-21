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

export class UplaodService {
  /**
   *
   */
  static awsUploadControllerUploadFile(
    params: {
      /**  */
      file: any;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/upload';

      const configs: IRequestConfig = getConfigs('post', 'multipart/form-data', url, options);

      axios(configs, resolve, reject);
    });
  }
}

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

export class UserService {
  /**
   *
   */
  static userControllerCreateUser(
    params: {
      /** requestBody */
      body?: CreateUserRequestDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/create';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

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

export class CoverService {
  /**
   *
   */
  static coverControllerSetCoverByTemplateId(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: CoverInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CoverEntityDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/cover/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static coverControllerGetCover(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CoverResponceDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/cover/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class PhotoService {
  /**
   *
   */
  static photoControllerGetPhotoById(
    params: {
      /**  */
      templateId: string;
      /**  */
      questionId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PhotoEnityDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/photo/{templateId}/{questionId}';
      url = url.replace('{templateId}', params['templateId'] + '');
      url = url.replace('{questionId}', params['questionId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static photoControllerGetPhotos(
    params: {
      /**  */
      templateId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PhotoEnityDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/photo/{templateId}';
      url = url.replace('{templateId}', params['templateId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static photoControllerEditPhoto(
    params: {
      /**  */
      photoId: string;
      /** requestBody */
      body?: PhotoEnityDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PhotoEnityDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/photo/edit/{photoId}';
      url = url.replace('{photoId}', params['photoId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static photoControllerEditAnswer(
    params: {
      /** requestBody */
      body?: AddPhotoEnityDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PhotoEnityDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/photo/add';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static photoControllerDeletePhoto(
    params: {
      /**  */
      photoId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/photo/delete/{photoId}';
      url = url.replace('{photoId}', params['photoId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class ReadyService {
  /**
   *
   */
  static generateAnswersReadyTemplate(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ready/template/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class AnswerSmartService {
  /**
   *
   */
  static answerSmartControllerGetMyAnswersByTemplate(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AnswerSmartEntityDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/answerSmart/my/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static answerSmartControllerEditAnswer(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: AnswerEditDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AnswerSmartEntityDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/answerSmart/edit/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class OrderService {
  /**
   *
   */
  static orderStatusControllerGetByTemplateId(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<OrdersStatusDTO> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/order/template/{id}';
      url = url.replace('{id}', params['id'] + '');

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

export interface CreateUserRequestDto {
  /**  */
  userName: string;

  /**  */
  password: string;

  /**  */
  templateId: string;
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

export interface CoverInputDto {
  /**  */
  fullName: string;

  /**  */
  fullNamePartner: string;

  /**  */
  bookName: string;

  /**  */
  coverUrl: string;
}

export interface CoverEntityDto {
  /**  */
  templateId: string;

  /**  */
  _id: string;

  /**  */
  userId: string;

  /**  */
  fullName: string;

  /**  */
  fullNamePartner: string;

  /**  */
  bookName: string;

  /**  */
  coverUrl: string;
}

export interface CoverResponceDto {
  /**  */
  value: CombinedValueTypes;
}

export interface PhotoEnityDto {
  /**  */
  _id: string;

  /**  */
  photoUrl: string;

  /**  */
  date: Date;

  /**  */
  description: string;

  /**  */
  templateId: string;

  /**  */
  userId: string;

  /**  */
  hideDate: boolean;

  /**  */
  hideDescription: boolean;

  /**  */
  questionTxt: string;
}

export interface AddPhotoEnityDto {
  /**  */
  photoUrl: string;

  /**  */
  date: Date;

  /**  */
  description: string;

  /**  */
  templateId: string;

  /**  */
  hideDate: boolean;

  /**  */
  hideDescription: boolean;

  /**  */
  questionTxt: string;
}

export interface AnswerSmartEntityDto {
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

  /**  */
  smartAnswer: string;
}

export interface OrdersStatusDTO {
  /**  */
  status: EnumOrdersStatusDTOStatus;
}
export type CombinedValueTypes = CoverEntityDto;
export enum EnumOrdersStatusDTOStatus {
  'writing' = 'writing',
  'waiting' = 'waiting',
  'proccessing' = 'proccessing',
  'done' = 'done'
}
