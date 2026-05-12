import axiosClient from '../api/axiosClient'
import type { Class, Section, Subject, Teacher, AcademicYear } from '../types/master'

const SCHOOL_ID = '1'

export const masterService = {
  fetchClasses: async (): Promise<Class[]> => {
    const response = await axiosClient.get<Class[]>(`/schools/${SCHOOL_ID}/master/classes`)
    return response.data
  },

  fetchSections: async (): Promise<Section[]> => {
    const response = await axiosClient.get<Section[]>(`/schools/${SCHOOL_ID}/master/sections`)
    return response.data
  },

  fetchSubjects: async (): Promise<Subject[]> => {
    const response = await axiosClient.get<Subject[]>(`/schools/${SCHOOL_ID}/master/subjects`)
    return response.data
  },

  fetchTeachers: async (): Promise<Teacher[]> => {
    const response = await axiosClient.get<Teacher[]>(`/schools/${SCHOOL_ID}/master/teachers`)
    return response.data
  },

  fetchAcademicYears: async (): Promise<AcademicYear[]> => {
    const response = await axiosClient.get<AcademicYear[]>(`/schools/${SCHOOL_ID}/master/academic-years`)
    return response.data
  },
}