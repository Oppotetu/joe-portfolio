import { client } from '$lib/config/client';
import type { Project } from '$lib/types/project.js';

export const load = async () => {
	const proRes: Project[] = await client.fetch(`
      *[]{
        'slug': slug.current, 
        title, 
        gallery[]{
          'ref': asset._ref,
          'slug': slug.current,
          asset -> {
            metadata{
              blurHash,
              lqip
            }
          }
        }[0...4],
        authors, 
        oppsummering, 
        publisert, 
        squareFootage}
    `);
	const projects: Project[] = proRes.filter((i: any) => {
		return Object.values(i).at(0) != null;
	});
	projects.forEach((i, index) => Object.assign(i, { ['index']: index }));

	return {
		// imageCount: countImages(),
		// gallery: gallery,
		projects: projects
	};
};
