import { NextApiResponse } from 'next/dist/shared/lib/utils'

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpError {
  status: HttpStatusCode
  message: string
  constructor(status: HttpStatusCode, message: string) {
    this.status = status
    this.message = message
  }
}
export class HandleError {
  err: HttpError
  constructor(err: HttpError | unknown) {
    if (err instanceof HttpError) {
      this.err = err
    } else {
      const newErr = new HttpError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'Internal server error',
      )
      this.err = newErr
    }
  }
}
