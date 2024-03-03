import { writable, type Writable } from 'svelte/store'

export const projectStore: Writable<string> = writable('')
