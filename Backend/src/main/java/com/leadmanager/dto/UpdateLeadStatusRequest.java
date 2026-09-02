package com.leadmanager.dto;

import com.leadmanager.LeadStatus;

public class UpdateLeadStatusRequest {
    private LeadStatus status;
    private String notes;
    private Long assignedTo;

    public UpdateLeadStatusRequest() {
    }

    public UpdateLeadStatusRequest(LeadStatus status, String notes, Long assignedTo) {
        this.status = status;
        this.notes = notes;
        this.assignedTo = assignedTo;
    }

    public LeadStatus getStatus() {
        return status;
    }

    public void setStatus(LeadStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Long assignedTo) {
        this.assignedTo = assignedTo;
    }
}