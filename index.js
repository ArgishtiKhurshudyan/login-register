import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import sequelize from "./db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js"
import chalk from "chalk";

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const connect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
  } catch (error) {
    throw error
  }
}


app.listen(PORT, () => {
  connect()
  console.log(chalk.yellow(`connected backEnd on PORT ${chalk.red(PORT + chalk.bgCyan("!"))}`));

});