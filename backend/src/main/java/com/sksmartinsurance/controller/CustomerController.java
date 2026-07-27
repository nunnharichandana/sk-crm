package com.sksmartinsurance.controller;

import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final FirestoreService firestoreService;

    public CustomerController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @GetMapping
    public ResponseEntity<?> getAllCustomers() {
        List<Map<String, Object>> customers = firestoreService.getAllDocuments("customers");
        return ResponseEntity.ok(customers);
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody Map<String, Object> customerData) {
        String id = "CUST-" + System.currentTimeMillis();
        customerData.put("id", id);
        customerData.put("customerCode", id);
        customerData.put("createdAt", Instant.now().toString());
        firestoreService.saveDocument("customers", id, customerData);
        return ResponseEntity.ok(customerData);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable String id) {
        Map<String, Object> customer = firestoreService.getDocument("customers", id);
        if (customer == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(customer);
    }
}
