import express from "express";
import api from "./api/api.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.set('views', './api/views')
// app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use("/api", api);

const PORT = process.env.PORT || 3051;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
