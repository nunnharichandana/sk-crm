package com.sksmartinsurance.controller;

import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    private final FirestoreService firestoreService;

    public InvestmentController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @GetMapping
    public ResponseEntity<?> getAllInvestments() {
        List<Map<String, Object>> investments = firestoreService.getAllDocuments("investments");
        return ResponseEntity.ok(investments);
    }

    @PostMapping
    public ResponseEntity<?> createInvestment(@RequestBody Map<String, Object> investmentData) {
        String id = "INV-2026-" + System.currentTimeMillis();
        investmentData.put("id", id);
        investmentData.put("investmentId", id);
        if (!investmentData.containsKey("status")) {
            investmentData.put("status", "PENDING"); // Default status: PENDING
        }
        investmentData.put("createdAt", Instant.now().toString());

        firestoreService.saveDocument("investments", id, investmentData);

        return ResponseEntity.ok(investmentData);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveInvestment(@PathVariable String id, @RequestBody(required = false) Map<String, String> body) {
        Map<String, Object> investment = firestoreService.getDocument("investments", id);
        if (investment == null) {
            return ResponseEntity.notFound().build();
        }

        investment.put("status", "ACTIVE");
        investment.put("updatedAt", Instant.now().toString());
        firestoreService.saveDocument("investments", id, investment);

        return ResponseEntity.ok(investment);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Map<String, Object> investment = firestoreService.getDocument("investments", id);
        if (investment == null) {
            return ResponseEntity.notFound().build();
        }

        investment.put("status", status.toUpperCase());
        investment.put("updatedAt", Instant.now().toString());
        firestoreService.saveDocument("investments", id, investment);

        return ResponseEntity.ok(investment);
    }
}
