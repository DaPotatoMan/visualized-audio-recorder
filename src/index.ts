// ((proxied) => {
//   navigator.mediaDevices.getUserMedia = function() {
//     console.log('someone accessing user media')

//     // @ts-expect-error type issue
//     // eslint-disable-next-line prefer-rest-params
//     return proxied.apply(this, arguments)
//   }
// })(navigator.mediaDevices.getUserMedia)

export { default } from './recorder'
