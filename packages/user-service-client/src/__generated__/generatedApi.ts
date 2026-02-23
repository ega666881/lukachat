/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UploadAvatarResponse {
  uploadedUrl: string;
}

export interface UserDto {
  email: string;
  id: string;
  avatarUrl: string;
}

export interface GetUserResponse {
  user: UserDto;
}

export interface RequestEmailCodeRequest {
  email: string;
}

export interface RequestEmailCodeResponse {
  success: boolean;
}

export interface EmailAuthRequest {
  email: string;
  code: string;
}

export interface AuthCreditailsResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface ChatUserDto {
  email: string;
  id: string;
  avatarUrl: string;
  isSelf: boolean;
}

export interface MessageDto {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAt: string;
}

export interface ChatDto {
  id: string;
  type: string;
  createdAt: string;
  chatUsers: ChatUserDto[];
  messages: MessageDto[];
}

export interface GetChatListResponse {
  chats: ChatDto[];
}

export interface GetChatByIdResponse {
  chat: ChatDto;
}

export interface SendMessageRequest {
  text: string;
  chatId: string;
}

export interface SendMessageResponse {
  message: MessageDto;
}

export interface GetProfileResponse {
  user: UserDto;
}

export interface UsersControllerUploadPhotoPayload {
  /**
   * Файл изображения (jpeg, png, webp)
   * @format binary
   */
  photos?: File;
}

export type UsersControllerUploadPhotoData = UploadAvatarResponse;

export interface UsersControllerGetUserParams {
  /**
   * ID пользователя
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  userId?: string;
  email?: string;
}

export type UsersControllerGetUserData = GetUserResponse;

export type UsersControllerRequestEmailCodeData = RequestEmailCodeResponse;

export type AuthControllerEmailAuthData = AuthCreditailsResponse;

export type AuthControllerTokenRefreshData = AuthCreditailsResponse;

export type ChatControllerGetChatsListData = GetChatListResponse;

export interface ChatControllerGetChatByIdParams {
  chatId: string;
}

export type ChatControllerGetChatByIdData = GetChatByIdResponse;

export type ChatControllerSendMessageData = SendMessageResponse;

export type ProfileControllerGetProfileData = GetProfileResponse;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title User Service
 * @version 1.0.0
 * @contact
 *
 * HTTP API for user and subscription management
 */
export class UserServiceClient<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUploadPhoto
     * @request POST:/users/upload/avatar
     * @secure
     */
    usersControllerUploadPhoto: (data: UsersControllerUploadPhotoPayload, params: RequestParams = {}) =>
      this.request<UsersControllerUploadPhotoData, any>({
        path: `/users/upload/avatar`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUser
     * @request GET:/users
     * @secure
     */
    usersControllerGetUser: (query: UsersControllerGetUserParams, params: RequestParams = {}) =>
      this.request<UsersControllerGetUserData, any>({
        path: `/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRequestEmailCode
     * @request POST:/users/request-email-code
     * @secure
     */
    usersControllerRequestEmailCode: (data: RequestEmailCodeRequest, params: RequestParams = {}) =>
      this.request<UsersControllerRequestEmailCodeData, any>({
        path: `/users/request-email-code`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerEmailAuth
     * @request POST:/auth/email-auth
     * @secure
     */
    authControllerEmailAuth: (data: EmailAuthRequest, params: RequestParams = {}) =>
      this.request<AuthControllerEmailAuthData, any>({
        path: `/auth/email-auth`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerTokenRefresh
     * @request POST:/auth/token/refresh
     * @secure
     */
    authControllerTokenRefresh: (data: RefreshTokenRequestDto, params: RequestParams = {}) =>
      this.request<AuthControllerTokenRefreshData, any>({
        path: `/auth/token/refresh`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  chat = {
    /**
     * No description
     *
     * @tags Chat
     * @name ChatControllerGetChatsList
     * @request GET:/chat/get-chats-list
     * @secure
     */
    chatControllerGetChatsList: (params: RequestParams = {}) =>
      this.request<ChatControllerGetChatsListData, any>({
        path: `/chat/get-chats-list`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat
     * @name ChatControllerGetChatById
     * @request GET:/chat/get-chat-by-id
     * @secure
     */
    chatControllerGetChatById: (query: ChatControllerGetChatByIdParams, params: RequestParams = {}) =>
      this.request<ChatControllerGetChatByIdData, any>({
        path: `/chat/get-chat-by-id`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat
     * @name ChatControllerSendMessage
     * @request POST:/chat/send-message
     * @secure
     */
    chatControllerSendMessage: (data: SendMessageRequest, params: RequestParams = {}) =>
      this.request<ChatControllerSendMessageData, any>({
        path: `/chat/send-message`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags Profile
     * @name ProfileControllerGetProfile
     * @request GET:/profile
     * @secure
     */
    profileControllerGetProfile: (params: RequestParams = {}) =>
      this.request<ProfileControllerGetProfileData, any>({
        path: `/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
