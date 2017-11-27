import swaggerJSDoc from "swagger-jsdoc";



let swaggerDefinition = {
    info: {
        title: 'Kayed Api',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },

};

    //host: 'localhost:3000',
    //basePath: '/api/v1',

let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec ;
