class ErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.message = msg;
        console.log(`u ri errorhandler page ${this.message}`);
    }

    static validationError(message = 'All fields are required!') {
        return new ErrorHandler(422, message);
    }

    static notFoundError(message = 'Not found!') {
        return new ErrorHandler(404, message);
    }

    static serverError(message = 'Internal error') {
        return new ErrorHandler(500, message);
    }

    static forbidden(message = 'Not allowed!') {
        return new ErrorHandler(403, message);
    }

    // toJSON() {
    //     return JSON.stringify({
    //         status: this.status,
    //         message: this.message
    //     });
    // }

}
// const error = ErrorHandler.validationError();
// console.log(error.toJSON());

module.exports = ErrorHandler;