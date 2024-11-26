document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profile-image');
    const dashboard = document.getElementById('dashboard');

    
    profileImage.addEventListener('click', (event) => {
        event.stopPropagation(); 
        const isVisible = dashboard.style.display === 'block';
        dashboard.style.display = isVisible ? 'none' : 'block';
    });

    
    document.addEventListener('click', (event) => {
        if (!dashboard.contains(event.target) && event.target !== profileImage) {
            dashboard.style.display = 'none';
        }
    });
});

document.getElementById('parametresButton').addEventListener('click', function() {
    var submenu = document.querySelector('.submenu');
    if (submenu.style.display === 'none') {
        submenu.style.display = 'block';
    } else {
        submenu.style.display = 'none';
    }
});
