import { createClient } from '@sanity/client';
// import { SANITY_AUTH_TOKEN } from '$env/static/private'

export const client = createClient({
	projectId: 's0d0t3an',
	dataset: 'production',
	useCdn: false,
	apiVersion: '2023-05-03'
});
