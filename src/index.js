const express = require("express");
require("./db/mongoose");
const port = process.env.PORT || 3000;
const app = express();
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port ", port);
});
