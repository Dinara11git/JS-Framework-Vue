import { createStore } from 'vuex'
import {
  getStudents, getAssignments, createAssignment,
  updateAssignment, deleteAssignment
} from '../services/api'

export default createStore({
  state: {
    students: [],
    assignments: [],
    studentsLoading: false,
    assignmentsLoading: false,
    error: null,
  },
  getters: {
    studentCount: (state) => state.students.length,
    assignmentCount: (state) => state.assignments.length,
  },
  mutations: {
    SET_STUDENTS(state, value) { state.students = value },
    SET_ASSIGNMENTS(state, value) { state.assignments = value },
    ADD_ASSIGNMENT(state, value) { state.assignments.unshift(value) },
    UPDATE_ASSIGNMENT(state, value) {
      const index = state.assignments.findIndex(item => item.id === value.id)
      if (index !== -1) state.assignments.splice(index, 1, value)
    },
    REMOVE_ASSIGNMENT(state, id) {
      state.assignments = state.assignments.filter(item => item.id !== id)
    },
    SET_STUDENTS_LOADING(state, value) { state.studentsLoading = value },
    SET_ASSIGNMENTS_LOADING(state, value) { state.assignmentsLoading = value },
    SET_ERROR(state, value) { state.error = value },
  },
  actions: {
    async fetchStudents({ commit }) {
      commit('SET_STUDENTS_LOADING', true); commit('SET_ERROR', null)
      try {
        const response = await getStudents()
        commit('SET_STUDENTS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message || 'Could not load students')
        throw error
      } finally { commit('SET_STUDENTS_LOADING', false) }
    },
    async fetchAssignments({ commit }) {
      commit('SET_ASSIGNMENTS_LOADING', true); commit('SET_ERROR', null)
      try {
        const response = await getAssignments()
        commit('SET_ASSIGNMENTS', response.data)
      } catch (error) {
        commit('SET_ERROR', error.message || 'Could not load assignments')
        throw error
      } finally { commit('SET_ASSIGNMENTS_LOADING', false) }
    },
    async addAssignment({ commit }, payload) {
      const response = await createAssignment(payload)
      // JSONPlaceholder simulates writes; update local Vuex state for this demo.
      commit('ADD_ASSIGNMENT', { ...response.data, ...payload, id: Date.now() })
    },
    async editAssignment({ commit }, { id, payload }) {
      const response = await updateAssignment(id, payload)
      commit('UPDATE_ASSIGNMENT', { ...response.data, ...payload, id })
    },
    async removeAssignment({ commit }, id) {
      await deleteAssignment(id)
      commit('REMOVE_ASSIGNMENT', id)
    },
  },
})
