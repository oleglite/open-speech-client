import React from 'react'
import {AsyncStorage} from 'react-native'

const KEY = '@RitaCli:settings'


const DEFAULT_SETTINGS = {
    'backendUri': '',
}

async function save(settings) {
    console.log('saving ', settings)
    settings = {
        ...DEFAULT_SETTINGS,
        ...settings,
    }
    await AsyncStorage.setItem(KEY, JSON.stringify(settings))
}

async function load() {
    let result = await AsyncStorage.getItem(KEY)
    result = JSON.parse(result)
    return {
        ...DEFAULT_SETTINGS,
        ...result
    }
}

export {save, load}
