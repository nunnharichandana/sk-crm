package com.sksmartinsurance.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AutomationDoc {
    private String uid; // Document ID = User UID
    private Map<String, Object> dashboardSettings;
    private Map<String, Object> userPreferences;
    private Map<String, Object> recentActivities;
    private String lastLogin;
    private Boolean initialized;
}
