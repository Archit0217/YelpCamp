var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// CAMPGROUND Schema 

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://rctmaps.files.wordpress.com/2014/12/leafy-lake.jpg",
//         description: "Surrounded by the state's biggest lake"
//     }, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//           console.log("Newly Created Campground: ");
//           console.log(campground)
//         }
        
//     });

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if (err) {
            console.log(err);
        } else {
                res.render("index", {campgrounds: allcampgrounds});
        }
    });
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

// SHOW - Shows more info about the campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started");
})