import { loadUsers } from './load';
import { renderPagination } from './pagination';
import './add';
import './delete';
import './edit';

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
});
