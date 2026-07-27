package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDoc {
    private String id;
    private String branchId;
    private String category; // SALARY, RENT, ELECTRICITY, INTERNET, FUEL, MARKETING, OFFICE_SUPPLIES, MISCELLANEOUS
    private Double amount;
    private String expenseDate;
    private String description;
    private String createdUid;
    private String createdAt;
}
