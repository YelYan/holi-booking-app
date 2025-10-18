type ErrorCode ="ERR_AUTH" | "ERR_ENV_STRIPE" |"ERR_NF"|  "ERR_PAYMENT"  | "ERR_VALIDATION"  

interface ValidationError  {
    error : {
        code : ErrorCode;
        errors : {message : string}[]
        message : string;
    }
}