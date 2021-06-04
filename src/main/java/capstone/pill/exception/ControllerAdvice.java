package capstone.pill.exception;

import lombok.Data;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {


    // CustomeException이 발생하면 요청 온곳으로 부터 Json형태로 반환한다.
    @ExceptionHandler(CustomException.class)
    @ResponseBody
    public ExceptionResponse exceptionHandler(RuntimeException e){

        ExceptionResponse exceptionResponse = new ExceptionResponse();
        exceptionResponse.setStatus("bad");
        exceptionResponse.setMessage(e.getMessage());

        return exceptionResponse;
    }

    @Data
    static class ExceptionResponse{
        private String status;
        private String message;
    }
}
