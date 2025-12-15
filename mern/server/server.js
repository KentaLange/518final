import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import db from "./db/connection.js";
import records from "./routes/record.js";
import sessions from "./routes/session.js";
import users from "./routes/user.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/record", records);
app.use("/session", sessions);
app.use("/user", users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});