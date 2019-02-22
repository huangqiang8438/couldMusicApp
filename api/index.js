import fetch from './fetch.js'
export const banner= params=>{return fetch.get('/banner',params)}