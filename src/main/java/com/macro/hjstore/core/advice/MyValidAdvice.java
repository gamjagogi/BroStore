package com.macro.hjstore.core.advice;

import com.macro.hjstore.core.exception.Exception400;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Aspect
@Component
public class MyValidAdvice {

    @Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void postMapping() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")
    public void getMapping() {
    }

    @Before("postMapping() || getMapping()")
    public void validationAdvice(JoinPoint jp){
        Object[] args = jp.getArgs();
        for(Object arg: args){
            if(arg instanceof Errors){
                Errors errors = (Errors) arg;
                if(errors.hasErrors()){
                    throw new Exception400(
                            errors.getFieldErrors().get(0).getField(),
                            errors.getFieldErrors().get(0).getDefaultMessage()
                    );
                }
            }
        }
    }
}
