/* This file connects to the API I made using fetch */

const form = document.querySelector("form") 

/* This event listener fires off if you click the submit button */
form.addEventListener("submit", e => {

    const fname = document.getElementById("fname");         // Connecting the input for first name 
    const lname = document.getElementById("lname");         // Connecting the input for last name
    const age = document.getElementById("age");             // Connecting the input for age
    const data = {
        firstName: fname.value,
        lastName: lname.value,
        age: age.value
    }

    e.preventDefault();             // PreventDefault behaviour of submit button

    fetch("https://useruseruseruser.herokuapp.com/users", {      //  Fetch the api, using the method POST.
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)                       // Stringify the data
    })
    .then(() => {
        showUsers();
    })
});

/* This function shows us the users that are stored */
const showUsers = () => {

    document.getElementById("allUsers").innerHTML = "";

    fetch("https://useruseruseruser.herokuapp.com/users") 
    .then(j => j.json())
    .then(users => {
        console.log(users);
        users.forEach((user) => {
        document.getElementById("allUsers").innerHTML +=
        `
        <div class="user">
            <h3>First Name:<span class="spanner" contentEditable = "true" > ${user.firstName}</span></h3>
            <h3>Last Name:<span class="spanner" contentEditable = "true" > ${user.lastName}</span></h3>
            <h3>Age:<span class="spanner" contentEditable = "true" > ${user.age}</span></h3>
            <button onclick="deleteUser('${user.id}');">Delete User</button>
            <button onclick="updateUser('${user.id}', this);">Save</button>
        </div>
        `
        })
    })
}

/* This function deletes a user using its id */
const deleteUser = (id) => {
    fetch(`https://useruseruseruser.herokuapp.com/users/${id}`, {
        method:"DELETE"
    })
    .then(() => {
        showUsers(); // After delete, we want to show the users that are left ( so we dont have to refresh after deleting every time.)
    })
}

/* This function updates users information after clicking the save button */
const updateUser = (id, b) => {

    const spans = b.parentNode.querySelectorAll("span");

    const data = {
        firstName: spans[0].innerHTML,
        lastName: spans[1].innerHTML,
        age: spans[2].innerHTML
    }

    fetch(`https://useruseruseruser.herokuapp.com/users/${id}`, {
        method:"PATCH",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    .then(() => {
        showUsers();
    })
    
}

showUsers();