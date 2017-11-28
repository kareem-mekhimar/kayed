import swaggerJSDoc from "swagger-jsdoc";



let swaggerDefinition = {
    info: {
        title: 'Kayed Api',
        version: '1.0.0',
        description: 'Kayed Rest Api V.1',
    },

    host: 'localhost:3000',
    basePath: '/api/v1',
};


let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec ;
