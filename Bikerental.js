const input = require("readline-sync");
const fs = require("fs");
let validadtion_email = {}
let validation_password = {}
let validation_Phonenumber = {}
let name_validation = {}



function name() {
    while (true) {
        let Name = input.question("Enter Your Name:->");
        if (Name.length >= 1) {
            name_validation["Name"] = Name;
            break
        }
        else {
            console.log("Your name is empty")

        }

    }
}


function valid_Phonenumber() {
    while (true) {
        let Phonenumber = input.question("Enter Your Phonenumber:->");
        if (Phonenumber.length === 10) {
            if (
                "0123456789".split('').some(digit => Phonenumber.includes(digit))
            ) {
                validation_Phonenumber["Phonenumber"] = Phonenumber;
                break;
            } else {
                console.log("Phone number is not valid");
            }
        } else {
            console.log("Your Phone number digit is not enough");
        }
    }
}


function valid_password() {
    while (true) {
        let Password = input.question("Enter Your Password:->");
        if (
            Password.split('').some(char => char.toUpperCase() !== char.toLowerCase()) &&
            Password.split('').some(char => char.toUpperCase() === char) &&
            Password.split('').some(char => char.toLowerCase() === char) &&
            Password.split('').some(char => !isNaN(char)) &&
            Password.split('').some(char => "~!@#$%^&*_".includes(char))
        ) {
            validation_password["Password"] = Password;
            break;
        } else {
            console.log("Your password is not correct");
        }
    }
}


function validateEmail() {
    while (true) {
        let email = input.question("Enter Your Email:->");
        let flag = 0;
        let flag1 = 0;
        let flag2 = 0;
        if (email.length >= 6) {
            if (email[0].match(/[a-zA-Z]/)) {
                if (email.includes('@') && email.split('@').length === 2) {
                    const lastPart = email.split('@')[1];
                    const dotIndex = lastPart.lastIndexOf('.');
                    if (dotIndex !== -1 && lastPart.slice(dotIndex + 1).length > 0) {
                        for (let i of email) {
                            if (i === ' ') {
                                flag = 1;
                            } else if (i.match(/[a-zA-Z]/)) {
                                if (i === i.toUpperCase()) {
                                    flag1 = 1;
                                }
                            } else if (!isNaN(i)) {
                                continue;
                            } else if (['_', '.', '@'].includes(i)) {
                                continue;
                            } else {
                                flag2 = 1;
                            }
                        }

                        if (flag === 1) {
                            console.log("Space is present in your email.");
                        } else if (flag1 === 1) {
                            email.toLowerCase()
                            console.log("Uppercase letters are present in your email.");
                        } else if (flag2 === 1) {
                            console.log("Wrong characters present in your email.");
                        } else {
                            validadtion_email["email"] = email;
                            break;
                        }
                    } else {
                        console.log("Dot (.) is not present in the last part of your email.");
                    }
                } else {
                    console.log("Not present '@' in your email.");
                }
            } else {
                console.log("Your first letter is not an alphabet.");
            }
        } else {
            console.log("Wrong email length is less.");
        }
    }
}



function deleteRentData(userEmail) {
    if (main_rent[userEmail]) {
        delete main_rent[userEmail];
        const rentData = JSON.stringify(main_rent, null, 4);
        fs.writeFileSync(file_rent, rentData);
    } else {
        console.log(`Rent data's ${userEmail} not found`);
    }
}



function addUser(userEmail, account, Phonenumber) {
    if (!main_data[userEmail]) {
        const isPhoneNumberTaken = Object.values(main_data).some(
            existingAccount => existingAccount.Phonenumber === Phonenumber
        );

        if (!isPhoneNumberTaken) {
            main_data[userEmail] = { ...account, Phonenumber };
            const fileData = JSON.stringify(main_data, null, 4);

            fs.writeFileSync(file_main, fileData);

            console.log(`User account signup successfully`);
        } else {
            console.log(`Phone number is already associated with another account`);
        }
    } else {
        console.log(`User account already exists`);
    }
}



function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

function addPrice(bikeprice, userEmail) {
    if (!main_rent[userEmail]) {
        main_rent[userEmail] = bikeprice;
        const rent_data = JSON.stringify(main_rent, null, 4);
        fs.writeFileSync(file_rent, rent_data);
    } else {
        const newUserId = generateUniqueId();
        const newUserEmail = `${userEmail}-${newUserId}`;

        main_rent[newUserEmail] = bikeprice;
        const rent_data = JSON.stringify(main_rent, null, 4);
        fs.writeFileSync(file_rent, rent_data);
    }
}



function Payamount(balance) {
    while (true) {
        let PayBalane = input.question("Pay for the rent :->");
        if (PayBalane > 0 && PayBalane == balance) {
            console.log("Thanks for paying the rent");
            break
        }
        else if (PayBalane > 0 && PayBalane > balance) {
            console.log(`Your remaining balance is ${PayBalane - balance}`);
            break;
        }
        else if (PayBalane > 0 && PayBalane < balance) {
            console.log(`pay rest of money ${balance - PayBalane}`);
            let remaining_amount = balance - PayBalane
            while (true) {
                let payamount = input.question("Pay for the remaining rent:->");
                if (payamount > 0 && payamount == remaining_amount) {
                    console.log("Thanks for paying remaining rent");
                    break;
                }
                else if (payamount > 0 && payamount > remaining_amount) {
                    console.log(`Your remaining balance is ${payamount - remaining_amount}`)
                    break;
                }
                else if (payamount > 0 && payamount < remaining_amount) {
                    console.log("Pay complete money");
                }
                else {
                    console.log("Please give me positive amount ")
                }
            }
            break;
        }
        else {
            console.log("Please give me positive amount");
        }
    }
}


function Pay_Amount_all(days, price, bike, chooseemail) {
    if (main_list.length == 1) {
        const balance = bike * days * price;
        console.log(`Your total rent balance is :->$${balance}`);
        let User1Email = main_list[0]
        main_list.splice(0, main_list.length)
        let Emails = main_rent[User1Email];
        const keys = Object.keys(Emails);
        for (let bike1 of keys) {
            console.log(`You spent on ${bike1} for ${days} days`);
            console.log(`You had ${bike}  ${bike1}  for rent`);
            console.log(`One ${bike1} rent :-> ${price}`);
            break;
        }
        Payamount(balance);
        deleteRentData(User1Email);
    }
    else {
        const balance = bike * days * price;
        console.log(`Your total rent balance is :->$${balance}`);
        let Emails = main_rent[chooseemail]
        const keys = Object.keys(Emails);
        main_list.splice(0, main_list.length);
        for (let bike1 of keys) {
            console.log(`You spent on ${bike1} for ${days} days`);
            console.log(`You had ${bike}  ${bike1}  for rent`);
            console.log(`One ${bike1} rent :-> ${price}`);
            break;
        }
        Payamount(balance);
        deleteRentData(chooseemail);
    }

}




function bikerent(bike, price, Past_year, Past_month, Past_date, main_month_day, chooseemail) {
    let main_date = new Date()
    let Year = main_date.getFullYear();
    let Month = main_date.getMonth();
    let date3 = main_date.getDate();
    let Present_month_days = main_month_day[Past_month];
    if (Year == Past_year) {
        if (Month == Past_month) {
            if (Past_date == date3) {
                let days = 1;
                Pay_Amount_all(days, price, bike, chooseemail);
            }
            else {
                let days = date3 - Past_date;
                Pay_Amount_all(days, price, bike, chooseemail);
            }
        }
        else {
            let remaining_Past_month_day = Present_month_days - Past_date;
            let start = Past_month + 1
            let stop = Month;
            let count_day = 0
            while (start < stop) {
                count_day += main_month_day[start]
                start += 1
            }
            let total_days = remaining_Past_month_day + date3 + count_day;
            Pay_Amount_all(total_days, price, bike, chooseemail)
        }
    }
    else {
        let remaining_past_year_Past_month_day = Present_month_days - Past_date;
        let start = Past_month + 1;
        let count_Past_year_day = 0;
        while (start <= 11) {
            count_Past_year_day += main_month_day[start]
            start += 1
        }
        let present_year_present_month = Month;
        let i = 0;
        let count_present_year_day = 0;
        while (i < present_year_present_month) {
            count_present_year_day += main_month_day[i]
            i += 1
        }
        let all_days = remaining_past_year_Past_month_day + date3 + count_Past_year_day + count_present_year_day;
        Pay_Amount_all(all_days, price, bike, chooseemail);
    }
}


console.log("Welcome TO Bike Rent")
let main_data = {}
let main_rent = {}
const file_main = "main_data.json";
const file_rent = "rent_data.json";
const main_list = [];
const Owner_file = "owner_data.json"
let ownersData = {};
const owners = {
    "mohit22@navgurukul.org": {
        Password: "Na82997@"
    }
}



function displaySimilarEmails(startingChars) {
    for (const UserEmail in main_rent) {
        if (UserEmail.startsWith(startingChars)) {
            main_list.push(UserEmail);
        }
    }
}



if (fs.existsSync(file_main)) {
    const fileData = fs.readFileSync(file_main, 'utf8');
    main_data = JSON.parse(fileData);
} else {
    const jsonData = JSON.stringify(main_data, null, 5);
    fs.writeFileSync(file_main, jsonData);
    const fileData = fs.readFileSync(file_main, 'utf8');
    main_data = JSON.parse(fileData);
}


if (fs.existsSync(file_rent)) {
    const rentData = fs.readFileSync(file_rent, 'utf8');
    main_rent = JSON.parse(rentData);
} else {
    const jsonData = JSON.stringify(main_rent, null, 5);
    fs.writeFileSync(file_rent, jsonData);
    const fileData = fs.readFileSync(file_rent, 'utf8');
    main_rent = JSON.parse(fileData);
}



function main_data_display() {
    displaySimilarEmails(UserEmail);
    if (main_list.length == 1) {
        let User1Email = main_list[0]
        let Bike = 0;
        for (let vehicle in main_rent[User1Email]) {
            Bike += Number(main_rent[User1Email][vehicle])
            break;
        }
        let main_month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let Price = main_rent[User1Email].price;
        let dateString = main_rent[User1Email].date
        var dateComponents = dateString.split("/");
        var Past_date = parseInt(dateComponents[0], 10);
        var Past_month = parseInt(dateComponents[1], 10);
        var Past_year = parseInt(dateComponents[2], 10);
        bikerent(Bike, Price, Past_year, Past_month, Past_date, main_month_day);
    }
    else if (main_list.length > 0) {
        console.log(`You have ${main_list.length} Bikerental data of ${main_data[UserEmail].Name}`);
        for (let m of main_list) {
            console.log(m)
        }
        var chooseemail = input.question("Choose Your Email :->");
        if (main_rent[chooseemail]) {
            let Bike = 0;
            for (let vehicle in main_rent[chooseemail]) {
                Bike += Number(main_rent[chooseemail][vehicle])
                break;
            }
            let main_month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            let Price = main_rent[chooseemail].price;
            let dateString = main_rent[chooseemail].date
            var dateComponents = dateString.split("/");
            var Past_date = parseInt(dateComponents[0], 10);
            var Past_month = parseInt(dateComponents[1], 10);
            var Past_year = parseInt(dateComponents[2], 10);
            bikerent(Bike, Price, Past_year, Past_month, Past_date, main_month_day, chooseemail);
        }
        else {
            console.log(`Your your email ${chooseemail} is not found`)
        }
    }
    else {
        console.log("You have not any vehicle for rent")
    }
}






function check_bike(userEmail) {
    console.log("You have Bike\n1:->YES\n2:->No");
    while (true) {
        let choose2 = input.question("Choose Your Option:->");
        if (choose2 === "1") {
            console.log("You have no any vehicle for rent")
            break;
        }
        else if (choose2 === "2") {
            while (true) {
                console.log("Which type of Vehicle do you want for rent\n1:-Bike\n2:-Car\n3:-break");
                let option = input.question("Choose Your Option:->");
                if (option === "1") {
                    while (true) {
                        console.log("1:->Normal\n2:->Super\n3:->Activa");
                        let select = input.question("Select Your Option:->");
                        if (select === "1") {
                            let check_email = String(Object.keys(ownersData))
                            let Normal_bikes = ownersData[check_email].bikes.Normal
                            let price = 400;
                            console.log(`Remainig Normal bikes:->${Normal_bikes}`);
                            console.log(`One Normal bike price :->${price}`);
                            const normal_bike = input.question("How many Normal bike do you want? :->");
                            if (normal_bike > 0 && normal_bike <= Normal_bikes) {
                                let rest_money = Normal_bikes - normal_bike
                                remove_bike("Normal", rest_money)
                                const Main_date = new Date()
                                const Month = Main_date.getMonth()
                                const date1 = Main_date.getDate()
                                const year = Main_date.getFullYear();
                                let date = " "
                                date += date1 + "/" + Month + "/" + year
                                var bikeprice = { normal_bike, date, price }
                                let email = [userEmail]
                                addPrice(bikeprice, email);
                                break;
                            }
                            else {
                                console.log("I have not more Normal bikes fore rent")
                            }

                        }
                        else if (select === "2") {
                            let check_email = String(Object.keys(ownersData))
                            let Super_bikes = ownersData[check_email].bikes.Super
                            let price = 600;
                            console.log(`Remainig Super bikes:->${Super_bikes}`);
                            console.log(`One Super bike price :->${price}`);
                            const super_bike = input.question("How many Super bike do you want? :->");
                            if (super_bike > 0 && super_bike <= Super_bikes) {
                                let rest_money = Super_bikes - super_bike
                                remove_bike("Super", rest_money)
                                const Main_date = new Date()
                                const Month = Main_date.getMonth()
                                const date1 = Main_date.getDate()
                                const year = Main_date.getFullYear();
                                let date = " "
                                date += date1 + "/" + Month + "/" + year
                                var bikeprice = { super_bike, date, price }
                                let email = [userEmail]
                                addPrice(bikeprice, email);
                                break;
                            }
                            else {
                                console.log("I have not more super bikes fore rent")
                            }

                        }
                        else if (select === "3") {
                            let check_email = String(Object.keys(ownersData))
                            let Activa_bikes = ownersData[check_email].bikes.Activa
                            let price = 700;
                            console.log(`Remainig Activa bikes:->${Activa_bikes}`);
                            console.log(`One Activa bike price :->${price}`);
                            const activa_bike = input.question("How many Activa bike do you want? :->");
                            if (activa_bike > 0 && activa_bike <= Activa_bikes) {
                                let rest_money = Activa_bikes - activa_bike;
                                remove_bike("Activa", rest_money);
                                const Main_date = new Date();
                                const Month = Main_date.getMonth();
                                const date1 = Main_date.getDate();
                                const year = Main_date.getFullYear();
                                let date = " ";
                                date += date1 + "/" + Month + "/" + year;
                                var bikeprice = { activa_bike, date, price };
                                let email = [userEmail];
                                addPrice(bikeprice, email);
                                break;
                            }
                            else {
                                console.log("I have not more Activa bikes fore rent");
                            }
                        }
                        else {
                            console.log("select the given option");
                        }
                    }
                }
                else if (option == "2") {
                    while (true) {
                        console.log("1:->Normal\n2:->Super");
                        let select = input.question("Select Your Option:->");
                        if (select === "1") {
                            let check_email = String(Object.keys(ownersData));
                            let Normal_cars = ownersData[check_email].cars.Normal;
                            let price = 2000;
                            console.log(`Remainig Normal cars:->${Normal_cars}`);
                            console.log(`One Normal car price :->${price}`);
                            const normal_car = input.question("How many Normal car do you want? :->");
                            if (normal_car > 0 && normal_car <= Normal_cars) {
                                let rest_money = Normal_cars - normal_car
                                remove_car("Normal", rest_money)
                                const Main_date = new Date()
                                const Month = Main_date.getMonth()
                                const date1 = Main_date.getDate()
                                const year = Main_date.getFullYear();
                                let date = " "
                                date += date1 + "/" + Month + "/" + year
                                var bikeprice = { normal_car, date, price }
                                let email = [userEmail]
                                addPrice(bikeprice, email);
                                break;
                            }
                            else {
                                console.log("I have not more Normal_car fore rent")
                            }

                        }
                        else if (select === "2") {
                            let check_email = String(Object.keys(ownersData))
                            let Super_cars = ownersData[check_email].cars.Super
                            let price = 4000;
                            console.log(`Remainig Normal cars:->${Super_cars}`);
                            console.log(`One Normal car price :->${price}`);
                            const super_car = input.question("How many Normal car do you want? :->");
                            if (super_car > 0 && super_car <= Super_cars) {
                                let rest_money = Super_cars - super_car
                                remove_car("Super", rest_money);
                                const Main_date = new Date();
                                const Month = Main_date.getMonth();
                                const date1 = Main_date.getDate()
                                const year = Main_date.getFullYear();
                                let date = " ";
                                date += date1 + "/" + Month + "/" + year;
                                var bikeprice = { super_car, date, price }
                                let email = [userEmail]
                                addPrice(bikeprice, email);
                                break;
                            }
                            else {
                                console.log("I have not more Supers_cars fore rent")
                            }

                        }


                    }
                }
                else if (option == "3") {
                    break;
                }
                else {
                    console.log("Please choose in given option");
                }
            }
            break;
        }
        else {
            console.log("Choose only given option")
        }
    }
}

function ownerLogin() {
    while (true) {
        var ownerEmail = input.question("Enter owner email:-> ");
        if (owners[ownerEmail]) {
            while (true) {
                var ownerPassword = input.question("Enter owner password:-> ");
                if (owners[ownerEmail].Password === ownerPassword) {
                    console.log(`Owner ${ownerEmail} logged in successfully.`);
                    break;
                }
                else {
                    console.log("Invalid Owner Password")
                }
            }
            break
        } else {
            console.log("Invalid owner email");
        }
    }
}



function initializeOwner(ownerEmail, passowner) {
    if (!ownersData[ownerEmail]) {
        ownersData[ownerEmail] = {
            password: passowner,
            bikes: {},
            cars: {},
        };
    }
}

function loadOwnersData() {
    if (fs.existsSync(Owner_file)) {
        const fileData = fs.readFileSync(Owner_file, "utf8");
        ownersData = JSON.parse(fileData);
    }
}

function saveOwnersData() {
    const jsonData = JSON.stringify(ownersData, null, 4);
    fs.writeFileSync(Owner_file, jsonData);
}






function addBike(type, quantity) {
    let emailowner = String(Object.keys(owners))
    let passowner = owners[emailowner].Password
    initializeOwner(emailowner, passowner);
    if (!ownersData[emailowner].bikes[type]) {
        ownersData[emailowner].bikes[type] = 0;

    }
    ownersData[emailowner].bikes[type] += Number(quantity);
    saveOwnersData();
}

function remove_bike(type, quantity) {
    let emailowner = String(Object.keys(owners))
    ownersData[emailowner].bikes[type] = Number(quantity);
    saveOwnersData();
}

function addCar(type, quantity) {
    let emailowner = String(Object.keys(owners))
    let passowner = owners[emailowner].Password
    initializeOwner(emailowner, passowner);
    if (!ownersData[emailowner].cars[type]) {
        ownersData[emailowner].cars[type] = 0;
    }
    ownersData[emailowner].cars[type] += Number(quantity);
    saveOwnersData();
}


function remove_car(type, quantity) {
    let emailowner = String(Object.keys(owners))
    ownersData[emailowner].cars[type] = Number(quantity);
    saveOwnersData();
}



loadOwnersData();
console.log("1:->Login\n2:->Signup\n3:->Owner login");
while (true) {
    const choose1 = input.question("Choose Your Option:->");
    if (choose1 === "1") {
        while (true) {
            var UserEmail = input.question("Enter Your Email:->");
            if (main_data[UserEmail] && main_data[UserEmail].Name) {
                while (true) {
                    let password = input.question("Enter Your Password:->");
                    if (main_data[UserEmail].Password == password) {
                        console.log(`Hello, ${main_data[UserEmail].Name}`);
                        console.log("You have Bike\n1:->YES\n2:->No");
                        while (true) {
                            let choose2 = input.question("Choose Your Option:->");
                            if (choose2 === "1") {
                                main_data_display()
                                break;
                            }
                            else if (choose2 === "2") {
                                while (true) {
                                    console.log("Which type of Vehicle do you want for rent\n1:-Bike\n2:-Car\n3:-break");
                                    let option = input.question("Choose Your Option:->");
                                    if (option === "1") {
                                        while (true) {
                                            console.log("1:->Normal\n2:->Super\n3:->Activa");
                                            let select = input.question("Select Your Option:->");
                                            if (select === "1") {
                                                let check_email = String(Object.keys(ownersData))
                                                let Normal_bikes = ownersData[check_email].bikes.Normal
                                                let price = 400;
                                                console.log(`Remainig Normal bikes:->${Normal_bikes}`);
                                                console.log(`One Normal bike price :->${price}`);
                                                const normal_bike = input.question("How many Normal bike do you want? :->");
                                                if (normal_bike > 0 && normal_bike <= Normal_bikes) {
                                                    let rest_money = Normal_bikes - normal_bike
                                                    remove_bike("Normal", rest_money)
                                                    const Main_date = new Date()
                                                    const Month = Main_date.getMonth()
                                                    const date1 = Main_date.getDate()
                                                    const year = Main_date.getFullYear();
                                                    let date = " "
                                                    date += date1 + "/" + Month + "/" + year
                                                    var bikeprice = { normal_bike, date, price }
                                                    let email = [UserEmail]
                                                    addPrice(bikeprice, email);
                                                    break;
                                                }
                                                else {
                                                    console.log("I have not more Normal bikes fore rent")
                                                }

                                            }
                                            else if (select === "2") {
                                                let check_email = String(Object.keys(ownersData))
                                                let Super_bikes = ownersData[check_email].bikes.Super
                                                let price = 600;
                                                console.log(`Remainig Super bikes:->${Super_bikes}`);
                                                console.log(`One Super bike price :->${price}`);
                                                const super_bike = input.question("How many Super bike do you want? :->");
                                                if (super_bike > 0 && super_bike <= Super_bikes) {
                                                    let rest_money = Super_bikes - super_bike
                                                    remove_bike("Super", rest_money)
                                                    const Main_date = new Date()
                                                    const Month = Main_date.getMonth()
                                                    const date1 = Main_date.getDate()
                                                    const year = Main_date.getFullYear();
                                                    let date = " "
                                                    date += date1 + "/" + Month + "/" + year
                                                    var bikeprice = { super_bike, date, price }
                                                    let email = [UserEmail]
                                                    addPrice(bikeprice, email);
                                                    break;
                                                }
                                                else {
                                                    console.log("I have not more super bikes fore rent")
                                                }

                                            }
                                            else if (select === "3") {
                                                let check_email = String(Object.keys(ownersData))
                                                let Activa_bikes = ownersData[check_email].bikes.Activa
                                                let price = 700;
                                                console.log(`Remainig Activa bikes:->${Activa_bikes}`);
                                                console.log(`One Activa bike price :->${price}`);
                                                const activa_bike = input.question("How many Activa bike do you want? :->");
                                                if (activa_bike > 0 && activa_bike <= Activa_bikes) {
                                                    let rest_money = Activa_bikes - activa_bike;
                                                    remove_bike("Activa", rest_money);
                                                    const Main_date = new Date();
                                                    const Month = Main_date.getMonth();
                                                    const date1 = Main_date.getDate();
                                                    const year = Main_date.getFullYear();
                                                    let date = " ";
                                                    date += date1 + "/" + Month + "/" + year;
                                                    var bikeprice = { activa_bike, date, price };
                                                    let email = [UserEmail];
                                                    addPrice(bikeprice, email);
                                                    break;
                                                }
                                                else {
                                                    console.log("I have not more Activa bikes fore rent");
                                                }
                                            }
                                            else {
                                                console.log("select the given option");
                                            }
                                        }
                                    }
                                    else if (option == "2") {
                                        while (true) {
                                            console.log("1:->Normal\n2:->Super");
                                            let select = input.question("Select Your Option:->");
                                            if (select === "1") {
                                                let check_email = String(Object.keys(ownersData));
                                                let Normal_cars = ownersData[check_email].cars.Normal;
                                                let price = 2000;
                                                console.log(`Remainig Normal cars:->${Normal_cars}`);
                                                console.log(`One Normal car price :->${price}`);
                                                const normal_car = input.question("How many Normal car do you want? :->");
                                                if (normal_car > 0 && normal_car <= Normal_cars) {
                                                    let rest_money = Normal_cars - normal_car
                                                    remove_car("Normal", rest_money)
                                                    const Main_date = new Date()
                                                    const Month = Main_date.getMonth()
                                                    const date1 = Main_date.getDate()
                                                    const year = Main_date.getFullYear();
                                                    let date = " "
                                                    date += date1 + "/" + Month + "/" + year
                                                    var bikeprice = { normal_car, date, price }
                                                    let email = [UserEmail]
                                                    addPrice(bikeprice, email);
                                                    break;
                                                }
                                                else {
                                                    console.log("I have not more Normal_car fore rent")
                                                }

                                            }
                                            else if (select === "2") {
                                                let check_email = String(Object.keys(ownersData))
                                                let Super_cars = ownersData[check_email].cars.Super
                                                let price = 4000;
                                                console.log(`Remainig Normal cars:->${Super_cars}`);
                                                console.log(`One Normal car price :->${price}`);
                                                const super_car = input.question("How many Normal car do you want? :->");
                                                if (super_car > 0 && super_car <= Super_cars) {
                                                    let rest_money = Super_cars - super_car
                                                    remove_car("Super", rest_money);
                                                    const Main_date = new Date();
                                                    const Month = Main_date.getMonth();
                                                    const date1 = Main_date.getDate()
                                                    const year = Main_date.getFullYear();
                                                    let date = " ";
                                                    date += date1 + "/" + Month + "/" + year;
                                                    var bikeprice = { super_car, date, price }
                                                    let email = [UserEmail]
                                                    addPrice(bikeprice, email);
                                                    break;
                                                }
                                                else {
                                                    console.log("I have not more Supers_cars fore rent")
                                                }

                                            }


                                        }
                                    }
                                    else if (option == "3") {
                                        main_data_display();
                                        break;
                                    }
                                    else {
                                        console.log("Please choose in given option");
                                    }
                                }
                                break;
                            }
                            else {
                                console.log("Choose only given option")
                            }
                        }
                        break;
                    }
                    else {
                        console.log("User Password is not correct")
                    }
                }
                break;
            }
            else {
                console.log("Your Email is Invalid")
            }
        }
        break
    }
    else if (choose1 === "2") {
        console.log("create new account");
        name();
        validateEmail();
        valid_password();
        valid_Phonenumber();
        const account = { Name: name_validation.Name, Password: validation_password.Password, Phonenumber: validation_Phonenumber.Phonenumber }
        const userEmail = [validadtion_email.email];
        const Phonenumber = validation_Phonenumber.Phonenumber
        delete validadtion_email.email;
        delete validation_password.Password
        delete validation_Phonenumber.Phonenumber;
        delete name_validation.Name
        addUser(userEmail, account, Phonenumber);
        check_bike(userEmail)
        break;
    }
    else if (choose1 === "3") {
        ownerLogin();
        while (true) {
            console.log("1:->Add Bike\n2:->Add Car\n3:->Display Customer List\n4:->Logout");
            const ownerOption = input.question("Choose Your Option:->");
            if (ownerOption === "1") {
                console.log("Bike Types\n1:-> Normal\n2:->Super\n3:->Activa");
                while (true) {
                    const bikeType = input.question("Choose Bike Type:->");
                    if (bikeType === "1") {
                        const quantityBike = input.question("Enter Quantity:->");
                        addBike("Normal", quantityBike);
                        break
                    }
                    else if (bikeType === "2") {
                        const quantityBike = input.question("Enter Quantity:->");
                        addBike("Super", quantityBike);
                        break
                    }
                    else if (bikeType === "3") {
                        const quantityBike = input.question("Enter Quantity:->");
                        addBike("Activa", quantityBike);
                        break
                    }
                    else {
                        console.log("Choose the given option")
                    }
                }
            } else if (ownerOption === "2") {
                console.log("Car Types\n1:-> Normal\n2:-> Super");
                while (true) {
                    const carType = input.question("Choose Car Type:->");
                    if (carType === "1") {
                        const quantityCar = input.question("Enter Quantity:->");
                        addCar("Normal", quantityCar);
                        break
                    }
                    else if (carType === "2") {
                        const quantityCar = input.question("Enter Quantity:->");
                        addCar("Super", quantityCar);
                        break
                    }
                    else {
                        console.log("Choose the given option")
                    }
                }
            } else if (ownerOption === "3") {
                console.log(main_rent)
                break;
            } else if (ownerOption === "4") {
                console.log("Owner logout successful!");
                break;
            } else {
                console.log("Invalid option. Please choose a valid option.");
            }
        }
        break
    }
    else {
        console.log("Choose only given option");
    }
}