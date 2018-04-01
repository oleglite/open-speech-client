import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'

import GirlIcon from './GirlIcon'
import Worker from '../worker'
import {requestPermissions} from '../permissions'


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            log: [],
            working: false,
        }
        this.worker = new Worker()
    }

    componentDidMount() {
        requestPermissions()
        this.worker.start()
            .then(() => {
                this.setState({working: true})
            })
    }

    componentWillUnmount() {
        this.worker.stop()
            .then(() => {
                this.setState({working: false})
            })
    }

    onRecognized(result) {
        console.log(result)
        this.setState({
            log: [
                ...this.state.log,
                result,
            ]
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.working && <GirlIcon/>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    log: {
        textAlign: 'left',
        color: '#000',
    },
})
