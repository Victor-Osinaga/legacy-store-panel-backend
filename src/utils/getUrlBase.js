export default function getUrlBase (url) {
    const index = url.indexOf('?')
    if(index !== -1){
        return url.substring(0, index)
    }
    return url
}