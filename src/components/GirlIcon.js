import React from 'react'
import PropTypes from 'prop-types'
import {Dimensions, Image, StyleSheet, TouchableHighlight} from 'react-native'

const WIDTH = Dimensions.get('window').width


function GirlIcon({onPress}) {
    return (
        <TouchableHighlight onPress={onPress}>
            <Image source={require('./girl.png')} style={styles.image}/>
        </TouchableHighlight>
    )
}

GirlIcon.propTypes = {
    onPress: PropTypes.func.isRequired,
}


const styles = StyleSheet.create({
    image: {
        width: WIDTH,
        resizeMode: 'contain',
    },
})

export default GirlIcon
