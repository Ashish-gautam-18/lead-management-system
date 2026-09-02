package com.leadmanager.security;

import com.leadmanager.Role;
import com.leadmanager.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class SecurityInterceptor implements HandlerInterceptor {

    private final AuthTokenService authTokenService;

    public SecurityInterceptor(AuthTokenService authTokenService) {
        this.authTokenService = authTokenService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getRequestURI();
        String method = request.getMethod();

        // 1. Preflight (OPTIONS) रिक्वेस्ट को बिना टोकन पास होने दें (CORS के लिए सबसे जरूरी)
        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }

        // 2. Public APIs को अलाउ करें
        if (path.startsWith("/api/auth/") || path.startsWith("/api/leads/public/")) {
            return true;
        }

        // 3. Authorization Header चेक करें
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Missing or invalid Authorization header\"}");
            return false;
        }

        String token = authHeader.substring(7);
        User currentUser = authTokenService.validateAndGetUser(token);

        if (currentUser == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Invalid or expired token\"}");
            return false;
        }

        request.setAttribute("currentUser", currentUser);

        // 4. Role based permissions
        if (path.startsWith("/api/leads") && method.equals("GET")) {
            if (currentUser.getRole() == Role.ADMIN || currentUser.getRole() == Role.MEMBER) {
                return true;
            }
        }

        if (path.matches("^/api/leads/\\d+/status$") && method.equals("PUT")) {
            if (currentUser.getRole() == Role.ADMIN || currentUser.getRole() == Role.MEMBER) {
                return true;
            }
        }

        if (currentUser.getRole() == Role.ADMIN) {
            return true;
        }

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Forbidden: Insufficient privileges\"}");
        return false;
    }
}