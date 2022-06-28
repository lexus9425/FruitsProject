const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"] 
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit ({
//     rating: 10,
//     review: "Pretty solid as a fruit."
// });

//fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
    name: "Mango",
    score: 10,
    review: "Best fruit in town!"
});

mango.save();

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Successfully updated the dcoument");
    }
});

// const pineapple = new Fruit({
//     name: "Pineapple",
//     score: 9,
//     review: "Great fruit."
// });

// pineapple.save();

// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favoriteFruit: pineapple
// });

// person.save();

// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "The best fruit!"
// });

// const orange = new Fruit({
//     name: "Orange",
//     score: 4,
//     review: "Too sour for me"
// });

// const banana = new Fruit({
//     name: "Banana",
//     score: 3,
//     review: "Weird texture"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits to the fruitsDB");
//     }
// });

Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {

        mongoose.connection.close();

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});