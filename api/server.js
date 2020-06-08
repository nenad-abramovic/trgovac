const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
const adsRouter = require("./routes/ads/adsRouter");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const placesRouter = require("./routes/places/placesRouter");

const app = express();
app.use(express.json());

app.use(express.static("build"));

app.use("api/users", usersRouter);
app.use("api/ads", adsRouter);
app.use("api/categories", categoriesRouter);
app.use("api/places", placesRouter);

app.use("api/docs", (req, res) =>
  res.sendFile("spec.json", { root: __dirname })
);

app.use((req, res) => {
  res.redirect("back");
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
