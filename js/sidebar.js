document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelector('.sidebar');
    var isExpanded = false;

    function toggleSidebar() {
        if (isExpanded) {
            sidebar.classList.remove('expanded');
        } else {
            sidebar.classList.add('expanded');
        }
        isExpanded = !isExpanded;
    }

    sidebar.addEventListener('mouseenter', function() {
        if (window.matchMedia("(pointer: fine)").matches) {
            sidebar.classList.add('expanded');
        }
    });

    sidebar.addEventListener('mouseleave', function() {
        if (window.matchMedia("(pointer: fine)").matches) {
            sidebar.classList.remove('expanded');
        }
    });

    sidebar.addEventListener('touchstart', function(event) {
        const link = event.target.closest('a');
        if (link) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        toggleSidebar();
    });
});
