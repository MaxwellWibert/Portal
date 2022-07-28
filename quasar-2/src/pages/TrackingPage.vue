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
	<q-page-sticky position="bottom-right"
		:offset="[20, 20]">
		<q-fab
			label="Tracker Settings"
			label-position="right"
			icon="settings"
			direction="up"
			color="accent">
			<q-card
				padding
				bordered
				class="settings-card rounded-borders"
				:class="{dark: isDark}">
				<q-list
					padding
					bordered
					class="rounded-borders" 
					:class="{dark: isDark}">
					<q-item tag="label" v-ripple>
						<q-item-section side>
							<q-icon color="primary" name="table_view"></q-icon>
						</q-item-section>
						<q-item-section>
							<q-item-label>Table View</q-item-label>
							<q-item-label caption>Toggle table visibility</q-item-label>
						</q-item-section>
						<q-item-section side top>
							<q-toggle 
								color="primary" 
								v-model="tableToggle"></q-toggle>
						</q-item-section>
					</q-item>
					
					<q-item tag="label" v-ripple>
						<q-item-section side>
							<q-icon color="primary" name="calendar_month"></q-icon>
						</q-item-section>
						<q-item-section>
							<q-item-label>Cumulative Charts</q-item-label>
							<q-item-label caption>Choose whether charts show cumulative or differential data</q-item-label>
						</q-item-section>
						<q-item-section side top>
							<q-toggle 
								color="primary" 
								v-model="cumulativeToggle"></q-toggle>
						</q-item-section>
					</q-item>
					
					<q-separator spaced
						:class="{dark : isDark }"></q-separator>
					<q-expansion-item
						icon="trending_up"
						label="Active Trackers"
						:class="{dark: isDark}">
							<q-card-section>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
								commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
								eveniet doloribus ullam aliquid.
							</q-card-section>
					</q-expansion-item>

					
					
				</q-list>

			</q-card>	
			
			</q-fab>
	</q-page-sticky>
	
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import LineChart from '@/helpers/plothelper.js'
import * as d3 from 'd3'
import test from '@/assets/test.csv'
import { useQuasar } from 'quasar'


export default defineComponent({
	name: 'TrackingPage',
	data() {
		return {
			trackers: [],
			ys: ['enrolled', 'deceased', 'withdrawn', 'completed'],
			lineColors: [],
			tableToggle: ref(false),
			cumulativeToggle: ref(true),
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

.settings-card {
	width: 250px;
}

</style>
