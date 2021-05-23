package capstone.pill.service;

import capstone.pill.dto.ApiRequestDto;
import capstone.pill.dto.ApiResponseDto;
import capstone.pill.dto.ImageRequestDto;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class RestService {

    public ApiResponseDto res(ApiRequestDto requestDto){
        // 크롤링
        PillCrawling crawling =
                PillCrawling.builder()
                        .drug_name(requestDto.getDrug_name())
                        .drug_type(requestDto.getDrug_type())
                        .drug_shape(requestDto.getDrug_shape())
                        .drug_color(requestDto.getDrug_color())
                        .drug_line(requestDto.getDrug_line())
                        .build();

        ApiResponseDto crawlResult = crawling.crawl();
        return crawlResult;
    }


    public ApiResponseDto toML(String image_url) {

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
        ResponseEntity<ApiRequestDto> response = restTemplate.exchange(requestDto, ApiRequestDto.class);
        ApiRequestDto responseBody = response.getBody();

        // 리턴받은 식별문자로 크롤링
        PillCrawling crawling = PillCrawling.builder()
                .drug_name(responseBody.getDrug_name())
                .drug_type(responseBody.getDrug_type())
                .drug_shape(responseBody.getDrug_shape())
                .drug_color(responseBody.getDrug_color())
                .drug_line(responseBody.getDrug_line())
                .build();

        ApiResponseDto result_crawling = crawling.crawl();

        return result_crawling;

    }
}
