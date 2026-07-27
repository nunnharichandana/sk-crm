package com.sksmartinsurance.controller;

import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final FirestoreService firestoreService;

    public AdminController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @PostMapping("/role")
    public ResponseEntity<?> assignRole(@RequestBody Map<String, String> request) {
        String uid = request.get("uid");
        String role = request.get("role");

        if (uid == null || role == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "UID and Role are required"));
        }

        Map<String, Object> userDoc = firestoreService.getDocument("users", uid);
        if (userDoc == null) {
            userDoc = new HashMap<>();
            userDoc.put("uid", uid);
            userDoc.put("email", uid + "@sksmartinvestments.com");
            userDoc.put("status", "ACTIVE");
        }

        userDoc.put("role", role.toUpperCase());
        userDoc.put("updatedAt", Instant.now().toString());

        firestoreService.saveDocument("users", uid, userDoc);

        // Record Audit Log
        Map<String, Object> audit = new HashMap<>();
        audit.put("id", "AUD-" + System.currentTimeMillis());
        audit.put("action", "ASSIGN_ROLE");
        audit.put("module", "ADMIN");
        audit.put("details", "Assigned role " + role + " to user UID " + uid);
        audit.put("timestamp", Instant.now().toString());
        firestoreService.saveDocument("auditLogs", (String) audit.get("id"), audit);

        return ResponseEntity.ok(Map.of(
            "message", "Role updated successfully",
            "uid", uid,
            "role", role.toUpperCase()
        ));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<Map<String, Object>> users = firestoreService.getAllDocuments("users");
        return ResponseEntity.ok(users);
    }

    @GetMapping("/branches")
    public ResponseEntity<?> getAllBranches() {
        List<Map<String, Object>> branches = firestoreService.getAllDocuments("branches");
        return ResponseEntity.ok(branches);
    }

    @PostMapping("/branches")
    public ResponseEntity<?> createBranch(@RequestBody Map<String, Object> branchData) {
        String id = "BR-" + System.currentTimeMillis();
        branchData.put("id", id);
        branchData.put("createdAt", Instant.now().toString());
        firestoreService.saveDocument("branches", id, branchData);
        return ResponseEntity.ok(branchData);
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<?> getAuditLogs() {
        List<Map<String, Object>> logs = firestoreService.getAllDocuments("auditLogs");
        return ResponseEntity.ok(logs);
    }
}
