export function authHeader() {
    // Récupérer le token depuis les cookies
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt='))
        ?.split('=')[1];

    if (token) {
        return {
            'Authorization': `Bearer ${token}`
        };
    }
    return {};
}

export function getCurrentUser() {
    // Supposons que les informations de l'utilisateur sont stockées dans le localStorage
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}