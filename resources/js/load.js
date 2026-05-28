import { currentPage } from './stan';
import { renderPagination } from './pagination';

export function loadUsers() {
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