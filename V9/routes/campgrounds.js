var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

//INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if (err) {
            console.log(err);
        } else {
                res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
})

//CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/");
        }
    })
})

//NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

// SHOW - Shows more info about the campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//MiddleWare
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;