function showTab(tabName) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab content
    document.getElementById(tabName).style.display = 'block';
}
