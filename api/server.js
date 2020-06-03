const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
const adsRouter = require("./routes/ads/adsRouter");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const placesRouter = require("./routes/places/placesRouter");

const app = express();
app.use(express.json());

app.use("/", express.static("build"));

app.use("/users", usersRouter);
app.use("/ads", adsRouter);
app.use("/categories", categoriesRouter);
app.use("/places", placesRouter);

app.use((req, res, next) => {
  res.redirect("back");
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
