<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>
			</q-toolbar>
			<div class="q-px-lg q-pt-xl q-mb-md">
				<!-- TODO: update header after pinia -->
				<div class="text-h3">DCare Study</div>
				<div class="text-subtitle1"></div>
			</div>

			<q-tabs align="left">
				<q-route-tab to="/" label="Home"></q-route-tab>
				<q-route-tab to="studyprogress" label="Study Progress"></q-route-tab>
				<q-route-tab to="studydocuments" label="Study Documents"></q-route-tab>
			</q-tabs>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-list>
				<q-item-label header> Essential Links </q-item-label>

				<EssentialLink
					v-for="link in essentialLinks"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
			<!-- <q-img
				class="absolute-top"
				src="https://cdn.quasar.dev/img/material.png"
				style="height: 150px"
			>
				<div class="absolute-bottom bg-transparent">
					<q-avatar size="56px" class="q-mb-sm">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
					</q-avatar>
					<div class="text-weight-bold">Razvan Stoenescu</div>
					<div>@rstoenescu</div>
				</div>
			</q-img> -->
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useUserStore } from 'stores/UserStore.js';

const linksList = [
	{
		title: 'Docs',
		caption: 'quasar.dev',
		icon: 'school',
		link: 'https://quasar.dev',
	},
	{
		title: 'Github',
		caption: 'github.com/quasarframework',
		icon: 'code',
		link: 'https://github.com/quasarframework',
	},
	{
		title: 'Discord Chat Channel',
		caption: 'chat.quasar.dev',
		icon: 'chat',
		link: 'https://chat.quasar.dev',
	},
	{
		title: 'Forum',
		caption: 'forum.quasar.dev',
		icon: 'record_voice_over',
		link: 'https://forum.quasar.dev',
	},
	{
		title: 'Twitter',
		caption: '@quasarframework',
		icon: 'rss_feed',
		link: 'https://twitter.quasar.dev',
	},
	{
		title: 'Facebook',
		caption: '@QuasarFramework',
		icon: 'public',
		link: 'https://facebook.quasar.dev',
	},
	{
		title: 'Quasar Awesome',
		caption: 'Community Quasar projects',
		icon: 'favorite',
		link: 'https://awesome.quasar.dev',
	},
];

export default defineComponent({
	name: 'MainLayout',

	components: {
		EssentialLink,
	},

	setup() {
		const leftDrawerOpen = ref(false);
		const userStore = useUserStore();
		return {
			userStore,
			essentialLinks: linksList,
			leftDrawerOpen,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
		};
	},
});
</script>

<style lang="scss">
.header-image {
	height: 100%;
	z-index: -1;
	opacity: 1;
}
</style>
