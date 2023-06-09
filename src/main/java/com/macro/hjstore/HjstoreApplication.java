package com.macro.hjstore;

import com.macro.hjstore.core.dummy.MyDataInit;
import com.macro.hjstore.model.board.BoardRepository;
import com.macro.hjstore.model.token.TokenRepository;
import com.macro.hjstore.model.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

@SpringBootApplication
public class HjstoreApplication {
	@Autowired
	public static CommandLineRunner init(MyDataInit myDataInit, UserRepository userRepository
			, BoardRepository boardRepository, TokenRepository tokenRepository) {
		return myDataInit.init(userRepository,boardRepository,tokenRepository);
	}
	public static void main(String[] args) {

		SpringApplication.run(HjstoreApplication.class, args);
	}


}
