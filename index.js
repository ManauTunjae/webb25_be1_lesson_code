import express from "express"
import dotenv from 'dotenv';
import cors from "cors"
import artistsRouter from "./routes/artists.js"

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API is running'});
});

app.use('/api/artists', artistsRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT,(error) => {
    if(error) {
        console.log("Error in running express", error.message)
        return
    }
    console.log(`Server is running on port ${PORT}`)
});