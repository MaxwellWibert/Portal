import { defineStore } from 'pinia'

export const useStudyStore = defineStore('StudyStore', {
    state: () => ({
        studyName: 'DCare Study',
        studyPI: 'Mary Geda'
    }),
    getters: {
    }
})

