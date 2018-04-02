package com.keppel.consumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class SpringBootMainConfig /*extends SpringBootServletInitializer*/{
	
   /* @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SpringBootMainConfig.class).logStartupInfo(true);
    }*/

	
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(SpringBootMainConfig.class, args);
	}


}
