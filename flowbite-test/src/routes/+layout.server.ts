import { client } from '$lib/config/client'
import type { Project } from '$lib/types/project.js'
import type { ProjectList } from '$lib/types/projectList'

export const load = async ({ url }) => {
	// const projectSlug = url.searchParams.get('project') || '104-kiosk-buerkliplatz'
	const projectSlug = url.pathname.slice(1) || '104-kiosk-buerkliplatz'

	// async function getProject(projectSlug: string) {
	const project: Project = await client.fetch(
		`
      *[slug.current == $projectSlug]{
        'slug': slug.current, 
        title, 
        gallery[]{
          'ref': asset._ref,
        },
}[0]
    `,
		{ projectSlug }
	)

	// 'slug': slug.current,
	//         asset -> {
	//           metadata{
	//             blurHash,
	//             lqip
	//           }
	//         }
	//       authors,
	//       oppsummering,
	//       publisert,
	//       squareFootage

	// 	return project
	// }

	const projectListUnfiltered = await client.fetch(`
  *[type == Project]{
    'slug': slug.current,
    title
  }
  `)

	const projectList: ProjectList = projectListUnfiltered.filter((i) => {
		return Object.values(i).at(0) != null && Object.values(i).at(0) != 'gallery1'
	})

	// project.forEach((i, index) => Object.assign(i, { ['index']: index }))

	return {
		// imageCount: countImages(),
		// gallery: gallery,
		project: project,
		projectList: projectList
	}
}
