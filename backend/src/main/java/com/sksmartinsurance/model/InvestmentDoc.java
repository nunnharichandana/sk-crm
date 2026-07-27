package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentDoc {
    private String id;
    private String investmentId; // INV-2026-XXXX
    private String customerId;
    private String customerName;
    private String advisorUid;
    private String advisorName;
    private String branchId;
    private String type; // SIP, MUTUAL_FUND, FIXED_DEPOSIT, INSURANCE, STOCKS, BONDS, GOLD, REAL_ESTATE
    private Double amount;
    private Integer durationMonths;
    private Double interestRate;
    private Double currentValue;
    private String maturityDate;
    private String status; // PENDING, APPROVED, ACTIVE, COMPLETED, CLOSED
    private String approvedByUid;
    private String createdAt;
    private String updatedAt;
}
