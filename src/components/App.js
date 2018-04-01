import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'

import GirlIcon from './GirlIcon'
import SettingsScreen from './SettingsScreen'
import Worker from '../worker'
import {requestPermissions} from '../permissions'
import {load} from '../settings'


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            log: [],
            working: false,
            showSettings: false,
        }
        this.worker = new Worker()
        this.loadSettings.bind(this)()
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

    onSettingsClose() {
        this.setState({showSettings: false})
        this.loadSettings.bind(this)()
    }

    loadSettings() {
        load().then(
            settings => this.worker.setBackendUri(settings.backendUri)
        )
    }

    render() {
        if (this.state.showSettings) {
            return (
                <SettingsScreen
                    visible={this.state.showSettings}
                    onClose={this.onSettingsClose.bind(this)}
                />
            )
        }
        return (
            <View style={styles.container}>
                {
                    this.state.working &&
                    <GirlIcon onPress={() => this.setState({showSettings: true})}/>
                }
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
