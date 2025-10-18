import CustomError from "./customError.js";

class StripeEnvError extends CustomError<ErrorCode> {}

export default StripeEnvError;