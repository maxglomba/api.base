export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Base API',
            version: '1.0.0',
            description: 'A simple express library API'
        },
        servers: [
            {
                url: 'http://localhost'
            }
        ]
    },
    apis: [
        './src/controllers/*.ts'
    ]
}