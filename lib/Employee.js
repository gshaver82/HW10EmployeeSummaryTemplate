// // TODO: Write code to define and export the Employee class
// function Employee (name, id, email){
//     this.name = name;
//     Employee.prototype.getName = function(text){
//         return this.name;
//     }
// }

class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = parseInt(id);
        this.email = email;
        this.role = "Employee";
       }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return this.role;
    }
}


module.exports = Employee;