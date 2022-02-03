const express = require("express");
const https = require("https");

const app = express();
const rjoke="";
const rsetup = "";
const rdelivery=""
const imgurl = "https://cdn.iconscout.com/icon/free/png-256/sunny-weather-1-458138.png";

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res){



    res.render("list",{joke : rjoke, delivery : rdelivery, setup : rsetup});
    //console.log(url);
    //res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

    let url = "https://v2.jokeapi.dev/joke/Any";
   // console.log(url);
    https.get(url , (response) =>{
        console.log(response.statusCode);

        response.on("data", (data) =>{
            const jd = JSON.parse(data)
            const rjoke = jd.joke;
            const rsetup = jd.setup;
            const rdelivery = jd.delivery;
            
            res.render("list",{joke : rjoke, delivery : rdelivery, setup : rsetup});
        
            
        })
    }) 

})
app.listen(process.env.PORT || 3000, console.log("Server Started"));
