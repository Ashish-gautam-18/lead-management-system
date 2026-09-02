package com.leadmanager.security;

import com.leadmanager.entity.User;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class AuthTokenService {

    private final Map<String, User> tokenStore = new ConcurrentHashMap<>();

    public String generateToken(User user) {
        String token = "TOKEN-" + UUID.randomUUID().toString();
        tokenStore.put(token, user);
        return token;
    }

    public User validateAndGetUser(String token) {
        if (token == null || !tokenStore.containsKey(token)) {
            return null;
        }
        return tokenStore.get(token);
    }
}