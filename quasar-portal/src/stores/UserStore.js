import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => ({
		userId: 1,
		userName: 'Max Wibert',
	}),

	getters: {
		firstName: (state) => this.userName.split(' ')[0],
	},

	actions: {},
});
