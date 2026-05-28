import { currentPage, setCurrentPage } from './state';
import { loadUsers } from './load';

export function renderPagination(paginationData) {
    const next = paginationData.current_page + 1;
    const prev = paginationData.current_page - 1;

    const container = document.getElementById("pagination-container");
    container.innerHTML = ""; 

    if (paginationData.last_page <= 1) return;

    if (paginationData.current_page > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.innerText = "<< Poprzednia";
        prevBtn.className = "page-btn page-nav-btn";
        prevBtn.onclick = () => {
            setCurrentPage(prev);
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
            setCurrentPage(i);
            loadUsers();
        };
        container.appendChild(pageBtn);
    }

    if (paginationData.current_page < paginationData.last_page) {
        const nextBtn = document.createElement("button");
        nextBtn.innerText = "Następna >>";
        nextBtn.className = "page-btn page-nav-btn";
        nextBtn.onclick = () => {
            setCurrentPage(next);
            loadUsers();
        };
        container.appendChild(nextBtn);
    }
}
