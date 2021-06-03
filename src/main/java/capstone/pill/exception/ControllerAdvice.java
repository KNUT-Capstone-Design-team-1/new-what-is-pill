package capstone.pill.exception;

import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

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
