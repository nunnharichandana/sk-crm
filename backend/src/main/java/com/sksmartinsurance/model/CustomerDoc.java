package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDoc {
    private String id;
    private String customerCode; // CUST-XXXX
    private String name;
    private String email;
    private String mobile;
    private String pan;
    private String aadhaar;
    private String address;
    private String occupation;
    private String nominee;
    private String advisorUid;
    private String advisorName;
    private String branchId;
    private String kycStatus; // VERIFIED, PENDING, REJECTED
    private String notes;
    private String createdAt;
    private String updatedAt;
}
