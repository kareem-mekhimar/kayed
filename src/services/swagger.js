import swaggerJSDoc from "swagger-jsdoc";



let swaggerDefinition = {
    info: {
        title: 'Kayed Api',
        version: '1.0.0',
        description: '*Kayed Rest Api | [PostMan v0.1](Kayed.postman_collection.json)*',
    },

    host: 'localhost:3000',
    basePath: '/api/v1',
    securityDefinitions: {
        JWT: {
            type: "apiKey",
            description: "Ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
            name: "Authorization",
            in: "header"
        }
    },
    security: [
        {
            "JWT": []
        }
    ]
    
};


let options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec ;
