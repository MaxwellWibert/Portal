<template>
	<q-card
	bordered class="my-card"
	:class="{ dark: isDark }">
		<q-card-section>
			<div class="text-h6" align="center">{{ title }}</div> 
		</q-card-section>
		<q-separator inset
			:class="{ dark: isDark }"></q-separator>
		<q-card-section> 
			<svg :id="y"
				:class="{ 'dark-svg': isDark, 'light-svg': !isDark }"></svg>	
		</q-card-section>
	</q-card>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'TrackerPlot',
	props: {
		title: {
			type: String,
			required: true,
		},

		data: {
			type: Array,
			required: true,
		},
	},
})
</script>

<style lang="scss" scoped></style>
