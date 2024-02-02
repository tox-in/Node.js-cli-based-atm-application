const inquirer = require('inquirer');
const { faker } = require('@faker-js/faker');

// Requirement
// 1 users data = done
// 2 atm machine = done
// 3 atm function 

// Interface for User
const createUser = () => {
    let users = [];

    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 900000000),
            balance: 1000000 * 1
        };

        users.push(user);
    }

    return users;
};

// ATM machine function
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "Write pin code",
        name: "pin"
    });

    const user = users.find(val => val.pin === res.pin);

    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
        return;
    }

    console.log("Invalid user pin");
};

// ATM functions
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        choices: ["withdraw", "balance", "exit", "deposite"]
    });

    console.log(ans);
};

// Create users
const users = createUser();

// Run ATM machine
atmMachine(users);
