import { HTTP_STATUS_CODE } from "./constants";

export class ApiError extends Error {
      statuscode: number;

    constructor(message: string, statuscode: number) {
        super(message);
        this.statuscode = statuscode;
    }
}

export class BadRequestException extends ApiError{
    constructor(message: string) {
        super(message, HTTP_STATUS_CODE.BAD_REQUEST)
    }

}

export class UnAuthorizedException extends ApiError {
    constructor(message: string) {
        super(message, HTTP_STATUS_CODE.UN_AUTHORISED )
    }

}

export class NotFoundException extends ApiError {
    constructor(message: string) {
        super(message, HTTP_STATUS_CODE.NOT_FOUND)
    }

}

export class UnAuthenticatedException extends ApiError {
    constructor(message: string) {
        super(message, HTTP_STATUS_CODE.BAD_REQUEST)
    }

}

export class InternalServerException extends ApiError {
    constructor(message: string) {
        super(message, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
    }

}