package com.ssafy.babyspot.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI customOpenAPI() {
		Server server = new Server();
		server.setUrl("https://j12a607.p.ssafy.io");

		return new OpenAPI()
			.info(new Info()
				.title("BabySpot API 문서")
				.version("1.0")
				.description("Swagger를 통한 API 명세입니다.")
			)
			.servers(List.of(server)) // 추가
			.addSecurityItem(new SecurityRequirement().addList("cookieAuth"))
			.components(new Components()
				.addSecuritySchemes("cookieAuth",
					new SecurityScheme()
						.name("JSESSIONID")
						.type(SecurityScheme.Type.APIKEY)
						.in(SecurityScheme.In.COOKIE)
				)
			);
	}
}