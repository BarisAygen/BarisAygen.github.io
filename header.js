function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading header:', error);
            document.getElementById('header-placeholder').innerHTML = `
                <header class="header">
                    <div class="header-content">
                        <div class="logo-section">
                            <img src="img/headerImage.png" alt="Logo" class="logo">
                            <h1 class="page-title"><a href="index.html" style="text-decoration: none; color: inherit;">Baris Aygen</a></h1>
                        </div>
                        <nav class="nav-links">
                            <a href="Baris_Aygen_resume.pdf" download="Baris_Aygen_Resume.pdf">Resume</a>
                            <a href="privacy.html">Privacy</a>
                            <a href="contact.html">Contact</a>
                        </nav>
                    </div>
                </header>
            `;
        });
}

// Load header when page loads
document.addEventListener('DOMContentLoaded', loadHeader);
