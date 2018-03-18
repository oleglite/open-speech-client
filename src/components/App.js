import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

import Worker from '../worker'
import {requestPermissions} from '../permissions'


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            log: [],
        }
        this.worker = new Worker()
    }

    componentDidMount() {
        requestPermissions()
        this.worker.start()
    }

    componentWillUnmount() {
        this.worker.stop()
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
                {this.state.log.map((result, i) => (
                    <Text key={i} style={styles.log}>
                        {result.join(' _ ')}
                    </Text>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    log: {
        textAlign: 'left',
        color: '#000',
    },
})
