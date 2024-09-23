require('dotenv').config(); 

const express = require('express'); 
const bodyParser = require('body-parser'); 
const swaggerJsDoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express'); 
const metodosRoutes = require('./routes/metodosController'); 

const app = express(); 

app.use(bodyParser.json()); 

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Versión de OpenAPI
        info: {
          title: 'API de Métodos',
          description: 'Documentación de la API de Métodos',
          version: '1.0.0',
          contact: {
            name: 'Tu Nombre',
          },
          servers: [{ url: 'http://localhost:3000' }],
        },
      },
      apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/metodos', metodosRoutes); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
    console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`); 
})