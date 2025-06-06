import axios from "axios"
import type { ResidentsResponse, CreateResidentResponse } from "../types/resident"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8800/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const getResidents = async (page = 1, limit = 20) => {
  const response = await api.get<ResidentsResponse>(`/residents?page=${page}&limit=${limit}`)
  return response.data.data
}

export const createResident = async (formData: FormData) => {
  const response = await api.post<CreateResidentResponse>("/residents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const getResidentById = async (id: string) => {
  const response = await api.get(`/residents/${id}`)
  return response.data
}
