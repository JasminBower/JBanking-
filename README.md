# JBanking

This is a RESTful API to compute statistics for all valid transactions made in the last 60 seconds.
It contains the following endpoints:

- POST /transactions
- GET /statistics
- DELETE /transactions

Node.js needs to be v13.8.0 or higher.

This API was created using the following dependencies:

```
Express v4.17.1
joi 17.3.0
```

Testing was with:

```
nodemon v2.0.5
mocha v8.2.0
chai v4.2.0
supertest v5.0.0
```

## Installation

To install project via npm:

```
npm install
```

To start server, you can set the environment variable to another port on the command line, it's currently defaulted to 4040:

```
npm run start
```

## Testing

The testing suite has been created using full TDD with mocha and chai. HTTP requests to test the endpoints were made with Supertest.

The following command will test the endpoints:

```
npm test
```

The following command will test the utility functions:

```
npm run test-utils
```

## Considerations

- MVC architecture was followed for future scalability.

- Full TDD methodology was followed to ensure accuracy.

## Future Improvements

- Security of the API against attacks, Joi limits what can be in POST requests but more features can be implemented.

- Performance could be enhanced.
