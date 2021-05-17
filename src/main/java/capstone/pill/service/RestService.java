package capstone.pill.service;

import capstone.pill.dto.ApiRequestDto;
import capstone.pill.dto.ApiResponseDto;
import org.springframework.stereotype.Service;

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
}
