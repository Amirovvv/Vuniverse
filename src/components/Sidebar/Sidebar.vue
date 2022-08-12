<script setup lang="ts">
import { ref } from 'vue'
import Section from '../../types/sections'

const sections = ref<Section[]>([
	{
		title: 'Тесты',
		items: [{ title: 'Тест на знание основ Vue JS', url: '/tests' }],
	},
	{
		title: 'Полезные ссылки',
		items: [
			{ title: '--', url: '--' },
			{ title: '--', url: '--' },
		],
	},
])
</script>

<template>
	<aside class="sidebar">
		<nav class="sidebar__nav">
			<section
				class="sidebar__section"
				v-for="(section, index) in sections"
				:key="`section-${index}`"
			>
				<div class="sidebar__section-title">{{ section.title }}</div>
				<div
					class="sidebar__section-link"
					v-for="(item, index) in section.items"
					:key="`item-${index}`"
				>
					<router-link
						:to="item.url"
						active-class="sidebar__section-link_active"
					>
						{{ item.title }}
					</router-link>
				</div>
			</section>
		</nav>
	</aside>
</template>

<style lang="scss" scoped>
.sidebar {
	border-right: 1px solid #dedddd;
	width: 300px;
	flex: 0 0 auto;
	padding: 32px;
}

.sidebar__section {
	padding-top: 16px;
	font-size: 14px;

	& a {
		display: block;
		text-decoration: none;
		color: #3c3c3cb3;

		&:hover {
			color: #000;
		}
	}

	&-title,
	&-link {
		padding: 4px 0;
	}
	&-title {
		color: #000;
		font-weight: 700;
	}
	&-link {
		font-weight: 500;
		cursor: pointer;

		&_active {
			color: #42b883 !important;
			font-weight: 600;
		}
	}
}
</style>
