const form = document.querySelector("form")

form.addEventListener("submit", e => {

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const age = document.getElementById("age");
    const data = {
        firstName: fname.value,
        lastName: lname.value,
        age: age.value
    }
    e.preventDefault();
    fetch("https://useruseruseruser.herokuapp.com/users", {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(() => {
        showUsers();
    })
});

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

const deleteUser = (id) => {
    fetch(`https://useruseruseruser.herokuapp.com/users/${id}`, {
        method:"DELETE"
    })
    .then(() => {
        showUsers();
    })
}

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