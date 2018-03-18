import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Recognizer from '../recognizer'


export default class VoiceRecognizer extends Component {
    constructor(props) {
        super()
        this.state = {
            recognizing: true,
        }
        this.recognizer = new Recognizer('ru-RU')
        this.listen = this.listen.bind(this)
    }

    componentDidMount() {
        this.listen()
    }

    componentWillUnmount() {
        this.setState({recognizing: false})
        this.recognizer.destroy()
    }

    async listen() {
        console.log('voice.start')
        if (!this.state.recognizing) {
            return
        }

        this.recognizer.listen()
            .then(results => {
                console.log('VoiceRecognizer got results', results)
                this.props.onRecognized(results)
                this.listen()
            })
            .catch(e => {
                console.error(e)

            })
    }

    render() {
        return null
    }
}

VoiceRecognizer.propTypes = {
    onRecognized: PropTypes.func.isRequired,
}


export {VoiceRecognizer}
