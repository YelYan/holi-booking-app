import CustomError from "./customError.js";

class PaymentError extends CustomError<ErrorCode> {}

export default PaymentError;