import axios from "axios";

const url = "http://localhost:3001";

// COMMENTS
export const postComment = async (comment) => {
    return await axios.post(`${url}/comments`, {...comment})
}

export const getComments = async () => {
    return await axios.get(`${url}/comments`)
}
// ANIMALS
export const getAnimals = async () => {
    return await axios.get(`${url}/animals`)
}

export const updateAnimal = async (animal) => {
    return await axios.put(`${url}/animals/${animal.id}`, animal)
}

export const createAnimal = async (animal) => {
    return await axios.post(`${url}/animals`, {...animal})
}

// ANIMAL TYPE
export const getTypes = async () => {
    return await axios.get(`${url}/animalType`)
}

// DONATIONS
export const getDonations = async () => {
    return await axios.get(`${url}/donations`)
}

export const updateDonation = async (donation) => {
    return await axios.patch(`${url}/donations/${donation.id}`, donation);
}

export const createDonation = async (donation) => {
    return await axios.post(`${url}/donations`, donation);
}

export const deleteDonation = async (id) => {
    return await axios.delete(`${url}/donations/${id}`);
}

// NEWS
export const getNews = async () => {
    return await axios.get(`${url}/news`);
}

export const createNews = async (data) => {
    return await axios.post(`${url}/news`, data);
}

export const deleteNews = async (id) => {
    return await axios.delete(`${url}/news/${id}`)
}