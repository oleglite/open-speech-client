import Tts from 'react-native-tts'


class Speaker {
    constructor() {
        // Tts.voices().then(voices => {
        //     voices = voices.filter(v => v.notInstalled === false && v.networkConnectionRequired === false)
        //     console.log('Available voices:', voices)
        // })

        Tts.setDefaultLanguage('ru-RU')
        Tts.setDefaultVoice('ru-ru-x-dfc#female_1-local')
        Tts.setDefaultPitch(1.2)



        Tts.addEventListener('tts-finish', this.onStop.bind(this))
        Tts.addEventListener('tts-cancel', this.onStop.bind(this))

        this.speakingResolve = null

        this.isInitialized = false
    }

    async speak(message) {
        if (!this.isInitialized) {
            await Tts.getInitStatus()
            this.isInitialized = true
        }
        console.log('Speaking:', message)
        await Tts.speak(message, {androidParams: {KEY_PARAM_STREAM: 'STREAM_SYSTEM'}})

        return new Promise(resolve => {
            this.speakingResolve = resolve
        })
    }

    onStop() {
        console.log('Speaking done')
        this.speakingResolve()
    }

    destroy() {
        Tts.stop()
    }
}

export default Speaker
