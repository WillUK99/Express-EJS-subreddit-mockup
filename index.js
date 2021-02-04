const express = require("express");
const path = require("path");
const app = express();
const redditData = require("./data.json");

// allows us to use css and js in our templates /public
app.use(express.static(path.join(__dirname, "public")));


// allows us to use ejs with our templates /views 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));




// allows the homepage / to render from /views
app.get("/", (req, res) => {
    res.render("homepage")
})


// /r/:subreddit is the pattern we are looking for
app.get("/r/:subreddit", (req, res) => {
    // if the pattern matches then it will be destructed into {subreddit}
    const { subreddit } = req.params;
    // if the above pattern matches that with data from data.json it will be captured in the data variable.
    const data = redditData[subreddit]
    // if data can be found it will be rendered
    if (data) {
        res.render("subreddit", { ...data })
        // if the pattern can't be matched from data.json then /nopage is rendered
    } else {
        res.render("nopage", { subreddit })
    }
})


// server listening on port 3000
app.listen("3000", () => {
    console.log("online and listening");
})