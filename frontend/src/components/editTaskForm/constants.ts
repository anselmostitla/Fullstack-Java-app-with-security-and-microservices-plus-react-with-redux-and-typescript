import { TaskStatus } from "../../types/types"
import type { TaskType } from "../../types/types"

export const formDataInitialState:TaskType = {
   taskId:"",
   title:"",
   description: "",
   image:"",
   deadline: "",
   assignedUserId: "",
   status: TaskStatus.PENDING,
}

export const InputsProps = [
   {
      "element": "input",
      "type": "text",
      "name": "title",
      "label": "Title",
      "errorMessage":"",
      "required":true,
      "pattern":"^[A-Za-z0-9 u00C0-\u017F .]{1,}",
      "options": []
   },

   {
      "element": "textarea",
      "type": "text",
      "name": "description",
      "label": "Description",
      "errorMessage":"Description is open to any character type",
      "required":true,
      "pattern":"[./A-Za-z0-9 ]{1,}",
      "options": []
   },

   {
      "element": "input",
      "type": "text",
      "name": "image",
      "label": "Image Url",
      "errorMessage":'begin with  "http"  and ...finish with  ".png",  ".jpg" or ".jpeg"',
      "required":true,
      "pattern": "(https://|http://|https://|http://)([.a-zA-Z0-9/_-]{2,})(.png|.jpeg|.jpg)$",
      "options": []
   },

   {
      "element": "input",
      "type": "datetime-local",
      "name": "deadline",
      "label": "Deadline",
      "errorMessage":"Deadline length must be at least 3 and should'n include any special character",
      "required":true,
      "pattern":"",
      "options": []
   }
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


"pattern": "(https://|http://|https://|http://)([.a-zA-Z0-9/]{2,})(.png|.jpeg|.jpg)$",
(https://|http://|https://|http://) it should begin with https:// or http:// or https:// or http://
([.a-zA-Z0-9/]{2,}) it should follow with a dot, a letter, a digit, a slash any number of times
(.png|.jpeg|.jpg)$ it should finish with .png or .jpeg or .jpg



GOOD TUTORIAL: https://www.freecodecamp.org/news/regex-in-javascript/

*/



