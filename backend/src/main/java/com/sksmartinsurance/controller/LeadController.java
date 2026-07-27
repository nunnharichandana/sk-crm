package com.sksmartinsurance.controller;

import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final FirestoreService firestoreService;

    public LeadController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @GetMapping
    public ResponseEntity<?> getAllLeads() {
        List<Map<String, Object>> leads = firestoreService.getAllDocuments("leads");
        return ResponseEntity.ok(leads);
    }

    @PostMapping
    public ResponseEntity<?> createLead(@RequestBody Map<String, Object> leadData) {
        String id = "LD-2026-" + System.currentTimeMillis();
        leadData.put("id", id);
        leadData.put("leadCode", id);
        if (!leadData.containsKey("status")) {
            leadData.put("status", "NEW");
        }
        leadData.put("createdAt", Instant.now().toString());

        firestoreService.saveDocument("leads", id, leadData);
        return ResponseEntity.ok(leadData);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Map<String, Object> lead = firestoreService.getDocument("leads", id);
        if (lead == null) {
            return ResponseEntity.notFound().build();
        }

        lead.put("status", status.toUpperCase());
        lead.put("updatedAt", Instant.now().toString());
        firestoreService.saveDocument("leads", id, lead);

        return ResponseEntity.ok(lead);
    }

    @PostMapping("/{id}/convert")
    public ResponseEntity<?> convertLeadToCustomer(@PathVariable String id) {
        Map<String, Object> lead = firestoreService.getDocument("leads", id);
        if (lead == null) {
            return ResponseEntity.notFound().build();
        }

        lead.put("status", "WON");
        lead.put("updatedAt", Instant.now().toString());
        firestoreService.saveDocument("leads", id, lead);

        // Create Customer in Firestore
        String custId = "CUST-" + System.currentTimeMillis();
        Map<String, Object> customer = new HashMap<>();
        customer.put("id", custId);
        customer.put("customerCode", custId);
        customer.put("name", lead.get("customerName"));
        customer.put("mobile", lead.get("mobile"));
        customer.put("email", lead.get("email"));
        customer.put("kycStatus", "VERIFIED");
        customer.put("createdAt", Instant.now().toString());

        firestoreService.saveDocument("customers", custId, customer);

        return ResponseEntity.ok(Map.of("message", "Lead converted to customer successfully", "customer", customer));
    }
}
