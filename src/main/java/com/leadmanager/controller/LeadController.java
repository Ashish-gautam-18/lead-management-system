package com.leadmanager.controller;

import com.leadmanager.LeadStatus;
import com.leadmanager.dto.PublicCaptureRequest;
import com.leadmanager.dto.UpdateLeadStatusRequest;
import com.leadmanager.entity.Lead;
import com.leadmanager.entity.User;
import com.leadmanager.service.LeadService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping("/public/capture")
    public ResponseEntity<Lead> captureLead(@RequestBody PublicCaptureRequest request) {
        Lead createdLead = leadService.capturePublicLead(request);
        return new ResponseEntity<>(createdLead, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Lead>> getLeads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) LeadStatus status) {
        Page<Lead> leads = leadService.getLeads(page, size, status);
        return ResponseEntity.ok(leads);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Lead> updateLeadStatus(
            @PathVariable Long id,
            @RequestBody UpdateLeadStatusRequest request,
            HttpServletRequest servletRequest) {
        User currentUser = (User) servletRequest.getAttribute("currentUser");
        Lead updatedLead = leadService.updateLeadStatus(id, request, currentUser);
        return ResponseEntity.ok(updatedLead);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }
}