# MainServer
> 이게 뭐약? 의 메인서버입니다.

## Description
> 1. 애플리케이션으로부터 전송된 이미지 url을 인공지능 서버에 전달합니다.
> 2. 인공지능서버에서 추출된 알약 특징들을 셀레니움을 이용하여 약학정보원(https://www.health.kr/) 에서 검색을하고 검색 결과를 크롤링 합니다.
> 3. 검색결과를 DB에 넣고 애플리케이션으로 결과를 전달합니다.

## 개발환경
|도구|버전|
|------|--------|
|Framework|Spring Boot 2.4.5|
|OS|Windows 10, Ubuntu 18.0.4|
|IDE|IntelliJ IDEA Community|
|JDK|JDK 11|
|DataBase|MySQL 8.0.2|
|Build Tool|Gradle 6.8.3|

## 실행 방법
* 준비사항.
  * <code>Gradle</code> or <code>IntelliJ IDEA</code>
  * <code>JDK</code> (11)
  * <code>Spring Boot</code> (>=2.x)
  * <code>chromedriver</code> (본인 크롬 버전에 맞게)
* 저장소 <code>clone</code>
*   
