package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncomeDoc {
    private String id;
    private String incomeId; // INC-2026-XXXX
    private String investmentId;
    private String customerId;
    private String customerName;
    private String advisorUid;
    private Double amount;
    private String type; // COMMISSION, BROKERAGE, INTEREST, DIVIDEND, PROFIT_SHARE, CONSULTATION_FEE
    private String receivedDate;
    private String status; // PENDING, RECEIVED, CANCELLED
    private String createdAt;
}
