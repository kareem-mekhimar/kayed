class ApiError extends Error{
    status;
    message;
         
    constructor(status,message){
        super();
        this.status = status ;
        this.message = message ;
    }
}

export default ApiError ;