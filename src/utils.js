export function delay(ms) {
    return new Promise(res => setTimeout(res, ms))
}

export function errorLogger(when) {
    return e => console.error(`[ERROR ${when}] ${e}\n${e.stack}`)
}
