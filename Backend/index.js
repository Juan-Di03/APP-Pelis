require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { getConnection } = require("./db/db-conection-mongo");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/** Routes */

app.use('/api/generos', require('./Routes/genero'));
app.use('/api/productoras', require('./Routes/productora'));

getConnection();

app.listen(PORT, () => {
    console.log(` 🚀Servidor corriendo puerto ${PORT}✅`);
});