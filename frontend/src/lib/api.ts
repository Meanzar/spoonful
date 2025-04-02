export async function getData(url: string, token?: string) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.json();
}

export async function postData(url: string, data: any) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(data)
    return response.json();
}

export async function putData(url: string, data: any) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function checkSession(): Promise<boolean> {
    const token = sessionStorage.getItem('token'); 
    console.log(token);

    if (!token || token === 'undefined') {
        console.warn('No token found in sessionStorage');
        return false;
    }

    try {
        const response = await fetch('/api/auth/session', { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.warn('Token validation failed:', response.statusText);
            return false;
        }

        const data = await response.json();

        // Si la session est valide, tu peux vérifier les données retournées, comme le user
        return data && data.user ? true : false; // Vérifie que la réponse contient un utilisateur
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}


export async function logout() {
    sessionStorage.removeItem('token');
}
