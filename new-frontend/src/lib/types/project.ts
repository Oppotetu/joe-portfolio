export type Project = {
  index: number
  slug: string
  title: string
  gallery: {
    slug: string
    asset: {
      metadata: {
        blurHash: string
        lqip: string
      }
    }
  }[]
  authors: string
  oppsummering: string
  publisert: string
  squareFootage: number
}
