import React from 'react'
import {Dimensions, Image, StyleSheet} from 'react-native'

const WIDTH = Dimensions.get('window').width


function GirlIcon() {
    return (
        <Image source={require('./girl.png')} style={styles.image}/>
    )
}


const styles = StyleSheet.create({
    image: {
        width: WIDTH,
        resizeMode: 'contain',
    },
})

export default GirlIcon
