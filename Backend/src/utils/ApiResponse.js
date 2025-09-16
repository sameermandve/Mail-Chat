// Utility created to send every response in a constant manner

class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "Success",
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}


export { ApiResponse }