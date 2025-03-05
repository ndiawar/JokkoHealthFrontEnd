export function authHeader() {
    // Les cookies seront envoyés automatiquement avec les requêtes si 'withCredentials' est activé
    return {};  // Pas besoin d'ajouter le token ici, car les cookies sont envoyés automatiquement
}

export function getCurrentUser() {
    // Supposons que les informations de l'utilisateur sont stockées dans le localStorage
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}