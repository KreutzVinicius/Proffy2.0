export const BASE_URL = '/api'

async function login(email: string, password: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        // if status 401, user/password invalid
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error creating record:', error)
    }
}

async function putFile(id: any, file: any): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/fs/${id}`, {
            method: 'POST',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        })
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error creating record:', error)
    }
}

async function deleteFile(id: any): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/fs/${id}`, {
            method: 'DELETE',
        })
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error deleting record:', error)
    }
}

// Function to create a new record
async function create(endpoint: string, data: any): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error creating record:', error)
    }
}

// Function to retrieve a record by ID
async function getById(endpoint: string, id: any): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}/${id}`)
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error retrieving record:', error)
    }
}

// Function to retrieve an entire collection
async function get(endpoint: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`)
        const responseData = await response.json()
        if (Array.isArray(responseData)) {
            return responseData
        }
        return []
    } catch (error) {
        console.error('Error retrieving records:', error)
    }
}

// Function to update a record by ID
async function update(endpoint: string, id: any, data: any): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error('Error updating record:', error)
    }
}

// Function to delete a record by ID
async function remove(endpoint: string, id: any): Promise<any> {
    try {
        await fetch(`${BASE_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
        })
    } catch (error) {
        console.error('Error deleting record:', error)
    }
}

const dataService = {
    login,
    create,
    getById,
    get,
    update,
    remove,
    putFile,
    deleteFile,
}

export default dataService
