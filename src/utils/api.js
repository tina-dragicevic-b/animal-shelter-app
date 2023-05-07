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