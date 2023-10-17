const app = require("express")();

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to shift plan"
  });
});
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
