package com.sksmartinsurance.controller;

import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final FirestoreService firestoreService;

    public ExpenseController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @GetMapping
    public ResponseEntity<?> getAllExpenses() {
        List<Map<String, Object>> expenses = firestoreService.getAllDocuments("expenses");
        return ResponseEntity.ok(expenses);
    }

    @PostMapping
    public ResponseEntity<?> createExpense(@RequestBody Map<String, Object> expenseData) {
        String id = "EXP-2026-" + System.currentTimeMillis();
        expenseData.put("id", id);
        expenseData.put("createdAt", Instant.now().toString());
        firestoreService.saveDocument("expenses", id, expenseData);
        return ResponseEntity.ok(expenseData);
    }
}
