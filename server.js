import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
dotenv.config(
  {
    path: "./.env"
  }
);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");  

passport.use(
  new GoogleStrategy(
    {
      clientID: rocess.en,
      clientSecret: "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",
      callbackURL: "http://localhost:8080/auth/google/handle",
    },  
    async (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  done(user, done);
});



// Use a predefined string or random string as input for the hash
const secretString = "your-secret-string";
const secretKey = CryptoJS.SHA256(secretString).toString(CryptoJS.enc.Hex);
console.log(secretKey);


app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res)=>{
  res.render('homepage')
})

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

try {
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
} catch (error) {
  console.error("Error starting the server:", error);
}


