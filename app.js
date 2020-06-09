// const inquirer = require("inquirer");
// const fs = require("fs");
// const path = require("path");

// const HtmlRenderer = require("./lib/htmlRenderer");
// const Employee = require("./lib/Employee");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const Manager = require("./lib/Manager");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//mostly copy pasted from stack overflow
//this will find and delete a previous output file so as to not append HTML to an existing output
fs.stat(outputPath, function (err, fileDetails) {
    // console.log(fileDetails);
    if (err) {
        // return console.error(err);
    }
    fs.unlink(outputPath, function (err) {
        //  if(err) return console.log(err);
        //  console.log('file deleted successfully');
    });
});



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

employees = [];



function addMoreEmployee(response) {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add more team members?",
            name: "addMore"
        }
    ]).then(function (response) {
        if (response.addMore === true) {
            EmployeePrompts();
        } else {
            const htmlString = render(employees);
            fs.writeFile(outputPath, htmlString, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        };
    })
};

EmployeePrompts();





function EmployeePrompts() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "name",
                name: "name",
                default: "bob"
            },
            {
                type: "input",
                message: "ID",
                name: "id",
                default: "2"
            },
            {
                type: "input",
                message: "email",
                name: "email",
                default: "bobs email"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ],
            }
        ]).then(function (EmpRes) {
            if (EmpRes.role == "Manager") {
                ManagerPrompt(EmpRes);
            } else if (EmpRes.role == "Engineer") {
                EngineerPrompt(EmpRes);
            } else if (EmpRes.role == "Intern") {
                InternPrompt(EmpRes);
            };
        }).catch(function (error) {
            console.log("An error occured:", error);
        });
};

//         ]).then(function (EmpRes) {
//             if (EmpRes.role == "Engineer") {
//                 inquirer
//                     .prompt([
//                         {
//                             type: "input",
//                             message: "Github username?",
//                             name: "github",
//                             default: "bobsGithub"
//                         },
//                     ]).then(function (EngRes) {
//                         employees.push(new Engineer(EmpRes.name, EmpRes.id, EmpRes.email, EngRes.github));
//                         // const htmlString = render(employees);
//                         // fs.appendFile(outputPath, htmlString, function (err) {
//                         //     if (err) throw err;
//                         //     console.log('Saved!');
//                         // });

//                     }).catch(function (error) {
//                         console.log("An error occured:", error);
//                     });
//             }
//         }).catch(function (error) {
//             console.log("An error occured:", error);
//         });
// }



function ManagerPrompt(EmpRes) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Managers Office number?",
                name: "getOfficeNumber",
                default: "99"
            },
        ]).then(function (managerRes) {
            employees.push(new Manager(EmpRes.name, EmpRes.id, EmpRes.email, managerRes.getOfficeNumber));
            // const htmlString = render(employees);
            // fs.appendFile(outputPath, htmlString, function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            addMoreEmployee();
            // });

        }).catch(function (error) {
            console.log("An error occured:", error);
        });
}

function EngineerPrompt(EmpRes) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Github username?",
                name: "github",
                default: "bobsGithub"
            },
        ]).then(function (engerRes) {
            employees.push(new Engineer(EmpRes.name, EmpRes.id, EmpRes.email, engerRes.github));
            // const htmlString = render(employees);
            // fs.appendFile(outputPath, htmlString, function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            addMoreEmployee();
            // });

        }).catch(function (error) {
            console.log("An error occured:", error);
        });
}

function InternPrompt(EmpRes) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "interns school?",
                name: "school",
                default: "99"
            },
        ]).then(function (InternRes) {
            employees.push(new Intern(EmpRes.name, EmpRes.id, EmpRes.email, InternRes.school));
            // const htmlString = render(employees);
            // fs.appendFile(outputPath, htmlString, function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            addMoreEmployee();
            // });

        }).catch(function (error) {
            console.log("An error occured:", error);
        });
}





