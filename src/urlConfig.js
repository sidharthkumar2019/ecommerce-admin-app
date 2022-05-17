export const baseURL = window.location.hostname == 'localhost' ? 
                        'http://localhost:2000' :
                        'https://flipkartclone-rest-server.herokuapp.com'

export const api = `${baseURL}/api`;
export const generatePublicUrl = (fileName) => {
    return `${baseURL}/public/${fileName}`;
}