import express from "express"
import { config } from "dotenv"

config();

const app = express();
const PORT = process.env.PORT;

app.get("/health", (req, res) => {
    res.send("ok")
})

app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`))