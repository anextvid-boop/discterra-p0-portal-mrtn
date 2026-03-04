(function () {
    // Shared Password
    const SECRET = "martin";
    const SESSION_KEY = "discterra_authorized";
    const LOGIN_PAGE = "login.html";

    // Check if we are already on the login page to avoid infinite loops
    const isLoginPage = window.location.pathname.endsWith(LOGIN_PAGE);

    if (isLoginPage) {
        // Handle Login Logic
        window.attemptLogin = function (password) {
            if (password === SECRET) {
                sessionStorage.setItem(SESSION_KEY, "true");
                window.location.href = "index.html";
                return true;
            }
            return false;
        };
    } else {
        // Handle Authorization Check
        const isAuthorized = sessionStorage.getItem(SESSION_KEY) === "true";

        if (!isAuthorized) {
            // Redirect to login if not authorized
            window.location.replace(LOGIN_PAGE);
        }
    }

    // --- Smooth Page Transitions ---
    document.addEventListener('DOMContentLoaded', () => {
        // Handle all internal links for smooth fade-out
        document.querySelectorAll('a').forEach(link => {
            // Only handle same-origin links that aren't anchors or new tabs
            const isInternal = link.hostname === window.location.hostname || !link.hostname;
            const isAnchor = link.getAttribute('href')?.startsWith('#');
            const isNewTab = link.target === "_blank";

            if (isInternal && !isAnchor && !isNewTab) {
                link.addEventListener('click', e => {
                    const href = link.getAttribute('href');
                    if (!href || href === "#") return;

                    e.preventDefault();
                    document.body.classList.add('loading');

                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                });
            }
        });

        // Fade in handled by body.loading in CSS being removed by direct script in HTML
        // or we can handle it here too for robustness
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 50);
    });

    // Expose logout function globally
    window.logout = function () {
        sessionStorage.removeItem(SESSION_KEY);
        document.body.classList.add('loading');
        setTimeout(() => {
            window.location.href = LOGIN_PAGE;
        }, 500);
    };
})();
