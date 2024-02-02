import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';

//requirement
//1 users data = done
//2 atm machine = done
//3 atm function 

interface User {
    id:number
    pin:number
    name:string
    accountNumber:number
    balance:number
}

const createUser =()=>{
    let users:User[] = []

    for(let i=0; i<5; i++){
        let user:User = {
            id : i,
            pin:1000 + i,
            name:faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random()*900000000),
            balance: 1000000 *1
        }

        users.push(user)
    }

    return users
};

//atm machine
const atmMachine = async(users:User[])=>{
    const res = await inquirer.prompt({
        type:"number",
        message:"write pin code",
        name:"pin"
    })

    const user = users.find(val => val.pin == res.pin)

    if(user){
        console.log(`welcome ${user.name}`);
        atmFunc(user)
        return;
    }
    console.log("Invalid user pin");  
};

//atm function

const atmFunc = async(user:User) => {
    const ans  = await inquirer.prompt({
        type:"list",
        name:"select",
        message:"the answer...",
        choices:["withdraw","balance","deposit","exit"]
    })
    if(ans.select == "withdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            message: "enter amount.",
            name:"dollars"
        })

        if(amount.dollars > user.balance){
            return console.log("you have an amount to withdraw...");
            
        }
        
        console.log(`Withdraw amount: ${amount.dollars}`);
        console.log(`Balance: ${user.balance-amount.dollars}`);
        
        
    }
    if(ans.select == "balance"){
        console.log(`Balance: ${user.balance}`);
    }
    if(ans.select == "deposit"){
        const deposit = await inquirer.prompt({
            type:"number",
            message: "enter amount.",
            name:"dollars"
        })

        if(deposit.dollars > 25000){
            return console.log("you have are depositing less money today...");
            
        }
        
        console.log(`Deposited amount: ${deposit.dollars}`);
        console.log(`Existing balance: ${user.balance}`)
        console.log(`Balance: ${user.balance-deposit.dollars}`);
        
    }
    if(ans.select == "exit"){
        console.log(`thanks for using atm services`);
        
    }
    
}

const users = createUser();

atmMachine(users)
