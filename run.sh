npm i ../react-native-voice ../react-native-tts
react-native link
cd android && ./gradlew clean && cd ..
react-native run-android
react-native log-android
