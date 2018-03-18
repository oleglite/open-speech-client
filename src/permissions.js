import {PermissionsAndroid} from 'react-native';

export async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                'title': 'App Audio Recording Permission',
                'message': 'App needs access to audio recording'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use App")
        } else {
            console.log("Permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}
