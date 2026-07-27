package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadDoc {
    private String id;
    private String leadCode; // LD-2026-XXXX
    private String customerName;
    private String mobile;
    private String email;
    private String city;
    private String insuranceType;
    private String investmentInterest;
    private Double estimatedAmount;
    private String assignedEmployeeUid;
    private String assignedEmployeeName;
    private String assignedManagerUid;
    private String branchId;
    private String status; // NEW, CONTACTED, INTERESTED, MEETING_SCHEDULED, PROPOSAL, WON, LOST
    private String priority; // HIGH, MEDIUM, LOW
    private Integer leadScore;
    private String notes;
    private String createdAt;
    private String updatedAt;
}
