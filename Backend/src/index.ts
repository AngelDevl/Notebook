import express from "express"
import { config } from "dotenv";

config({ path: "../.env" })

const app = express();
const PORT = process.env.EXPRESS_API_PORT || 4000;

app.get("/health", (req, res) => {
    res.send("ok")
})

app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`))