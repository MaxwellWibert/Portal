import { defineStore } from 'pinia'

export const useTrackerStore = defineStore('TrackerStore', {
    state: () => ({
        trackers: []
    }),
    getters: {
    },
    actions: {
        createTracker() {

        }
    }
})


