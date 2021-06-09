package capstone.pill.service;

import capstone.pill.domain.Pill;
import capstone.pill.dto.ApiRequestDto;
import capstone.pill.dto.ApiResponseBody;
import capstone.pill.dto.ApiResponseDto;
import capstone.pill.exception.CustomException;
import capstone.pill.repository.PillRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Getter
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PillCrawling {

    private final PillRepository pillRepository;

    // WebDriver 에 필요한 멤버변수
    private WebDriver driver;
    private WebElement webElement;

    // Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "D:/chromedriver.exe";

    //리눅스 배포 버전
//    public static final String WEB_DRIVER_PATH = "/home/ubuntu/MainServer/chromedriver";

    // 크롤링 할 URL
    private String base_url;


    @Transactional
    public ApiResponseDto crawl(ApiRequestDto apiRequestDto) {
        try {

            log.info("drug_type:" + apiRequestDto.getDrug_type());
            log.info("drug_line:" + apiRequestDto.getDrug_line());
            log.info("drug_color:" + apiRequestDto.getDrug_color());
            log.info("drug_name:" + apiRequestDto.getDrug_name());
            log.info("drug_shape:" + apiRequestDto.getDrug_shape());

            // System Property SetUp
            System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

            // Driver SetUp
            ChromeOptions options = new ChromeOptions();
            options.setCapability("ignoreProtectedModeSettings", true);
            options.addArguments("--headless");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            driver = new ChromeDriver(options);

            base_url = "https://www.health.kr/searchIdentity/search.asp";

            // 약학정보원 접속 시도 -> 접속 ? 크롤링 : DB 에서 SELECT
            // DB에 데이터 SELECT -> NULL ? ExceptionError : Return
            try {
                // 약학 정보원 접속 시도
                log.info("약학정보원 접속 시도");
                driver.get(base_url);
                log.info("약학정보원 접속 성공");

            // 접속이 되지 않는다.
            }catch (WebDriverException e){
                log.info("사이트 접속 실패 후 DB 접근");
                // DB 에서 SELECT 하는 메서드
                Pill findPill = findPill(apiRequestDto.getDrug_name(), apiRequestDto.getDrug_shape(), apiRequestDto.getDrug_line());
                // SELECT 결과가 NULL 이라면
                if (findPill == null){
                    // ExceptionError
                    log.info("사이트 접속 실패 후 DB 접근 -> 데이터 없음");
                    throw new CustomException("약학정보원 접속 오류");
                // 찾는 결과가 있다면 검색된 데이터를 반환
                }else{
                    log.info("약학정보원 접속 실패 후 DB 접근 -> 데이터 있음");
                    ApiResponseBody apiResponseBody = new ApiResponseBody();
                    apiResponseBody.setImage(findPill.getDrugImage());
                    apiResponseBody.setName(findPill.getDrugName());
                    apiResponseBody.setEffect(findPill.getDrugEffect());
                    apiResponseBody.setDosage(findPill.getDrugDosage());
                    apiResponseBody.setCaution(findPill.getDrugCaution());
                    apiResponseBody.setMaker(findPill.getDrugMaker());

                    ApiResponseDto<ApiResponseBody> apiResponseDto = new ApiResponseDto();
                    apiResponseDto.setStatus("good");
                    apiResponseDto.setResBody(apiResponseBody);

                    return apiResponseDto;

                }
            }


//        ------------------크롤링 시작--------------------       //
            // iframe 내부에서 id 필드 탐색
            webElement = driver.findElement(By.id("drug_print_front"));

            // 이 약이름 삽입
            webElement.sendKeys(apiRequestDto.getDrug_name());

            // 제형 지정
            String type = typeone(apiRequestDto.getDrug_type());
            driver.findElement(By.xpath("//*[@id='type_" + type + "']")).click();

            // 모양 지정
            String shape = shapeone(apiRequestDto.getDrug_shape());
            driver.findElement(By.xpath("//*[@id='shape_" + shape + "']")).click();

            // 색상 지정
            String color = colorone(apiRequestDto.getDrug_color());
            driver.findElement(By.xpath("//*[@id='color_" + color + "']")).click();

            // 분할선 지정
            String line = lineone(apiRequestDto.getDrug_line());
            driver.findElement(By.xpath("//*[@id='line_" + line + "']")).click();

            // 검색클릭
            driver.findElement(By.id("btn_idfysearch")).click();

            //결과테이블의 요소 갯수 추출
            String result_count = driver.findElement(By.id("idfy_total_cnt_view")).getText();
            int count = Integer.parseInt(result_count);

            //결과가 없으면 다음과 같이 출력
            if(count == 0){
                log.info("검색 결과가 없음");
                throw new Exception("검색 결과가 없습니다.");
            }

            //의약품 클릭
            driver.findElement(By.cssSelector("#idfytotal0 > tbody > tr:nth-child(3) > td.txtL.name")).click();

            //의약품 상세정보 클릭
            driver.findElement(By.cssSelector("#search_identity_result > article:nth-child(3) > div > a.btn05")).click();

            //의약품 상세정보가 없다고 Alert 창이 뜨지 않을 경우         TestCase(NEGABON-F)
            if(ExpectedConditions.alertIsPresent().apply(driver)==null) {

                log.info("약의 정보 추출");
                // 약의 정보 추출
                String effect = driver.findElement(By.xpath("//*[@id=\"effect\"]")).getText();
                String dosage = driver.findElement(By.xpath("//*[@id=\"dosage\"]")).getText();
                String caution = driver.findElement(By.xpath("//*[@id=\"caution\"]")).getText();
                String drug_name_r = driver.findElement(By.xpath("//*[@id='result_drug_name']")).getText();
                String drug_img = driver.findElement(By.xpath("//*[@id='idfy_img_small']")).getAttribute("src");
                String drug_info = driver.findElement(By.xpath("//*[@id='drug_take']")).getText();
                String drug_Manufacturer = driver.findElement(By.xpath("//*[@id='all_upso_tab']" )).getText();
                String drug_Additives = driver.findElement(By.xpath("//*[@id='additives']")).getText();

                log.info("리턴하기 위해 데이터 매핑");
                // 애플리케이션에 Json 형태로 보내주기 위해 데이터 삽입
               ApiResponseBody apiResponseBody = new ApiResponseBody();
               apiResponseBody.setImage(drug_img);
               apiResponseBody.setName(drug_name_r);
               apiResponseBody.setEffect(effect);
               apiResponseBody.setDosage(dosage);
               apiResponseBody.setCaution(caution);
               apiResponseBody.setTake(drug_info);
               apiResponseBody.setMaker(drug_Manufacturer);

                ArrayList arrayList = new ArrayList();
                arrayList.add(apiResponseBody);

                ApiResponseDto responseDto = new ApiResponseDto();
                responseDto.setResBody(arrayList);
                responseDto.setStatus("good");

                // 크롤링한 결과가 DB 에 없음? INSERT : PASS
                log.info("크롤링 후 데이터 DB 에서 찾는데 없다면 데이터 저장");
               if (findPill(apiRequestDto.getDrug_name(), apiRequestDto.getDrug_shape(), apiRequestDto.getDrug_line()) == null) {
                    // DB에 데이터 저장
                    Pill pIll = Pill.builder()
                            .drugDiscrimination(apiRequestDto.getDrug_name())
                            .drugType(apiRequestDto.getDrug_type())
                            .drugShape(apiRequestDto.getDrug_shape())
                            .drugColor(apiRequestDto.getDrug_color())
                            .drugLine(apiRequestDto.getDrug_line())
                            .drugImage(drug_img)
                            .drugName(drug_name_r)
                            .drugEffect(effect)
                            .drugDosage(dosage)
                            .drugCaution(caution)
                            .drugTake(drug_info)
                            .drugMaker(drug_Manufacturer)
                            .build();

                    pillRepository.save(pIll);
                }

                return responseDto;
            }

            //상세정보가 없을경우 Alert 메세지 추출하여 출력 후 ExceptionError
            else{
                log.info("상세정보가 없을 경우에 뜨는 Alert 창 크롤링");
                Alert error = driver.switchTo().alert();
                throw new CustomException(error.getText());
            }

        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        } finally {
            log.info("셀레니움 종료");
            driver.quit();
        }
    }

    // DB에 데이터 찾기
    public Pill findPill(String drugName, String drugShape, String drugLine){
        return pillRepository.findPillByDrugDiscriminationAndDrugShapeAndDrugLine(drugName, drugShape, drugLine);
    }

    // 제형
    public String typeone(String type) {

        switch (type) {
            case "정제": // *[@id="type_01"]
                return "01";
            case "경질캡슐": // *[@id="type_02"]
                return "02";
            case "연질캡슐": // *[@id="type_03"]
                return "03";
            case "기타": // *[@id="type_etc"]
                return "etc";
            default: // *[@id="type_all"]
                return "all";
        }
    }



    // 모양
    public String shapeone(String shape) {

        switch (shape) {
            case "원형": // *[@id="shape_01"]
                return "01";
            case "타원형": // *[@id="shape_02"]
                return "02";
            case "장방형": // *[@id="shape_07"]
                return "07";
            case "반원형": // *[@id="shape_03"]
                return "03";
            case "삼각형ㅇ": // *[@id="shape_04"]
                return "04";
            case "사각형": // *[@id="shape_05"]
                return "05";
            case "마름모형": // *[@id="shape_06"]
                return "06";
            case "오각형": // *[@id="shape_10"]
                return "10";
            case "육각형": // *[@id="shape_09"]
                return "09";
            case "팔각형": // *[@id="shape_08"]
                return "08";
            default: // *[@id="shape_all"]
                return "all";
        }
    }

    // 색상
    public String colorone(String color) {

        switch (color) {
            case "하양": // *[@id="color_white"]
                return "white";
            case "노랑": // *[@id="color_yellow"]
                return "yellow";
            case "주황": // *[@id="color_orange"]
                return "orange";
            case "분홍": // *[@id="color_pink"]
                return "pink";
            case "빨강": // *[@id="color_red"]
                return "red";
            case "갈색": // *[@id="color_brown"]
                return "brown";
            case "연두": // *[@id="color_ygreen"]
                return "ygreen";
            case "초록": // *[@id="color_green"]
                return "green";
            case "청록": // *[@id="color_bgreen]
                return "bgreen";
            case "파랑": // *[@id="color_blue"]
                return "blue";
            case "남색": // *[@id="color_navy"]
                return "navy";
            case "자주": // *[@id="color_wine"]
                return "wine";
            case "보라": // *[@id="color_purple"]
                return "purple";
            case "회색": // *[@id="color_gray"]
                return "gray";
            case "검정": // *[@id="color_black"]
                return "black";
            case "투명": // *[@id="color_transp"]
                return "transp";
            default: // *[@id="color_all"]
                return "all";
        }

    }

    // 분할선
    public String lineone(String line) {

        switch (line) {
            case "없음": // *[@id="line_no"]
                return "no";
            case "플러스형": // *[@id="line_plus"]
                return "plus";
            case "마이너스형": // *[@id="line_minus"]
                return "minus";
            case "기타": // *[@id="line_etc"]
                return "etc";
            default: // *[@id="type_all"]
                return "all";
        }
    }
}