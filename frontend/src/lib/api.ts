export async function getData(url: string) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
    return response.json();
}

export async function checkSession(): Promise<boolean> {
    const token = sessionStorage.getItem('token'); 
    console.log(token)
    if (!token) {
        console.warn('No token found in sessionStorage');
        return false;
    }

    return true 
    // try {
    //     const response = await fetch('/api/auth/session', { 
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });

    //     if (!response.ok) {
    //         console.warn('Token validation failed:', response.statusText);
    //         return false;
    //     }

    //     const data = await response.json();
    //     return data?.isValid || false; 
    // } catch (error) {
    //     console.error('Error validating token:', error);
    //     return false;
    // }
}

export async function logout() {
    sessionStorage.removeItem('token');
}