<template>
	<div></div>
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
