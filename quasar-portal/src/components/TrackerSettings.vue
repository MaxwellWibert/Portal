<template>
	<div></div>
</template>

<script>
import d3 from 'd3';
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'TrackerTable',
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
});
</script>

<style lang="scss" scoped></style>
