const express = require("express");
const routes = require("./routes");
// Import and require Sequelize
const sequelize = require("./config/connection");
// Import and require mysql2
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// syncs sequelize models to the database, then turns on the server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});
