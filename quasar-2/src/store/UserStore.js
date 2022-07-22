import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        userId: 1,
        userName: 'Max Wibert',
        emailAddress: 'maxwell.wibert@yale.edu'
    }),
    getters: {
        firstName: state => state.userName.split(' ')[0]
    }
})
