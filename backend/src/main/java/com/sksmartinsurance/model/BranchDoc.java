package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BranchDoc {
    private String id;
    private String name;
    private String address;
    private String managerUid;
    private String managerName;
    private String phone;
    private Integer employeeCount;
    private Double activeInvestmentVolume;
    private String status; // ACTIVE, INACTIVE
    private String createdAt;
}
