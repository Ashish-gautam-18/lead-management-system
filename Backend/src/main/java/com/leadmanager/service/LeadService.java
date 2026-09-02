package com.leadmanager.service;

import com.leadmanager.LeadStatus;
import com.leadmanager.Role;
import com.leadmanager.dto.PublicCaptureRequest;
import com.leadmanager.dto.UpdateLeadStatusRequest;
import com.leadmanager.entity.Lead;
import com.leadmanager.entity.User;
import com.leadmanager.repository.LeadRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    public Lead capturePublicLead(PublicCaptureRequest request) {
        Lead lead = new Lead();
        lead.setName(request.getName());
        lead.setEmail(request.getEmail());
        lead.setNotes(request.getNotes());
        lead.setStatus(LeadStatus.NEW);
        return leadRepository.save(lead);
    }

    public Page<Lead> getLeads(int page, int size, LeadStatus status) {
        Pageable pageable = PageRequest.of(page, size);
        if (status != null) {
            return leadRepository.findByStatus(status, pageable);
        }
        return leadRepository.findAll(pageable);
    }

    public Lead updateLeadStatus(Long id, UpdateLeadStatusRequest request, User currentUser) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lead not found"));

        if (request.getStatus() != null) {
            lead.setStatus(request.getStatus());
        }

        if (request.getNotes() != null) {
            lead.setNotes(request.getNotes());
        }

        if (currentUser.getRole() == Role.MEMBER && request.getAssignedTo() != null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Members cannot change lead assignment");
        }

        if (currentUser.getRole() == Role.ADMIN && request.getAssignedTo() != null) {
            lead.setAssignedTo(request.getAssignedTo());
        }

        return leadRepository.save(lead);
    }
    
    public void deleteLead(Long id) {
        if (!leadRepository.existsById(id)) {
            throw new RuntimeException("Lead not found with id: " + id);
        }
        leadRepository.deleteById(id);
    }
}