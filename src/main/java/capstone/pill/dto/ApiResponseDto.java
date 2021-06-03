package capstone.pill.dto;

import lombok.Data;

@Data
public class ApiResponseDto<ApiResponseBody> {

    private String status;
    private ApiResponseBody resBody;



}
