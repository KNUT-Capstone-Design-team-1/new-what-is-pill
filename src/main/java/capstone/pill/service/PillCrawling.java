package capstone.pill.service;

import capstone.pill.dto.ApiResponseDto;
import lombok.Builder;
import lombok.Data;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

@Data
@Builder
public class PillCrawling {

    //약 특징 변수
    private String drug_name; // 약 식별문자
    private String drug_type; // 약 제형
    private String drug_shape; // 약 조건 모양
    private String drug_color; // 약 조건 색상
    private String drug_line; // 약 조건 분할선


    // WebDriver 에 필요한 멤버변수
    private WebDriver driver;
    private WebElement webElement;

    // Properties
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "D:/Capstone/chromedriver.exe";
    //리눅스 배포 버전
//    public static final String WEB_DRIVER_PATH = "/usr/local/share/chromedriver";

    // 크롤링 할 URL
    private String base_url;


    public ApiResponseDto crawl() {
        try {

            // System Property SetUp
            System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

            // Driver SetUp
            ChromeOptions options = new ChromeOptions();
            options.setCapability("ignoreProtectedModeSettings", true);
//            options.addArguments("headless");
//            options.addArguments("no-sandbox");
//            options.addArguments("disable-dev-shm-usage");
//            options.addArguments("lang=ko");
            driver = new ChromeDriver(options);
            base_url = "https://www.health.kr/searchIdentity/search.asp";


            // get page (= 브라우저에서 url을 주소창에 넣은 후 request 한 것과 같다)
            driver.get(base_url);

            // iframe 내부에서 id 필드 탐색
            webElement = driver.findElement(By.id("drug_print_front"));

            // 이 약이름 삽입
            webElement.sendKeys(drug_name);

            // 제형 지정
            String type = typeone(drug_type);
            driver.findElement(By.xpath("//*[@id='type_" + type + "']")).click();

            // 모양 지정
            String shape = shapeone(drug_shape);
            driver.findElement(By.xpath("//*[@id='shape_" + shape + "']")).click();

            // 색상 지정
            String color = colorone(drug_color);
            driver.findElement(By.xpath("//*[@id='color_" + color + "']")).click();

            // 분할선 지정
            String line = lineone(drug_line);
            driver.findElement(By.xpath("//*[@id='line_" + line + "']")).click();

            // 검색클릭
            driver.findElement(By.id("btn_idfysearch")).click();
            ;

            Thread.sleep(1000);
            driver.findElement(By.cssSelector("#idfytotal0 > tbody > tr:nth-child(3) > td.txtL.name")).click();


            Thread.sleep(1000);
            driver.findElement(By.cssSelector("#search_identity_result > article:nth-child(3) > div > a.btn05")).click();

            Thread.sleep(1000);
            String effect = driver.findElement(By.xpath("//*[@id=\"effect\"]")).getText();
            String dosage = driver.findElement(By.xpath("//*[@id=\"dosage\"]")).getText();
            String caution = driver.findElement(By.xpath("//*[@id=\"caution\"]")).getText();


            ApiResponseDto responseDto = new ApiResponseDto();
            responseDto.setEffect(effect);
            responseDto.setDosage(dosage);
            responseDto.setCaution(caution);

            return responseDto;
        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            driver.close();
        }
        return null;
    }
    public String typeone(String typeone) {

        switch (drug_type) {
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

    public String shapeone(String shapeone) {

        switch (drug_shape) {
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

    public String colorone(String colorone) {

        switch (drug_color) {
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

    public String lineone(String lineone) {

        switch (drug_line) {
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
