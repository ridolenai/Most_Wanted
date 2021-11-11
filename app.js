"use strict"




//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      let alternateSearchType = prompt("Which of the traits would you like to use for your search? 'DOB', 'Occupation', 'eye color', 'height', 'weight', 'gender' or by 'multiple' criteria?").toLowerCase();
      
      switch (alternateSearchType){
        case "dob":
          searchResults = searchDOB(people);
          displayPeople(searchResults, people);
          if (searchResults.length >  1){
          searchResults = searchMultiple(people);
          }
          else{
          break;
          }
        case "occupation":
          searchResults = searchOccupation(people);
          displayPeople(searchResults);
          if (searchResults.length > 1){
          searchResults = searchMultiple(people);
          }
          else{
          break
          }
        case "eye color":
          searchResults = searchEyeColor(people);
          displayPeople(searchResults);
          if (searchResults.length > 1){
          searchResults = searchMultiple(people);
          }
          else{
          break;
          }
        case "height":
          searchResults = searchHeight(people);
          displayPeople(searchResults);
          if (searchResults.length > 1){
          searchResults = searchMultiple(people);
          }
          else{
          break;
          }
        case "weight":
          searchResults = searchWeight(people);
          displayPeople(searchResults);
          if (searchResults.length > 1){
          searchResults = searchMultiple(people);
          }
          else{
          break;
          }
        case "gender":
          searchResults = searchGender(people);
          displayPeople(searchResults);
          if (searchResults.length > 1){
          searchResults = searchMultiple(people);
          }
          else{
          break;
          }
        case "multiple":
          searchResults = searchMultiple(people);
          displayPeople(searchResults);
          break;
          }
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      alert(displayPerson(person[0]))
    // TODO: get person's info
    break;
    case "family":
      displayPerson(person[0])
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
      descendantSearch(people, person);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundName = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundName;
}
function searchDOB(people){
  let DOB = promptFor("What is the person's date of birth in the format m/d/yyyy?", autoValid);
  let foundDOB = people.filter(function(potentialMatch){
    if(potentialMatch.dob === DOB){
      return true;
    }
    else{
      return false;
    }
  })
  return foundDOB;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);
  let foundEye = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return foundEye;
}

function searchGender(people){
  let gender = promptFor("What is the person's gender?", autoValid);
  let foundgender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
  }
  else{
    return false;
  }
  
  })
  return foundgender;
}



function searchOccupation (people){
  let occupation = promptFor("What is the person's occupation?", autoValid);
  let foundOccupation = people.filter(function (potentialMatch){
    if (potentialMatch.occupation === occupation) {
      return true;
    }
    else{
      return false;
    }
  })
  return foundOccupation;
}

function searchWeight (people){
  let weight = String(promptFor("What is the person's weight?", autoValid));
  let foundWeight = people.filter(function (potentialMatch){
    if (String(potentialMatch.weight) === weight) {
      return true;
    }
    else{
      return false;
    }
  })
  return foundWeight;
}

function searchHeight (people){
  let height = String(promptFor("What is the person's height?", autoValid));
  let foundHeight = people.filter(function (potentialMatch){
    if (String(potentialMatch.height) === height){
      return true;
    }
    else{
      return false;
    }
  })
  return foundHeight;
}




function searchMultiple(people){
  let multipleResults = people;
  do {
    let eyeColorSearch = promptFor("Do you know their eye color? ", yesNo);
    if (multipleResults != 1){
    if (eyeColorSearch == "yes"){
      multipleResults = searchEyeColor(multipleResults);
    }}
    if (multipleResults.length == 1){
      break;
    }
    let weightSearch = promptFor("Do you know their weight? ", yesNo);
    if (multipleResults != 1){
    if (weightSearch == "yes" ){
      multipleResults = searchWeight(multipleResults)
    }}
    if (multipleResults.length == 1){
      break;
    }
    let heightSearch = promptFor("Do you know their height? ", yesNo);
    if (multipleResults != 1){
    if (heightSearch == "yes" || multipleResults.length > 1){
      multipleResults = searchHeight(multipleResults);
    }}
    if (multipleResults.length == 1){
      break;
    }
    let occupationSearch = promptFor("Do you know their occupation? ", yesNo);
    if (multipleResults != 1){
    if (occupationSearch == "yes" || multipleResults.length > 1){
      multipleResults = searchOccupation(multipleResults);
    }}
    if (multipleResults.length == 1){
      break;
    }
    let dobSearch = promptFor("Do you know their DOB? ", yesNo);
    if (multipleResults != 1){
    if (dobSearch == "yes" || multipleResults.length > 1){
      multipleResults = searchDOB(multipleResults);
    }}
    if (multipleResults.length == 1){
      break;
    }
    let genderSearch = promptFor("Do you know their gender?", yesNo);
    if (multipleResults != 1){
    if (genderSearch == "yes" || multipleResults.length > 1){
      multipleResults = searchGender(multipleResults);
    }}
    if (multipleResults.length == 1){
      break;
    }
    } while (multipleResults.length > 1 && multipleResults.length != 0)
    
    return multipleResults;
  }







//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  // TODO: finish getting the rest of the information to display.
  return personInfo;
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion















