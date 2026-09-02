package com.leadmanager.config;

import com.leadmanager.Role;
import com.leadmanager.entity.User;
import com.leadmanager.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DatabaseSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }

        if (userRepository.findByUsername("member").isEmpty()) {
            User member = new User();
            member.setUsername("member");
            member.setPassword("member123");
            member.setRole(Role.MEMBER);
            userRepository.save(member);
        }
    }
}