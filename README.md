# 이게뭐약 Application
### Simple Pill Searching Application
----
<br/>

### 1. 애플리케이션 개발 환경
----
>![image](https://user-images.githubusercontent.com/33280934/121773366-79083700-cbb6-11eb-9245-200026b4b761.png)

<br/><br/>


### 2. 사용한 라이브러리 다운로드
----
#### 앱 화면 이동<br/>
npm install react-native-gesture-handler<br/>
npm install @react-navigation/native<br/>
npm install @react-navigation/stack<br/>

#### 네이티브 권한 취득<br/>
npm install react-native-permissions<br/>

#### 앱 실행시 스플래시 이미지<br/>
npm install react-native-splash-screen<br/>

#### 위치 추적 및 카카오 맵 지도 표시<br/>
npm install react-native-location<br/>
npm install react-native-webview<br/>

#### 카메라 및 갤러리 접근<br/>
npm install react-native-image-picker<br/>

#### Realm 데이터베이스 관련<br/>
npm install express-generator<br/>
npm install realm<br/>
<br/>

### 3. Emulator Execute
----
#### react-native run-android
#### ※ Android Studio 4.0 이상 버전 필요 (혹은 스마트폰 연결 후 에뮬레이터로 활용)
<br/>

### 4. APK File Release
----
#### cd android
#### ./gradlew clean
#### ./gradlew app:assembleRelease --stacktrace
