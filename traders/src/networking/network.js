// const baseUrl = "https://trade2trade.co.uk:5050/api/v1/";
const baseUrl = 'https://xjn69b4j-5050.euw.devtunnels.ms/api/v1/';

export async function fetchApi(endpoint, params, method = 'GET', token = false, multipart = false) {
    const headers = {};
    if (token) {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFmN2I1NmE3OGYyY2E5ODI1YmQ3MDIiLCJlbWFpbCI6ImZlZ2FwZWx5QG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzMwMjA0OTU0fQ.K05pylWBbYJewzMWrWXSz9C2HCvolVjTWfZ41IZPGk8";
        headers['Authorization'] = `Bearer ${token}`;
    }
    if (multipart) {
    } else {
        headers['Content-Type'] = 'application/json';
    }
    const options = {
        method: method,
        headers: headers,
    };
    if (method !== 'GET') {
        if (multipart) {
            options.body = params;
        } else {
            options.body = JSON.stringify(params);
        }
    }
    
    try {
        const response = await fetch(baseUrl + endpoint, options);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}