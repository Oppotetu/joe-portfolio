export type Project = {
  index: number
  slug: string
  title: string
  gallery: {
    ref: string
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
