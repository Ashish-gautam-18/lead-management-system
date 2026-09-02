package com.leadmanager.dto;

public class PublicCaptureRequest {
    private String name;
    private String email;
    private String notes;

    public PublicCaptureRequest() {
    }

    public PublicCaptureRequest(String name, String email, String notes) {
        this.name = name;
        this.email = email;
        this.notes = notes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}