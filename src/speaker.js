import {delay} from './utils'

class Speaker {
    constructor() {

    }

    async speak(message) {
        console.log('Speaking:', message)
        await delay(2000)
        console.log('Speaking done')
    }
}

export default Speaker
