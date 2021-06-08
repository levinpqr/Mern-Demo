const express = require("express");
const connectDB = require("./config/db-connector");
const app = express();
const path = require("path");

// connect to DB
connectDB();

app.use(express.json({ extended: false }));
// Define routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/user-post", require("./routes/api/post"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user-profile", require("./routes/api/profile"));

// Serve Static Assests for Production
if (process.env.NODE_ENV === "production") {
    // set static folder (built folder)
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        // use the index.html built, gateway to FE
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED! Connect to port ${PORT}`));
