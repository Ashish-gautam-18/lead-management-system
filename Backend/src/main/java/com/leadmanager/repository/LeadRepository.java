package com.leadmanager.repository;

import com.leadmanager.LeadStatus;
import com.leadmanager.entity.Lead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    Page<Lead> findByStatus(LeadStatus status, Pageable pageable);
}