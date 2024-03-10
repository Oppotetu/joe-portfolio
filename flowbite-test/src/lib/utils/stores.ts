import { writable, type Writable } from 'svelte/store'

export const activeStore: Writable<string> = writable('321-solo-house')
