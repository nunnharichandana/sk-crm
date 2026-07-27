-- ============================================================================
-- SK SMART INSURANCE CRM - MYSQL 8 DATABASE SCHEMA
-- Enterprise Customer Relationship Management System
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `sk_smart_insurance_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sk_smart_insurance_db`;

-- Disable FK checks during table creation
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- 1. BRANCHES & DEPARTMENTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `branches` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `branch_code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `pincode` VARCHAR(20) NOT NULL,
    `address` VARCHAR(255),
    `contact_number` VARCHAR(20),
    `email` VARCHAR(100),
    `is_active` BOOLEAN DEFAULT TRUE,
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` VARCHAR(100),
    `updated_by` VARCHAR(100),
    INDEX `idx_branches_code` (`branch_code`),
    INDEX `idx_branches_active` (`is_active`, `deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `departments` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `description` VARCHAR(255),
    `is_active` BOOLEAN DEFAULT TRUE,
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` VARCHAR(100),
    `updated_by` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 2. ROLES & PERMISSIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE, -- SUPER_ADMIN, ADMIN, REGIONAL_MANAGER, BRANCH_MANAGER, TEAM_LEADER, STAFF_ADVISOR
    `display_name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255),
    `is_system_default` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `permissions` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(100) NOT NULL UNIQUE,
    `module` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `role_permissions` (
    `role_id` BIGINT NOT NULL,
    `permission_id` BIGINT NOT NULL,
    PRIMARY KEY (`role_id`, `permission_id`),
    CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_rp_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 3. USERS (STAFF / MANAGERS / ADMINS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `employee_id` VARCHAR(50) NOT NULL UNIQUE,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `mobile_number` VARCHAR(20) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role_id` BIGINT NOT NULL,
    `branch_id` BIGINT,
    `department_id` BIGINT,
    `manager_id` BIGINT,
    `sales_target` DECIMAL(15,2) DEFAULT 0.00,
    `commission_rate` DECIMAL(5,2) DEFAULT 0.00,
    `is_active` BOOLEAN DEFAULT TRUE,
    `is_account_non_locked` BOOLEAN DEFAULT TRUE,
    `failed_attempt_count` INT DEFAULT 0,
    `lock_time` DATETIME,
    `last_login` DATETIME,
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` VARCHAR(100),
    `updated_by` VARCHAR(100),
    CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
    CONSTRAINT `fk_users_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`),
    CONSTRAINT `fk_users_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
    CONSTRAINT `fk_users_manager` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`),
    INDEX `idx_users_email` (`email`),
    INDEX `idx_users_emp_id` (`employee_id`),
    INDEX `idx_users_role_branch` (`role_id`, `branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 4. INSURANCE COMPANIES & PRODUCTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `insurance_companies` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(150) NOT NULL,
    `logo_url` VARCHAR(255),
    `support_email` VARCHAR(100),
    `support_phone` VARCHAR(20),
    `claim_toll_free` VARCHAR(20),
    `is_active` BOOLEAN DEFAULT TRUE,
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `insurance_products` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `company_id` BIGINT NOT NULL,
    `product_name` VARCHAR(150) NOT NULL,
    `insurance_type` VARCHAR(50) NOT NULL, -- LIFE, HEALTH, MOTOR, BIKE, TRAVEL, HOME, FIRE, MARINE, CORPORATE, PERSONAL_ACCIDENT
    `min_sum_insured` DECIMAL(15,2),
    `max_sum_insured` DECIMAL(15,2),
    `base_commission_percent` DECIMAL(5,2) DEFAULT 0.00,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_ip_company` FOREIGN KEY (`company_id`) REFERENCES `insurance_companies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 5. CUSTOMERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `customer_code` VARCHAR(50) NOT NULL UNIQUE,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150),
    `mobile_number` VARCHAR(20) NOT NULL,
    `whatsapp_number` VARCHAR(20),
    `gender` VARCHAR(20),
    `dob` DATE,
    `occupation` VARCHAR(100),
    `pan_number` VARCHAR(20),
    `aadhaar_number` VARCHAR(20),
    `address` VARCHAR(255),
    `city` VARCHAR(100),
    `state` VARCHAR(100),
    `pincode` VARCHAR(20),
    `assigned_staff_id` BIGINT,
    `branch_id` BIGINT,
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` VARCHAR(100),
    `updated_by` VARCHAR(100),
    CONSTRAINT `fk_customers_staff` FOREIGN KEY (`assigned_staff_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_customers_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`),
    INDEX `idx_cust_mobile` (`mobile_number`),
    INDEX `idx_cust_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 6. LEADS MANAGEMENT
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `lead_code` VARCHAR(50) NOT NULL UNIQUE,
    `customer_name` VARCHAR(150) NOT NULL,
    `mobile_number` VARCHAR(20) NOT NULL,
    `whatsapp_number` VARCHAR(20),
    `email` VARCHAR(150),
    `gender` VARCHAR(20),
    `dob` DATE,
    `occupation` VARCHAR(100),
    `address` VARCHAR(255),
    `city` VARCHAR(100),
    `state` VARCHAR(100),
    `pincode` VARCHAR(20),
    `lead_source` VARCHAR(100), -- WEBSITE, REFERRAL, SOCIAL_MEDIA, COLD_CALL, CAMPAIGN, AGENT
    `insurance_type` VARCHAR(50) NOT NULL, -- LIFE, HEALTH, MOTOR, etc.
    `current_insurance_company` VARCHAR(150),
    `existing_policy_number` VARCHAR(100),
    `existing_policy_expiry` DATE,
    `estimated_premium` DECIMAL(12,2) DEFAULT 0.00,
    `assigned_staff_id` BIGINT,
    `assigned_manager_id` BIGINT,
    `branch_id` BIGINT,
    `priority` VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    `status` VARCHAR(50) DEFAULT 'NEW', -- NEW, CONTACTED, INTERESTED, FOLLOW_UP, DOCUMENTS_PENDING, QUOTATION_SENT, NEGOTIATION, PAYMENT_PENDING, POLICY_ISSUED, RENEWAL, LOST, REJECTED
    `lead_score` INT DEFAULT 50,
    `customer_id` BIGINT,
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` VARCHAR(100),
    `updated_by` VARCHAR(100),
    CONSTRAINT `fk_leads_staff` FOREIGN KEY (`assigned_staff_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_leads_manager` FOREIGN KEY (`assigned_manager_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_leads_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`),
    CONSTRAINT `fk_leads_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
    INDEX `idx_leads_status` (`status`),
    INDEX `idx_leads_staff` (`assigned_staff_id`),
    INDEX `idx_leads_mobile` (`mobile_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 7. FOLLOW-UPS & ACTIVITIES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `followups` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `lead_id` BIGINT NOT NULL,
    `staff_id` BIGINT NOT NULL,
    `followup_type` VARCHAR(50) NOT NULL, -- CALL, MEETING, EMAIL, WHATSAPP, DEMO
    `scheduled_time` DATETIME NOT NULL,
    `status` VARCHAR(30) DEFAULT 'PENDING', -- PENDING, COMPLETED, MISSED, CANCELLED
    `priority` VARCHAR(20) DEFAULT 'MEDIUM',
    `remarks` TEXT,
    `outcome` TEXT,
    `completed_at` DATETIME,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_followups_lead` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_followups_staff` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`),
    INDEX `idx_followup_status_time` (`status`, `scheduled_time`),
    INDEX `idx_followup_lead` (`lead_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 8. POLICIES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `policies` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `policy_number` VARCHAR(100) NOT NULL UNIQUE,
    `customer_id` BIGINT NOT NULL,
    `lead_id` BIGINT,
    `insurance_company_id` BIGINT NOT NULL,
    `insurance_product_id` BIGINT,
    `insurance_type` VARCHAR(50) NOT NULL,
    `sum_insured` DECIMAL(15,2) NOT NULL,
    `gross_premium` DECIMAL(12,2) NOT NULL,
    `net_premium` DECIMAL(12,2) NOT NULL,
    `gst_amount` DECIMAL(12,2) NOT NULL,
    `agent_commission` DECIMAL(12,2) DEFAULT 0.00,
    `issue_date` DATE NOT NULL,
    `start_date` DATE NOT NULL,
    `expiry_date` DATE NOT NULL,
    `policy_status` VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, EXPIRED, CANCELLED, LAPSED, PENDING_RENEWAL
    `payment_mode` VARCHAR(50) DEFAULT 'ONLINE', -- ONLINE, CHEQUE, CASH, NET_BANKING, UPI
    `assigned_staff_id` BIGINT,
    `branch_id` BIGINT,
    `policy_document_url` VARCHAR(255),
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_policy_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
    CONSTRAINT `fk_policy_lead` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`),
    CONSTRAINT `fk_policy_company` FOREIGN KEY (`insurance_company_id`) REFERENCES `insurance_companies` (`id`),
    CONSTRAINT `fk_policy_product` FOREIGN KEY (`insurance_product_id`) REFERENCES `insurance_products` (`id`),
    CONSTRAINT `fk_policy_staff` FOREIGN KEY (`assigned_staff_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_policy_branch` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`),
    INDEX `idx_policy_num` (`policy_number`),
    INDEX `idx_policy_expiry` (`expiry_date`),
    INDEX `idx_policy_status` (`policy_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 9. CLAIMS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `claims` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `claim_number` VARCHAR(100) NOT NULL UNIQUE,
    `policy_id` BIGINT NOT NULL,
    `customer_id` BIGINT NOT NULL,
    `claim_amount` DECIMAL(15,2) NOT NULL,
    `settled_amount` DECIMAL(15,2) DEFAULT 0.00,
    `incident_date` DATE NOT NULL,
    `intimation_date` DATE NOT NULL,
    `status` VARCHAR(50) DEFAULT 'SUBMITTED', -- SUBMITTED, UNDER_INVESTIGATION, DOCUMENTS_REQUIRED, APPROVED, SETTLED, REJECTED
    `rejection_reason` TEXT,
    `hospital_workshop_name` VARCHAR(150),
    `assigned_staff_id` BIGINT,
    `deleted` BOOLEAN DEFAULT FALSE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_claims_policy` FOREIGN KEY (`policy_id`) REFERENCES `policies` (`id`),
    CONSTRAINT `fk_claims_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
    CONSTRAINT `fk_claims_staff` FOREIGN KEY (`assigned_staff_id`) REFERENCES `users` (`id`),
    INDEX `idx_claims_num` (`claim_number`),
    INDEX `idx_claims_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 10. RENEWALS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `renewals` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `policy_id` BIGINT NOT NULL,
    `customer_id` BIGINT NOT NULL,
    `renewal_due_date` DATE NOT NULL,
    `renewed_policy_id` BIGINT,
    `estimated_renewal_premium` DECIMAL(12,2),
    `status` VARCHAR(50) DEFAULT 'UPCOMING', -- UPCOMING, REMINDER_SENT, IN_PROGRESS, RENEWED, LAPSED, OPTED_OUT
    `reminder_count` INT DEFAULT 0,
    `last_reminder_sent_at` DATETIME,
    `assigned_staff_id` BIGINT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_renewals_policy` FOREIGN KEY (`policy_id`) REFERENCES `policies` (`id`),
    CONSTRAINT `fk_renewals_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
    CONSTRAINT `fk_renewals_staff` FOREIGN KEY (`assigned_staff_id`) REFERENCES `users` (`id`),
    INDEX `idx_renewals_due` (`renewal_due_date`),
    INDEX `idx_renewals_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 11. DOCUMENTS & AUDIT LOGS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `documents` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `entity_type` VARCHAR(50) NOT NULL, -- LEAD, CUSTOMER, POLICY, CLAIM
    `entity_id` BIGINT NOT NULL,
    `document_type` VARCHAR(50) NOT NULL, -- PAN, AADHAAR, CHEQUE, VEHICLE_RC, MEDICAL_REPORT, QUOTATION
    `file_name` VARCHAR(255) NOT NULL,
    `file_url` VARCHAR(500) NOT NULL,
    `file_size_kb` INT,
    `uploaded_by_id` BIGINT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_docs_user` FOREIGN KEY (`uploaded_by_id`) REFERENCES `users` (`id`),
    INDEX `idx_docs_entity` (`entity_type`, `entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT,
    `user_email` VARCHAR(150),
    `action` VARCHAR(100) NOT NULL, -- LOGIN, CREATE_LEAD, EDIT_USER, DELETE_POLICY, EXPORT_REPORT, etc.
    `module` VARCHAR(50) NOT NULL,
    `ip_address` VARCHAR(50),
    `details` TEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_audit_user` (`user_id`),
    INDEX `idx_audit_action` (`action`),
    INDEX `idx_audit_time` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
