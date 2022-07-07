import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all ads
export async function getAllAlbums() {
    return await api.get(host + '/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

// get ad by id
export async function getAlbumById(id) {
    return await api.get(host + `/data/albums/${id}`);
}

// create ad
export async function createAlbum (album) {
    return await api.post(host + '/data/albums', album);
}

// edit ad by id
export async function editAlbumById(id, album) {
    return await api.put(host + `/data/albums/${id}`, album);
}

// delete ad by id
export async function deleteAlbumById(id) {
    return await api.del(host + `/data/albums/${id}`)
}

// search
export async function search(query) {
    return await api.get(host + `/data/albums?where=name%20LIKE%20%22${query}%22`);
}