export type Project = {
	index: number
	project: string
	gallery: {
		image: string
		slug: string
	}[]
	title: string
	authors: string
	oppsummering: string
	publisert: string
	squareFootage: number
}

// const swiperParamsOuter: SwiperOptions = {
//   modules: [Navigation, Pagination, HashNavigation, Keyboard, Mousewheel],
//   direction: 'vertical',
//   spaceBetween: 8,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '.down-b',
//     prevEl: '.up-b',
//   },
//   keyboard: true,
//   mousewheel: true,
// }
// const swiperParamsInner: SwiperOptions = {
//   modules: [Navigation, Pagination, Keyboard],
//   spaceBetween: 8,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '.next-b',
//     prevEl: '.prev-b',
//   },
//   keyboard: true,
//   slidesPerView: 'auto',
//   slidesPerGroupAuto: true,
// }
