package capstone.pill.service;

import capstone.pill.dto.ApiRequestDto;
import capstone.pill.dto.ApiResponseDto;
import capstone.pill.dto.ImageRequestDto;
import capstone.pill.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestService {

    private final PillCrawling pillCrawling;

    @Transactional
    public List<ApiResponseDto> res(ApiRequestDto requestDto){

        ApiResponseDto crawlResult = pillCrawling.crawl(requestDto);
        List<ApiResponseDto> result = new ArrayList<>();

        result.add(crawlResult);
        return result;
    }

    @Transactional
    public ArrayList<ApiResponseDto> toML(String image_url) {

        // 이미지 전송 후 식별문자 리턴 받기
        URI uri = UriComponentsBuilder
                .fromUriString("http://13.125.225.24:5000")
                .path("/data")
                .encode()
                .build()
                .toUri();

        ImageRequestDto imageRequestDto = new ImageRequestDto();
        imageRequestDto.setImg_base64(image_url);

        RequestEntity<ImageRequestDto> requestDto = RequestEntity
                .post(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .body(imageRequestDto);

        RestTemplate restTemplate = new RestTemplate();

        try{
            ResponseEntity<ApiRequestDto> response = restTemplate.exchange(requestDto, ApiRequestDto.class);
            ApiRequestDto responseBody = response.getBody();

            // 리턴받은 식별문자로 크롤링
//            PillCrawling pillCrawling = new PillCrawling();
//            ApiResponseDto crawl = pillCrawling.crawl(responseBody);

            ApiResponseDto crawl = pillCrawling.crawl(responseBody);

            ArrayList<ApiResponseDto> result = new ArrayList<>();

            result.add(crawl);

            return result;
        }catch (RuntimeException e){
            throw new CustomException("인공지능 서버 접속 오류");
        }


    }
}
