package capstone.pill.controller;

import capstone.pill.dto.ApiRequestDto;
import capstone.pill.dto.ApiResponseDto;
import capstone.pill.service.RestService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ApiController {

    private final RestService restService;

    @GetMapping("/")
    public String home (){
        return "홈 화면";
    }
    @PostMapping("/search")
    public ApiResponseDto response(@RequestBody ApiRequestDto requestDto){
        ApiResponseDto res = restService.res(requestDto);

        return res;
    }

    @PostMapping("/ml")
    public String mlResponse(@RequestBody ApiRequestDto requestDto){

        return "status ok";
    }

    @PostMapping("/application")
    public String application(@RequestBody imageRequestDto imageRequestDto){
        return "Success";
    }


    @PostMapping("/image")
    public ApiResponseDto search(@RequestBody imageRequestDto imageRequestDto){
        ApiResponseDto response = restService.toML(imageRequestDto.getImg_base64());

        return response;
    }

    @Data
    static class imageRequestDto{
        private String img_base64;
    }
}
