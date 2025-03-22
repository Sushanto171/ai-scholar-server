const app = require("./src/app");

require("dotenv").config();
const port = process.env.PROT || 5000;

app.listen(port, () => {
  console.log(`AI Scholar server is running on port: ${port}`);
});