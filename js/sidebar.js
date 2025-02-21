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
            return;
        }

        setTimeout(function() {
            event.preventDefault();
            toggleSidebar();
        }, 100);
    });

    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            this.click();
        });

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('onclick').match(/showTab\('([^']+)'\)/)[1];
        });
    });
});
