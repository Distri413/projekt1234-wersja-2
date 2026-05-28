import { currentEditId, setCurrentEditId } from './stan';
import { loadUsers } from './load';

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
        setCurrentEditId(null);
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