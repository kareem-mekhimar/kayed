class ApiError extends Error{
    status;
    message;

    constructor(status,message){
        super();
        this.status = status ;
        this.message = message ;
    }
    
    static NotFound(name) {
        this.status = 404;
        this.message = `${name} Not Found`
    }

    static BadRequest(message = 'Bad Request, Check your inputs') {
        this.status = 400;
        this.message = message;
    }
}

export default ApiError ;