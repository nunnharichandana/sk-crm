package com.sksmartinsurance.controller;

import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/income")
public class IncomeController {

    private final FirestoreService firestoreService;

    public IncomeController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @GetMapping
    public ResponseEntity<?> getAllIncome() {
        List<Map<String, Object>> incomeList = firestoreService.getAllDocuments("income");
        return ResponseEntity.ok(incomeList);
    }

    @PostMapping
    public ResponseEntity<?> createIncome(@RequestBody Map<String, Object> incomeData) {
        String id = "INC-2026-" + System.currentTimeMillis();
        incomeData.put("id", id);
        incomeData.put("incomeId", id);
        if (!incomeData.containsKey("status")) {
            incomeData.put("status", "RECEIVED");
        }
        incomeData.put("createdAt", Instant.now().toString());
        firestoreService.saveDocument("income", id, incomeData);
        return ResponseEntity.ok(incomeData);
    }
}
