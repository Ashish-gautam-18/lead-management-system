package com.leadmanager.service;

import com.leadmanager.dto.LoginRequest;
import com.leadmanager.dto.LoginResponse;
import com.leadmanager.entity.User;
import com.leadmanager.repository.UserRepository;
import com.leadmanager.security.AuthTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthTokenService authTokenService;

    public AuthService(UserRepository userRepository, AuthTokenService authTokenService) {
        this.userRepository = userRepository;
        this.authTokenService = authTokenService;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        String token = authTokenService.generateToken(user);
        return new LoginResponse(token, user.getUsername(), user.getRole());
    }
}