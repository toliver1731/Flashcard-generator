

//Create variables for packages needed

var inquirer = require("inquirer");
var fs = require("fs");

// var BasicCard = require("./BasicCard.js")
// var ClozeCard = require("./ClozeCard.js")

//BasicCard constructor - front and back

function BasicCard(front, back){
  this.front = front;
  this.back = back;
}

//ClozeCard constructor - full text, partial, cloze

function ClozeCard(text, cloze, partial){
  this.text = text;
  this.cloze = cloze;
  this.partial = partial;
}


//starts prompt

function startPrompt(){
inquirer.prompt([{

        type: "list",
        name: "type",
        message: "What would you like to do?",
        choices: ["Create Basic Card", "Create Cloze Card", "Study!"]

}]).then(function(user) {
    if (user.type === "Create Basic Card") {
        makeBasicCard();
    }
    else if (user.type === "Create Cloze Card"){
        makeClozeCard();
    }
    else{
        studyCards();
    }
});
}
startPrompt();

//Basic Card

function makeBasicCard(){
  return inquirer.prompt([
        {
            type: "input",
            name: "front",
            message: "What is the question to put on the front of the card?"
        },
        {
            type: "input",
            name: "back",
            message: "What is the answer to place on the back of the card?"
        }
      ]).then(function(basicInfo) {

          

        newBasic = new BasicCard(basicInfo.front, basicInfo.back);
            console.log(newBasic);

          fs.appendFile("flashcards.txt", JSON.stringify(newBasic)+ '\r\n', function(err) {
            if (err) {
              console.log(err);
              }
          });
          inquirer.prompt([
            {
              type:"confirm",
              name:"confirm",
              message:"Do you want to make another card?",
              default: true
            }
          ]).then(function(userConfirm){
            if(userConfirm.confirm === true){
              makeBasicCard();
            }else{
              startPrompt();
            }
          });
        });
}

//Cloze Card

function makeClozeCard(){
  return inquirer.prompt([
          
          {
            type: "input",
            name: "text",
            message: "Please enter the full statement."
          },
          {
              type: "input",
              name: "cloze",
              message: "Please state which words of the sentence you would like omitted for studying."
          },
          {
              type: "input",
              name: "partial",
              message: "Now type the partial text, leaving out the cloze you stated in the previous question."
          },
        ]).then(function(clozeInfo) {
          newCloze = new ClozeCard(clozeInfo.text, clozeInfo.cloze, clozeInfo.partial);
            console.log(newCloze);

          fs.appendFile("flashcards.txt", JSON.stringify(newCloze)+ '\r\n' , function(err) {
            if (err) {
              console.log(err);
              }
          });
          inquirer.prompt([
            {
              type:"confirm",
              name:"confirm",
              message:"Do you want to write another card?",
              default: true
            }
          ]).then(function(userConfirm){
            if(userConfirm.confirm === true){
              makeBasicCard();
            }else{
              startPrompt();
            }
          });
        });
}

//Study Cards

function studyCards (){
  fs.readFile("flashcards.txt", "utf8",function (err, data){
    if (err){
      throw err;
    }
    console.log(data);
  });
}