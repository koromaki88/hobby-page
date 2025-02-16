const sidebar = document.querySelector('.sidebar');

// Sidebar expand on hover
sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.add('expanded');
});

// Collapse sidebar
sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('expanded');
});
