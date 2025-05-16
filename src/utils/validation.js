const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("First name shoud be 4-50 charactors long");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("The email id is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

const validateLoginData = (req) => {
    const { emailId, password } = req.body;

    if(!validator.isEmail(emailId)){
        throw new Error("The email is is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not valid");
    }
}

module.exports = {
    validateSignUpData,
    validateLoginData,
};
