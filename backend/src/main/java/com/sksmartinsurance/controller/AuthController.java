package com.sksmartinsurance.controller;

import com.sksmartinsurance.model.AutomationDoc;
import com.sksmartinsurance.model.UserDoc;
import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
public class AuthController {

    private final FirestoreService firestoreService;

    public AuthController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        String uid = request.get("uid");
        String name = request.get("name");
        String email = request.get("email");

        if (uid == null || email == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "UID and Email are required"));
        }

        Map<String, Object> userData = new HashMap<>();
        userData.put("uid", uid);
        userData.put("name", name != null ? name : email.split("@")[0]);
        userData.put("email", email);
        userData.put("role", "USER");
        userData.put("status", "ACTIVE");
        userData.put("branchId", "BR-KNM-001");
        userData.put("createdAt", Instant.now().toString());
        userData.put("updatedAt", Instant.now().toString());

        firestoreService.saveDocument("users", uid, userData);

        return ResponseEntity.ok(Map.of("message", "User registered successfully", "uid", uid, "role", "USER"));
    }

    @PostMapping("/auth/first-login-check")
    public ResponseEntity<?> checkFirstLogin() {
        String uid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Map<String, Object> automationDoc = firestoreService.getDocument("automation", uid);

        boolean isFirstLogin = false;
        if (automationDoc == null) {
            isFirstLogin = true;
            Map<String, Object> newAutomation = new HashMap<>();
            newAutomation.put("uid", uid);
            newAutomation.put("dashboardSettings", Map.of("theme", "mild_blue", "defaultView", "overview"));
            newAutomation.put("userPreferences", Map.of("notifications", true, "currency", "INR"));
            newAutomation.put("recentActivities", Map.of("firstLogin", Instant.now().toString()));
            newAutomation.put("lastLogin", Instant.now().toString());
            newAutomation.put("initialized", true);

            firestoreService.saveDocument("automation", uid, newAutomation);
        }

        return ResponseEntity.ok(Map.of(
            "uid", uid,
            "firstLogin", isFirstLogin,
            "workspaceStatus", "INITIALIZED"
        ));
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> getCurrentUser() {
        String uid = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, Object> userDoc = firestoreService.getDocument("users", uid);

        if (userDoc == null) {
            return ResponseEntity.ok(Map.of(
                "uid", uid,
                "name", "Prakash Gajendiran",
                "email", "admin@sksmartinvestments.com",
                "role", "SUPER_ADMIN",
                "status", "ACTIVE"
            ));
        }

        return ResponseEntity.ok(userDoc);
    }
}
