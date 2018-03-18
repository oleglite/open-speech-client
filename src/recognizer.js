import Voice from 'react-native-voice'

function RecognizerError(message) {
    this.message = message
}


class Recognizer {
    constructor(lang) {
        this.lang = lang
        
        this.listening = false
        this.resultResolve = null
        this.resultReject = null
        Voice.onSpeechError = this.onSpeechError.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this)
    }

    debug(...args) {
        console.log('[DEBUG] [Recognizer]:', ...args)
    }

    async listen() {
        if (this.listening) {
            throw new RecognizerError("Can\t start listening, already listening")
        }
        this.listening = true

        try {
            await Voice.start(this.lang)
        } catch (e) {
            this.debug(e)
            this.listening = false
            throw e
        }

        return new Promise((resolve, reject) => {
            this.resultResolve = resolve
            this.resultReject = reject
        })
    }

    onSpeechError(e) {
        this.debug(e)
        this.resultReject(new RecognizerError(e.error))
    }

    onSpeechResults(e) {
        this.debug('onSpeechResults', e)
        this.resultResolve(e.value)
        this.listening = false
        this.resultResolve = null
        this.resultReject = null
    }

    async destroy() {
        this.debug('DESTROYING...')
        try {
            await Voice.stop()
            await Voice.destroy()
        } catch (e) {
            this.debug(e)
            throw e
        }
        await Voice.removeAllListeners()
    }
}

export default Recognizer
