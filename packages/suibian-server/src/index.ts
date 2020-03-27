import * as dotenv from "dotenv-extended";
import express from "express";
import router from "./routes";
import path from "path";
import sockets from "./sockets";
import { db } from "./config/sequelize";
const app = express();

//defining ports
const PORT = process.env.PORT || 4000;
dotenv.load({ errorOnMissing: true, includeProcessEnv: true });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../../suibian-app/public")));
app.use(router);

const httpServer = sockets.startSocketServer(app);
httpServer.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

// Test DB
// db.authenticate()
//   .then(() => console.log("Database connected ..."))
//   .catch(err => console.log("Error: " + err));

// app.listen(PORT, () => {
//   console.log(`(App Listen )Server is listening to port ${PORT}`);
// });
