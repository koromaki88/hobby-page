function showTab(tabName) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    sessionStorage.setItem('activeTab', tabName);
}

window.onload = () => {
    const activeTab = sessionStorage.getItem('activeTab') || 'home';
    showTab(activeTab);
}
