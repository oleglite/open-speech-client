import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'

import {save, load} from '../settings'
import {errorLogger} from '../utils'


class SettingsScreen extends Component {
    constructor() {
        super()
        this.state = {
            settings: null
        }

        this.onLoad = this.onLoad.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    componentDidMount() {
        this.onLoad().catch(errorLogger('settings load'))
    }

    async onLoad() {
        let settings = await load()
        console.log('Settings loaded: ', settings)
        this.setState({settings})
    }

    async onSave() {
        try {
            await save(this.state.settings)
        } catch (e) {
            errorLogger('settings save')(e)
            return
        }
        console.log('Settings saved')
        await this.onLoad()
        this.props.onClose()
    }

    onChange(field) {
        return value => this.setState({
            settings: {
                ...this.state.settings,
                [field]: value
            }
        })
    }

    render() {
        if (this.props.visible && !this.state.settings) {
            return null
        }

        const {settings} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Backend URI:
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.onChange('backendUri')}
                    value={settings.backendUri}
                />
                <Button
                    onPress={this.onSave}
                    title="Save"
                />
            </View>
        )
    }
}

SettingsScreen.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
}


const styles = StyleSheet.create({
    container: {},
    text: {},
    textInput: {height: 40, borderColor: 'gray', borderWidth: 1},
})


export default SettingsScreen
