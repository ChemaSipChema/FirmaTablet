'Crear Apk
cd android
.\gradlew assembleDebug
adb install -r app\build\outputs\apk\debug\app-debug.apk


'Probar en android 
adb reverse tcp:8081 tcp:8081        
npx react-native run-android --port 8081  --active-arch-only 
