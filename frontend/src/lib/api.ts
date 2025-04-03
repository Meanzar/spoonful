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

        return data && data.user ? true : false; 
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}


export async function logout() {
    sessionStorage.removeItem('token');
}

export async function banUser(data: any){
    const token = sessionStorage.getItem('token');
    if (!token || token === 'undefined') {
        console.warn('No token found in sessionStorage');
        return false;
    }
    try {
        const response = await fetch('/api/users/admin', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.warn('User ban failed:', response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error banning user:', error);
        return false;
    }
}
export async function unbanUser(data: any){
    const token = sessionStorage.getItem('token');
    if (!token || token === 'undefined') {
        console.warn('No token found in sessionStorage');
        return false;
    }
    try {
        const response = await fetch('/api/users/admin', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            console.warn('User unban failed:', response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error unbanning user:', error);
        return false;
    }
}

export async function deleteUser(userId: string) {
    const token = sessionStorage.getItem('token');
    if (!token || token === 'undefined') {
        console.warn('No token found in sessionStorage');
        return false;
    }
    try {
        const response = await fetch('/api/users/admin', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
            console.warn('User deletion failed:', response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}