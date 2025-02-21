document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelector('.sidebar');
    var isExpanded = false;

    function toggleSidebar(forceExpand = null) {
        if (forceExpand !== null) {
            isExpanded = forceExpand;
        } else {
            isExpanded = !isExpanded;
        }
        sidebar.classList.toggle('expanded', isExpanded);
    }

    sidebar.addEventListener('mouseenter', function() {
        if (window.matchMedia("(pointer: fine)").matches) {
            toggleSidebar(true);
        }
    });

    sidebar.addEventListener('mouseleave', function() {
        if (window.matchMedia("(pointer: fine)").matches) {
            toggleSidebar(false);
        }
    });

    sidebar.addEventListener('touchstart', function(event) {
        const isClickOnLink = event.target.closest('a');

        if (!isClickOnLink) {
            event.preventDefault();
            toggleSidebar(true);
        }
    });

    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.addEventListener('touchstart', function(e) {
            if (!isExpanded) {
                e.preventDefault();
                toggleSidebar(true);
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });

        link.addEventListener('click', function(e) {
            if (!isExpanded) {
                e.preventDefault();
                toggleSidebar(true);
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });

    document.addEventListener('touchstart', function(event) {
        if (isExpanded && !sidebar.contains(event.target)) {
            toggleSidebar(false);
        }
    });
});
