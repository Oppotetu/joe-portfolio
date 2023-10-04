import { client } from '$lib/config/client'
import type { Project } from '$lib/types/project.js'

export const load = async ({}) => {
	const getProjects = async () => {
		const response = await client.fetch(`
      *[]{'project': slug.current, gallery[]{'image': asset._ref, 'slug': slug.current}, title, authors, oppsummering, publisert, squareFootage}
    `)

		const filtered: Project[] = response.filter((i: any) => {
			return Object.values(i).at(0) != null
		})

		filtered.forEach((i, index) => Object.assign(i, { ['index']: index }))

		// make ob of objects containing image, slug, project and index
		// when routing to projects

		// let merged: any[] = []
		// const key = 'project'
		// for (let project of filtered) {
		// 	const value = project.project
		// 	project.gallery.forEach((el, index) => {
		// 		Object.assign(el, { [key]: value })
		// 		Object.assign(el, { ['index']: index })
		// 	})
		// 	Object.entries(project).forEach((el) => {
		// 		if (el[0] == 'gallery') {
		// 			merged = [...merged, ...el[1]]
		// 		}
		// 	})
		// }

		return filtered
	}

	return {
		projects: getProjects(),
	}
}
