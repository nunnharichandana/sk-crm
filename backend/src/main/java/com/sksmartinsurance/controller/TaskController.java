package com.sksmartinsurance.controller;

import com.sksmartinsurance.service.FirestoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final FirestoreService firestoreService;

    public TaskController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        List<Map<String, Object>> tasks = firestoreService.getAllDocuments("tasks");
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Map<String, Object> taskData) {
        String id = "TSK-2026-" + System.currentTimeMillis();
        taskData.put("id", id);
        if (!taskData.containsKey("status")) {
            taskData.put("status", "PENDING");
        }
        taskData.put("createdAt", Instant.now().toString());
        firestoreService.saveDocument("tasks", id, taskData);
        return ResponseEntity.ok(taskData);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateTaskStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Map<String, Object> task = firestoreService.getDocument("tasks", id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }

        task.put("status", status.toUpperCase());
        task.put("updatedAt", Instant.now().toString());
        firestoreService.saveDocument("tasks", id, task);
        return ResponseEntity.ok(task);
    }
}
