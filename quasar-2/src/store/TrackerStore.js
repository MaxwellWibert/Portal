import { defineStore } from 'pinia'
import * as d3 from 'd3' 
import test from '@/assets/test.csv'
export const useTrackerStore = defineStore('TrackerStore', {
    state: () => ({
        // 1. Screened 2. Enrolled 3. Randomized 4. Completed Treatment 5. Completed Assessments 6. Discontinuation- withdrawal, death 6. Completed study 
        // diads?
        cumulTrackers: ['active', 'cumsum_enrolled', 'cumsum_deceased', 'cumsum_withdrawn', 'cumsum_completed'],
        diffTrackers: ['enrolled', 'deceased', 'withdrawn', 'completed'],
        activeTrackers: ['active', 'cumsum_enrolled', 'cumsum_deceased', 'cumsum_withdrawn', 'cumsum_completed'],
        isCumulative: true,
        tableData: d3.csvParse(test, d3.autoType)
    }),
    getters: {
        getTrackers() {
            return this.isCumulative ? this.cumulTrackers : this.diffTrackers
        }
    },
    actions: {
        createTracker() {

        },
        toggleCumulative() {
            this.isCumulative = !this.isCumulative
            this.activeTrackers = this.isCumulative ? this.cumulTrackers : this.diffTrackers 
        },
        toggleTable() {
            this.isTables = !this.isTables
        }
    }
})


