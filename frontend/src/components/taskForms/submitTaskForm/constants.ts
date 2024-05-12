import { TaskStatus } from "../../../types/types"
import type { SubmissionType } from "../../../types/types"

export const formDataInitialState:SubmissionType = {
   submissionId: "",
   taskId: "",
   githubLink: "",
   userId: "",
   status: TaskStatus.PENDING,
   submissionTime: "",
}

export const InputsProps = [
   {
      "element": "input",
      "type": "text",
      "name": "githubLink",
      "label": "Github Link",
      "errorMessage":'begin with  "http"  and ...finish with  ".png",  ".jpg" or ".jpeg"',
      "required":true,
      "pattern": "(https://|http://|https://|http://)([.a-zA-Z0-9/_-]{2,})",
      "options": []
   },
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



