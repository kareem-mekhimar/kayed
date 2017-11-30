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

    static BadRequest() {
        this.status = 400;
        this.message = 'Bad Request, Check your inputs';
    }
}

export default ApiError ;