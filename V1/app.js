var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Diamond Heights", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Leafy Lake", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Evergreen Gardens", image:"https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Diamond Heights", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Leafy Lake", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Diamond Heights", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Leafy Lake", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Diamond Heights", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"},
        {name: "Leafy Lake", image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg"}
]

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started");
})