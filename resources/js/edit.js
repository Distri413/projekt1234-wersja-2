import { setCurrentEditId } from './state';

window.editUser = function(id, name, surname, email) {
    setCurrentEditId(id);

    document.getElementById('name').value = name;
    document.getElementById('surname').value = surname;
    document.getElementById('email').value = email;

    const submitBtn = document.querySelector("form button[type='submit']");
    submitBtn.innerText = "Zapisz zmiany";
}
