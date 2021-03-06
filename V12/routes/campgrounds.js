var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if (err) {
            console.log(err);
        } else {
                res.render("campgrounds/index", {campgrounds: allcampgrounds, page: 'campgrounds'});
        }
    });
})

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var cost = req.body.cost;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, cost: cost, description: desc, author: author};
    
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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

//EDIT CAMPGROUND ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
      Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
    })
})

//UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground and then redirect
    //redirect on the show page
    var newData = {name: req.body.name, image: req.body.image, cost: req.body.cost, description: req.body.description};
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + updatedCampground._id)
        }
    })
})

//DESTROY CAMPGOURND ROUTe
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    });
});


module.exports = router;