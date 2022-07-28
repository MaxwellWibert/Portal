<template>
	<q-page 
	class="flex flex-center">
		<q-card
			v-for="y in ys"
			:key="y"
			bordered class="my-card"
			:class="{ dark: isDark }">
			<q-card-section>
				<div class="text-h6" align="center">{{y}}</div> 
			</q-card-section>
			<q-separator inset
				:class="{ dark: isDark }"></q-separator>
			<q-card-section> 
				<svg :id="y"
					:class="{ 'dark-svg': isDark, 'light-svg': !isDark }"></svg>	
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script>
import { defineComponent, watch } from 'vue'
import LineChart from '@/helpers/plothelper.js'
import * as d3 from 'd3'
import test from '@/assets/test.csv'
import { useQuasar } from 'quasar'


export default defineComponent({
	name: 'TrackingPage',
	data() {
		return {
			trackers: [],
			ys: ['cumsum_enrolled', 'active', 'cumsum_deceased', 'cumsum_withdrawn', 'cumsum_completed'],
			lineColors: [],
			theme: null
		}
	},
	created() {
		const $q = useQuasar()
		this.lineColors = $q.dark.isActive ? ['lemonchiffon', '#bd0013', 'springgreen', 'cornflowerblue', '#ff951c', '#f587cb'] : ['indigo', '#ab0218', '#007d73', '#38a300','#a87b00', '#0232b5']
		this.theme = $q.dark.isActive ? 'dark' : 'light'

		watch(() => $q.dark.isActive, val => {
			console.log(val)
			this.theme = val ? 'dark' : 'light'
			this.lineColors = $q.dark.isActive ? ['lemonchiffon', '#bd0013', 'springgreen', 'cornflowerblue', '#ff951c', '#f587cb'] : ['indigo', '#ab0218', '#007d73', '#38a300','#a87b00', '#0232b5']
			d3.selectAll('g').remove()
			d3.selectAll('path').remove()
			this.drawGraphs()
		})
	},
	mounted() {
		/* eslint-disable */
		this.drawGraphs()	
	},
	computed: {
		isDark() {
			return (this.theme == 'dark')
		}
	},
	methods: {
		drawGraphs() {
			const self = this
			self.trackers = d3.csvParse(test, d3.autoType)
			self.ys.forEach((y, i) => {
				LineChart(this.trackers, {
					selector: '#' + y,
					x: d => d.date,
					ys: [y],
					yLabel: '',
					xLabel: 'Date',
					width: 500,
					height: 300,
					color: self.theme,
					lineColor: self.lineColors[i]
				}) 
			})
		}
	}
})
</script>

<style lang="scss" scoped>

.dark-svg {
	background-color: '#1a2133'
}

.light-svg {
	background-color: 'mintcream'
}

</style>
