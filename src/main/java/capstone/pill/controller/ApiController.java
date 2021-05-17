package capstone.pill.controller;

import capstone.pill.dto.ApiRequestDto;
import capstone.pill.dto.ApiResponseDto;
import capstone.pill.service.RestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ApiController {

    private final RestService restService;

    @PostMapping("/search")
    public ApiResponseDto response(@RequestBody ApiRequestDto requestDto){
        ApiResponseDto res = restService.res(requestDto);

        return res;

    }
}
