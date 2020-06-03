const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const EmployeeFile = require("./lib/EmployeeFile");
const EngineerFile = require("./lib/EngineerFile");
const InternFile = require("./lib/InternFile");
const ManagerFile = require("./lib/ManagerFile");




inquirer
    .prompt([
        {
            type: "input",
            message: "Github username?",
            name: "userName"
        },
        {
            type: "input",
            message: "Title of project?",
            name: "title"
        },


    ]).then(function (data) {
        let stream = fs.createWriteStream("README.md");
        stream.write("# " + data.title + "\n");
        stream.write("# Description" + "\n" + data.Description + "\n");


    }).catch(function (error) {
        console.log("An error occured:", error);
    });

