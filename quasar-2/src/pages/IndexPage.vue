<template>
	<q-page class="flex flex-center">

		<img v-if="$q.dark.isActive"
			alt="YES3 Logo"
			src="yes3_logos/YES3_Logo_Square_Black_v1.1.png"
			style="width: 200px; height: 200px"
		/>
		<img v-else
			alt="YES3 Logo"
			src="yes3_logos/YES3_Logo_Square_White_v1.1.png"
			style="width: 200px; height: 200px"
		/>

	</q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IndexPage',
})
</script>
