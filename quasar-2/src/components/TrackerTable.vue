<template>
	<q-card>
		<q-item>
			<q-item-section>
				<q-item-label> Title </q-item-label>
				<q-item-label caption> Subhead </q-item-label>
			</q-item-section>
		</q-item>
	</q-card>
</template>

<script>
import { defineComponent } from 'vue'
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
})
</script>

<style lang="scss" scoped></style>
