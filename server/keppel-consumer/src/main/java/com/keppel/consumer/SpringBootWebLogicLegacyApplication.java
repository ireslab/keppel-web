package com.keppel.consumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;

//Tell Spring to automatically inject any dependencies that are marked in
//our classes with @Autowired
@EnableAutoConfiguration
// Tell Spring that this object represents a Configuration for the
// application
@Configuration
// SpringBootWebLogicLegacyApplication is a SpringBootServletInitializer subclass and override its configure method.
@ComponentScan
public class SpringBootWebLogicLegacyApplication extends SpringBootServletInitializer implements WebApplicationInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SpringBootMainConfig.class).logStartupInfo(true);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SpringBootMainConfig.class, args);
	}
}
