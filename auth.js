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
})();
