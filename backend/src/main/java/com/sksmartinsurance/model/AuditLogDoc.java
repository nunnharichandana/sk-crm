package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogDoc {
    private String id;
    private String uid;
    private String userEmail;
    private String action; // REGISTER_USER, ASSIGN_ROLE, CREATE_LEAD, CONVERT_CUSTOMER, APPROVE_INVESTMENT, etc.
    private String module; // AUTH, ADMIN, LEADS, CUSTOMERS, INVESTMENTS, INCOME, EXPENSES, TASKS
    private String details;
    private String ipAddress;
    private String timestamp;
}
