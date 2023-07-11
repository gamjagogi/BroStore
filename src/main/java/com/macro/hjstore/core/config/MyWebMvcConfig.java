package com.macro.hjstore.core.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        WebMvcConfigurer.super.addResourceHandlers(registry);
        //절대 file: ///c:/upload
        //상대 ./upload/
        registry
                .addResourceHandler("/upload/**")
                .addResourceLocations("file:"+"./upload/")
                .setCachePeriod(60*60) // 한시간
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry){
//        registry.addInterceptor(adminInterceptor)
//                .addPathPatterns("/admin/**");
//
//        registry.addInterceptor(sellerInterceptor)
//                .addPathPatterns("/seller/**");
    }

    // CORS, Interceptor, Resource, addArgumentResolvers, viewResolver, MessageConverter
}

