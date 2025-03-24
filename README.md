# AI Scholar - Server

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A database (MongoDB, PostgreSQL, etc.) if required

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Sushanto171/ai-scholar-server
   cd ai-scholar-server
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary environment variables (e.g., database connection string, JWT secret)

## Usage

### Development Mode

Run the server in development mode:

```sh
npm run dev
# or
yarn dev
```

### Production Mode

Start the server in production mode:

```sh
npm start
# or
yarn start
```

## Dependencies

- Express.js
- dotenv (for environment variables)
- jsonwebtoken (for authentication)
- cors (for handling CORS policies)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).
