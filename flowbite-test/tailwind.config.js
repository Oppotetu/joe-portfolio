/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',

	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],
	theme: {
		extend: {}
	}
}
