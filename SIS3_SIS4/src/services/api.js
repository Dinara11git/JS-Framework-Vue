import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export const getStudents = () => api.get('/users')
export const getAssignments = () => api.get('/posts')
export const getAssignment = (id) => api.get(`/posts/${id}`)
export const createAssignment = (data) => api.post('/posts', data)
export const updateAssignment = (id, data) => api.put(`/posts/${id}`, data)
export const deleteAssignment = (id) => api.delete(`/posts/${id}`)

export default api
