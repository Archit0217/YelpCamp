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
router.post("/", function(req, res){
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

//NEW ROUTE
router.get("/new", function(req, res){
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

module.exports = router;