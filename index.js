const server = require("./api/server.js");

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`server is running in localhost:${PORT}`);
});
