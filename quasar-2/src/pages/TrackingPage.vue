<template>
	<q-page class="flex flex-center">
		<q-card v-for="y in ys"
			:key="y" 
			dark bordered class="bg-grey-9 my-card">
			<q-card-section>
				<div class="text-h6" align="center">{{y}}</div> 
			</q-card-section>
			<q-separator dark inset></q-separator>
			<q-card-section> 
				<svg :id="y"></svg>	
			</q-card-section>
		</q-card>
					
	</q-page>
</template>

<script>
import { defineComponent } from 'vue'
import LineChart from '@/helpers/plothelper.js'
import * as d3 from 'd3'
import test from '@/assets/test.csv'

export default defineComponent({
	name: 'TrackingPage',
	data() {
		return {
			trackers: [],
			ys: ['cumsum_enrolled', 'active', 'cumsum_deceased', 'cumsum_withdrawn', 'cumsum_completed']
		}
	},
	setup() {
	},
	mounted() {
		/* eslint-disable */
		var lineColors = ['lemonchiffon', '#bd0013', 'springgreen', 'cornflowerblue', '#ff951c', '#f587cb']
		this.trackers = d3.csvParse(test, d3.autoType)
		this.ys.forEach((y, i) => {
			LineChart(this.trackers, {
				selector: '#' + y,
				x: d => d.date,
				ys: [y],
				yLabel: '',
				xLabel: 'Date',
				width: 500,
				height: 300,
				color: 'dark',
				lineColor: lineColors[i]
			}) 
		})	
	}
})
</script>

<style lang="scss" scoped></style>
