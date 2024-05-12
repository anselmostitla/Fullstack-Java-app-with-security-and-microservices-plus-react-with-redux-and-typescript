export type FormType = {
   email: string 
   pass:string
   // name: string 
   // role: string
   // phoneNumber: string
   // deadline: string
   // confirmPassword: string
   // age: string

   // title: string
   // description: string
   // imageUrl:string
   // deadline: string
}


// export type SignupDataType = {
//    email: string 
//    pass:string
//    // name: string 
//    // role: string
//    // phoneNumber: string
//    // deadline: string
//    // confirmPassword: string
//    // age: string

//    // title: string
//    // description: string
//    // imageUrl:string
//    // deadline: string
// }

// I think it would be better "export const formDataInitialState or formDataInitialValues"
export const formDataInitialState = {
   email:"",
   pass: "",
   // name:"",
   // role:"",
   // phoneNumber:"",
   // deadline: "",
   // confirmPassword: "",
   // age: "",

   // title:"",
   // description: "",
   // imageUrl:"",
   // deadline:""
}

// export interface AdminOrUserI {
//    value: string,
//    label: string
// }

// // SelectOptionsType is used in ./InputBoxes.tsx
// export type SelectOptionsType = {
//    value: string,
//    label: string
// }

// const adminOrUser = [
//    {value: "admin", label:"ADMIN"},
//    {value: "user", label:"USER"},
// ]

export const InputsProps = [
   { 
      "element": "input",
      "type": "text",
      "name": "email",
      "label": "Email",
      "errorMessage":"It should be a valid email address!",
      "required":true,
      "pattern":"^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$",
      "options": []
   },
   {
      "element": "input",
      "type": "password",
      "name": "pass",
      "label": "Password",
      "errorMessage":"Password should be at least 8 characters and should include at least 1 letter, 1 number and 1 special character!",
      "required":true,
      "pattern" : '(?=.*\\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\\$%&\\?].*).{8,}',
      "options": []
   },
   // {
   //    "element": "input",
   //    "type": "text",
   //    "name": "name",
   //    "label": "Name",
   //    "errorMessage":"",
   //    "required":true,
   //    "pattern":"^[A-Za-z0-9 ]{1,}$",
   //    "options": []
   // },
   // {
   //    "element": "select",
   //    "type": "text",
   //    "name": "role",
   //    "label": "Role",
   //    "errorMessage":"Role must be ADMIN or USER",
   //    "required":true,
   //    "pattern":"",
   //    "options": [
   //       {value: "", label:"Role"},
   //       {value: "admin", label:"ADMIN"},
   //       {value: "user", label:"USER"},
   //    ]
   // },
   // {
   //    "element": "textarea",
   //    "type": "text",
   //    "name": "description",
   //    "label": "Description",
   //    "errorMessage":"Description is open to any character type",
   //    "required":true,
   //    "pattern":"",
   // },

   // {
   //    "type": "date",
   //    "name": "deadline",
   //    "label": "Deadline",
   //    "errorMessage":"Deadline length must be at least 3 and should'n include any special character",
   //    "required":true,
   //    "pattern":"",
   // }
]




/*

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

console.log(validateEmail("example@email.com")); // true
console.log(validateEmail("invalid-email"));      // false

Here's what this pattern does:

^: Asserts the start of the string.
[^\s@]+: Matches one or more characters that are not whitespace or '@'.
@: Matches the '@' symbol.
[^\s@]+: Matches one or more characters that are not whitespace or '@'.
\.: Matches the '.' symbol (escaped because '.' has a special meaning in RegEx).
[^\s@]+: Matches one or more characters that are not whitespace or '@'.
$: Asserts the end of the string.

__________________________________________________________________________________


function checkPasswordStrength(password) {
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return pattern.test(password);
}

console.log(checkPasswordStrength("Passw0rd!"));    // Output: true
console.log(checkPasswordStrength("weakpassword")); // Output: false


Here's what this pattern does:

(?=.*\d): Requires at least one digit.
(?=.*[a-z]): Requires at least one lowercase letter.
(?=.*[A-Z]): Requires at least one uppercase letter.
(?=.*[!@#$%^&*]): Requires at least one special character.
.{8,}: Requires a minimum length of 8 characters.


GOOD TUTORIAL: https://www.freecodecamp.org/news/regex-in-javascript/

*/



