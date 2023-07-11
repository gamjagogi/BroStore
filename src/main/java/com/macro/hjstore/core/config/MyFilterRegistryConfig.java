package com.macro.hjstore.core.config;

import com.macro.hjstore.core.filter.MyTempFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyFilterRegistryConfig {
    @Bean
    FilterRegistrationBean<?>filter1(){
        FilterRegistrationBean<MyTempFilter> registry = new FilterRegistrationBean<>();
        registry.setFilter(new MyTempFilter());
        registry.addUrlPatterns("/*");
        registry.setOrder(1);
        return registry;
    }
}
