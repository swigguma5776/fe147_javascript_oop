// OBJECTS IN JS aka DICTIONARIES

// with JS we don't need to put quotes around our keys 
// UNNLESS there is a special character
let bender = {
    name: 'Aang',
    age: 12,
    pets: ['Appa', 'Momo'],
    'bending-nations': ['air', 'water', 'fire', 'earch', 'blood'],
    friends: [
        {
            name: 'Katara',
            'bending-nations': ['water']
        },
        {
            name: 'Toph',
            'bending-nations': ['earth']
        }
    ],
                                                //this refers to THIS specific object
    'do-bending': function() {
        // this NEEDS to have meaning aka be bound correctly to it's object
        // if we use an arrow functionn here this has no meaning, its not referring to anything
        // using a regular named functionn within an object here gives this meaning
        console.log(`My name is ${this.name} and I am ready to save the world!`)
    }
}

// Accessing Object Properties
// THIS IS HOW YOU WILL GRAB DATA IN AN API. VERY IMPORTANT TO PRACTICE THE BELOW
// APIs are just giant dictionaries of data being transferred over the web
// JSON = JavaScript Object Notation aka THIS aka dictionnaries

console.log(bender['name']); //bracket notation accessing
console.log(bender.age); //dot notation accessing
console.log(bender.pets[0]);

console.log(bender.friends[0]["bending-nations"][0]) //any special characters in your keys you NEED to use bracket notation
console.log(bender['do-bending']());


//Traversing through Objects
//in the world of PYthon we had the .keys(), .values(), .items() => which is both key & values
// in JS we have Object.keys(), Object.values(), Object.entries() => both

//Traverse the keys of my object
console.log(Object.keys(bender)); //this is creating an array with all the keys
for (let key of Object.keys(bender)){
    console.log(key);
};

// //Traverse the values of my object
console.log(Object.values(bender));
for (let value of Object.values(bender)){
    console.log(value)
};

// //Traverse both key & values of my object
console.log(Object.entries(bender));
for (let [key, value] of Object.entries(bender)){
    console.log(`Key: ${key}, Value: ${value}`)
}

//If we wanted to print out all of the values individually we could traverse even further
for (let [key, value] of Object.entries(bender)){
    // we can use typeof to see what our data types are for our values
    // these guys are object/reference types aka array, object
    
    // this first type check is for pets, bending-nations, friends
    if (Array.isArray(value)){ //specifically checkinng if its an array
    // if (typeof value === 'object'){ //this is checking if its an object (array & objects)
        console.log(`Key: ${key}, Values:`)

        for (let thing of value){
            // this second type check is for friends specifically because it is a list of objects
            if (typeof thing === 'object'){
                for (let [key, value] of Object.entries(thing)){
                    console.log(`Key: ${key}, Value: ${value}`)
                }
            } else {
            console.log(thing)
            }
        }
    } else if (typeof value === 'string') {
        // these guys are non-object types aka primative so string, number, boolean
        console.log(`Key: ${key}, Value: ${value}`)
    } else if (typeof value === 'number'){
        console.log(`Key: ${key}, Value: ${value}`)
    } 
    
}




// OBJECT ORIENTED PROGRAMMING Start
// OLD WAY OF BUILDING OBJECT PROTOTYPES
//constructor funnction on an OBJECT Prototype
//constructor functions are Blueprints to create MULTIPLE objects
function Bender(name, age, pets, nations){
    // this.name is akin to self.name in Python
    this.name = name;
    this.age = age;
    this.pets = pets;
    this.nations = nations; 
}

//Prototype Method
Bender.prototype['do-bending'] = function(){
    console.log(`My name is ${this.name} and I am ready to save the world!`)
}


//Create Bender Object Prototypes
let aang = new Bender('Aang', 12, ['Momo', 'Appa'], ['water', 'air', 'fire', 'earth'])

// aang['do-bending']();

let katara = new Bender('Katara', 15, [], ['water']);
// katara['do-bending']();



// OBJECT ORIENNTED PROGRAMMING END/NOW
// NEW WAY as of Ecma 6 2015

//same thing as above just more organized & modular
class BetterBender {
    // this is the exact same as the __init__() method in Python
    // its called constructor because it is constructing an object from this class/blueprint
    constructor(name, age, pets, nations){
        this.name = name;
        this.age = age;
        this.pets = pets;
        this.nations = nations;
    }
    
    // arrow functions inherit the this binding from surrounding code aka this class
    // arrow function is a follower not a leader, whater the binding of parent code is, it will follow
    // in this case this is binding to THIS specific object, so will the arrow function
    doBending = () => {
        console.log(`I am ${this.name} and I am this many years old ${this.age}. And I will destroy you.`)
    }
    
    ageUp = () => {
        console.log(`I had a birthday and now I am ${++this.age}`)
        // we can call uponn methods inside other methods
        this.doBending();
    }
}

//using the same class/blueprint to create 2 SEPERATE objects
const toph = new BetterBender('Toph', 11, ['the twins'], ['earth']);
// toph.doBending();
toph.ageUp();
console.log(toph.age);

const zuko = new BetterBender('Zuko', 16, ['dragon'], ['fire']);
// zuko.doBending();
zuko.ageUp();

// withinn the class we use 'this' to refer to THIS specific object
// outside the class we refer to it by its instantiated name aka toph &  zuko


// OOP INHERITANCE
// Classes in JS can inherit from other clases using the 'extends' keyword


class Human {
    constructor(name, age, sleepTime){
        this.__name = name; //name is private so we can ONLY access withinn Human class
        this.age = age;
        this._sleepTime = sleepTime; //sleepTime is protected so we can access it within Human & any classes that inherit Human
    }
    
    sleep = () => {
        console.log(`I need this many hours of sleep ${this._sleepTime} and I am very tired.`)
    }
    
    //allows us control over WHO accessing these variables and HOW they access them
    //added security measures
    //to access PRIVATE variables who could use a getter method
    getName = () => {
        return this.__name
    }
}

//inherit this human using 'extends' keyword
class Baby extends Human {
    constructor(name, age, sleepTime, poopSchedule){
        // pass the attributes associated with Human class to Human
        super(name, age, sleepTime); // super().__init__() in Python
        // anything new specific to ONLY Baby we need to bind it to it's specific object
        this.poopSchedule = poopSchedule; 
    }
    
    cry = () => {
        console.log(`I am a baby and need to poop every ${this.poopSchedule} hours. If not I will cry! and I sleep ${this._sleepTime}`)
    }
}

const karen = new Human('Karen', 28, 5)
karen.sleep();
// karen.cry(); //karen caannot cry because cry is not within Human class scope. We can only inherit top down, parent => child 

const sneasel = new Baby('Sneasel', 0, 16, 3);
sneasel.sleep();
console.log(sneasel.age);
sneasel.cry();


/* ACCESS MODIFIERS private, protected, public attributes (suggestionns/conventions)
    - private __ double underscore to denote it as a private variable (aka you can't access it outside of the class it was created)
    - protected _ single underscore (aka you can't access it outside of the class it was derived in and any inherited classes)
    - public is default (can access them from wherever)
*/


// MATH OBJECT

//formatting mathemaatical equations
//Math.random() just like our friend .sort() is a little weird
 const randomVal = Math.floor(Math.random() * 100); // syntax for using the Math.ranadom() within a range larger than 0 - 1
console.log(randomVal);

const roundedVal = Math.round(5.55); //rounding to the nearest whole #
console.log(roundedVal);

const divideWhole = Math.round(10 / 3)
console.log(divideWhole);

const divideDec = (10 / 3).toFixed(2); //allows us to specificy decimal places
console.log(divideDec);

const gloves = 7
const pairs = Math.floor(gloves / 2) //formaatting this per desired result
console.log(pairs);

console.log(Math.abs(-7));



// DATE OBJECT useful for timestamping data
// create a date object by insantiating the date class
const currentDate = new Date(); //current date
console.log(currentDate);


//can make a date object from a specified date
// format is "YYYY-MM-DDTHH:MM:SS"
const specificDate = new Date("2022-09-04T09:30:00")
console.log(specificDate);

console.log(specificDate.getFullYear());
console.log(specificDate.getMonth()+ 1); //months are 0 based just like indexes
// const newDate = specificDate.getFullYear() + 2;

console.log(specificDate.getDate()); //this brings back the day date which is 4
let newDate = specificDate.setDate(specificDate.getDate() + 7) //adding 7 days & resets the date object variable
newDate = new Date(newDate); //changing that numeric valaue into a date object
console.log(newDate);


