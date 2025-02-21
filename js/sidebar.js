document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelector('.sidebar');
    var isExpanded = false;

    function toggleSidebar() {
        sidebar.classList.toggle('expanded');
        isExpanded = sidebar.classList.contains('expanded');
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
        if (!isExpanded) {
            event.preventDefault();
            toggleSidebar();
        }
    });

    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.addEventListener('touchstart', function(e) {
            if (!isExpanded) {
                e.preventDefault();
                toggleSidebar();
            } else {
                e.stopPropagation();
            }
        });
    });
});
