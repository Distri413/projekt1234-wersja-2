import { currentPage, setCurrentPage } from './stan';
import { loadUsers } from './load';

window.deleteUser = async function(id) {

    await fetch(`/api/users/${id}`, {
        method: "DELETE"
    });

    const res = await fetch(`/api/users?page=${currentPage}`);
    const data = await res.json();

    if (data.data.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);;
    }

    loadUsers();
}