//const API = "/api/users";

let currentEditId = null; 
let currentPage = 1;

function loadUsers() {
    fetch(`/api/users?page=${currentPage}`)
        .then(res => res.json())
        .then(response => {
            const tbody = document.querySelector("table tbody");
            tbody.innerHTML = "";

            const users = response.data;

            users.forEach(user => {
                const tr = document.createElement("tr");
                tr.innerHTML += `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.surname ?? ''}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="editUser(${user.id}, '${user.name}', '${user.surname ?? ''}', '${user.email}')" class="delete-btn">Edytuj</button></td>
                        <td>
                            <button onclick="deleteUser(${user.id})" class="delete-btn">Usuń</button>
                        </td>
                `;
                tbody.appendChild(tr);
            });
            renderPagination(response);
        })
        .catch(err => console.log("Błąd API:", err));
}

function renderPagination(paginationData) {
    const container = document.getElementById("pagination-container");
    container.innerHTML = ""; 

    if (paginationData.last_page <= 1) return;

    if (paginationData.current_page > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.innerText = "« Poprzednia";
        prevBtn.className = "page-btn page-nav-btn";
        prevBtn.onclick = () => {
            currentPage--;
            loadUsers();
        };
        container.appendChild(prevBtn);
    }

    for (let i = 1; i <= paginationData.last_page; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.innerText = i;
        pageBtn.className = "page-btn";
        
        if (i === paginationData.current_page) {
            pageBtn.classList.add("active");
        }

        pageBtn.onclick = () => {
            currentPage = i;
            loadUsers();
        };
        container.appendChild(pageBtn);
    }

    if (paginationData.current_page < paginationData.last_page) {
        const nextBtn = document.createElement("button");
        nextBtn.innerText = "Następna »";
        nextBtn.className = "page-btn page-nav-btn";
        nextBtn.onclick = () => {
            currentPage++;
            loadUsers();
        };
        container.appendChild(nextBtn);
    }
}

window.editUser = function(id, name, surname, email) {
    currentEditId = id;

    document.getElementById('name').value = name;
    document.getElementById('surname').value = surname;
    document.getElementById('email').value = email;

    const submitBtn = document.querySelector("form button[type='submit']");
    submitBtn.innerText = "Zapisz zmiany";
}

window.deleteUser = function(id) {
    fetch(`/api/users/${id}`, {
        method: "DELETE"
    })
    .then(() => loadUsers())
    .then(() => {
        setTimeout(checkEmptyPage, 200);
    });
}

function checkEmptyPage() {
    const rows = document.querySelectorAll("#usersTable tr");
    if (rows.length === 0 && currentPage > 1) {
        currentPage--;
        loadUsers();
    }
}

window.addUser = function (e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const userData = {
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value
    };

    let url = "/api/users";
    let method = "POST";

    if (currentEditId !== null) {
        url = `/api/users/${currentEditId}`;
        method = "PUT"; 
    } else {
        userData.password = passwordInput.value;
    }

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(res => {
        if (!res.ok) return res.json().then(err => { throw err; });
        return res.json();
    })
    .then(data => {
        currentEditId = null;
        document.querySelector("form button[type='submit']").innerText = "Dodaj";

        nameInput.value = "";
        surnameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        loadUsers(); 
    })
    .catch(err => {
        console.error("Błąd:", err);
        if(err.errors){
            let errorMess = Object.values(err.errors).flat().join("\n");
            alert("Niepoprawne dane:\n"+ errorMess);
        }else if(err.message){
            alert("Błąd: "+err.message);
        }else{
            alert("Wystąpił nieznany blad");
        }
    });
}

loadUsers();