package com.macro.hjstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HjstoreApplication {
//	@Autowired
//	public static CommandLineRunner init(MyDataInit myDataInit, UserRepository userRepository
//			, BoardRepository boardRepository, TokenRepository tokenRepository) {
//		return myDataInit.init(userRepository,boardRepository,tokenRepository);
//	}
	public static void main(String[] args) {
		SpringApplication.run(HjstoreApplication.class, args);
	}

}
