package capstone.pill.controller;

import capstone.pill.dto.ApiRequestDto;
import capstone.pill.dto.ApiResponseDto;
import capstone.pill.service.PillCrawling;
import capstone.pill.service.RestService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ApiController {

    private final RestService restService;

    @GetMapping("/")
    public String home (){
        return "홈 화면";
    }
    @PostMapping("/search")
    public List<ApiResponseDto> response(@RequestBody ApiRequestDto requestDto){
        List<ApiResponseDto> res = restService.res(requestDto);

        return res;
    }

    @PostMapping("/ml")
    public String mlResponse(@RequestBody ApiRequestDto requestDto){

        return "status ok";
    }

    @PostMapping("/application")
    public applicationResponseTest application(@RequestBody imageRequestDto imageRequestDto){


        log.info("디코딩 전" + imageRequestDto.getImg_base64());

        return new applicationResponseTest("잘~ 받았습니다. 당신도 잘 받으셨나요?");
    }

    @Data
    static class applicationResponseTest{
        private String message;

        public applicationResponseTest(String message) {
            this.message = message;
        }
    }


    @PostMapping("/image")
    public List<ApiResponseDto> search(@RequestBody imageRequestDto imageRequestDto){
        ArrayList<ApiResponseDto> response = restService.toML(imageRequestDto.getImg_base64());

        return response;
    }

    @Data
    static class imageRequestDto{
        private String img_base64;
    }
}
