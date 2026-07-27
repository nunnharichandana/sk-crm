-- ============================================================================
-- SK SMART INSURANCE CRM - MYSQL 8 SEED DATA
-- Seed Data for Default Roles, System Users, Branches, Companies & Demo Data
-- ============================================================================

USE `sk_smart_insurance_db`;

-- 1. ROLES
INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `is_system_default`) VALUES
(1, 'SUPER_ADMIN', 'Super Admin', 'Full system access and configurations', TRUE),
(2, 'ADMIN', 'Administrator', 'Administrative access to users, roles and settings', TRUE),
(3, 'REGIONAL_MANAGER', 'Regional Manager', 'Monitors multiple branches and regional targets', TRUE),
(4, 'BRANCH_MANAGER', 'Branch Manager', 'Manages branch operations, team performance and lead distribution', TRUE),
(5, 'TEAM_LEADER', 'Team Leader', 'Leads team of advisors and reviews follow-ups', TRUE),
(6, 'STAFF_ADVISOR', 'Insurance Advisor', 'Handles client leads, follow-ups, policy issuance and renewals', TRUE);

-- 2. BRANCHES
INSERT INTO `branches` (`id`, `branch_code`, `name`, `city`, `state`, `pincode`, `address`, `contact_number`, `email`) VALUES
(1, 'BR-HQ-001', 'Corporate Headquarters', 'Mumbai', 'Maharashtra', '400001', 'Nariman Point, Financial District', '+91 22 6600 1100', 'hq@sksmartinsurance.com'),
(2, 'BR-DL-002', 'Delhi NCR Branch', 'New Delhi', 'Delhi', '110001', 'Connaught Place, Inner Circle', '+91 11 4400 2200', 'delhi@sksmartinsurance.com'),
(3, 'BR-BLR-003', 'Bengaluru Tech Hub', 'Bengaluru', 'Karnataka', '560001', 'MG Road, Commercial Center', '+91 80 5500 3300', 'blr@sksmartinsurance.com'),
(4, 'BR-HYD-004', 'Hyderabad Cyber Branch', 'Hyderabad', 'Telangana', '500081', 'HITEC City, Tech Park', '+91 40 7700 4400', 'hyd@sksmartinsurance.com');

-- 3. DEPARTMENTS
INSERT INTO `departments` (`id`, `name`, `description`) VALUES
(1, 'Health & Term Life', 'Retail personal insurance portfolio'),
(2, 'Motor & General Insurance', 'Two-wheeler, four-wheeler and commercial vehicles'),
(3, 'Corporate & Commercial Risks', 'Fire, Marine, Group Health, Liability'),
(4, 'Claims Settlement & Customer Care', 'Claims processing and policy endorsement support');

-- 4. USERS (BCrypt encrypted passwords for default password: Password@123 -> $2a$10$7zB... / demo fallback)
INSERT INTO `users` (`id`, `employee_id`, `first_name`, `last_name`, `email`, `mobile_number`, `password_hash`, `role_id`, `branch_id`, `department_id`, `sales_target`, `commission_rate`) VALUES
(1, 'EMP001', 'Rajesh', 'Kumar', 'superadmin@sksmartinsurance.com', '+91 9876543210', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym55p.u0D1q9c1P2g5Xw4i', 1, 1, 1, 5000000.00, 10.00),
(2, 'EMP002', 'Sunita', 'Sharma', 'admin@sksmartinsurance.com', '+91 9876543211', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym55p.u0D1q9c1P2g5Xw4i', 2, 1, 1, 3000000.00, 8.50),
(3, 'EMP003', 'Vikram', 'Aditya', 'regional.north@sksmartinsurance.com', '+91 9876543212', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym55p.u0D1q9c1P2g5Xw4i', 3, 2, 2, 2500000.00, 7.50),
(4, 'EMP004', 'Ananya', 'Deshmukh', 'bm.mumbai@sksmartinsurance.com', '+91 9876543213', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym55p.u0D1q9c1P2g5Xw4i', 4, 1, 1, 1500000.00, 6.00),
(5, 'EMP005', 'Rohan', 'Mehta', 'tl.health@sksmartinsurance.com', '+91 9876543214', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym55p.u0D1q9c1P2g5Xw4i', 5, 1, 1, 1000000.00, 5.00),
(6, 'EMP006', 'Priya', 'Nair', 'priya.advisor@sksmartinsurance.com', '+91 9876543215', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym55p.u0D1q9c1P2g5Xw4i', 6, 1, 1, 500000.00, 4.50),
(7, 'EMP007', 'Amit', 'Verma', 'amit.advisor@sksmartinsurance.com', '+91 9876543216', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVym55p.u0D1q9c1P2g5Xw4i', 6, 2, 2, 500000.00, 4.50);

-- 5. INSURANCE COMPANIES
INSERT INTO `insurance_companies` (`id`, `code`, `name`, `support_email`, `claim_toll_free`) VALUES
(1, 'HDFC_ERGO', 'HDFC ERGO General Insurance', 'care@hdfcergo.com', '1800-266-6444'),
(2, 'ICICI_LOMBARD', 'ICICI Lombard General Insurance', 'customersupport@icicilombard.com', '1800-266-6'),
(3, 'STAR_HEALTH', 'Star Health and Allied Insurance', 'support@starhealth.in', '1800-425-2255'),
(4, 'TATA_AIG', 'Tata AIG General Insurance', 'customersupport@tataaig.com', '1800-266-7780'),
(5, 'CARE_HEALTH', 'Care Health Insurance', 'customerfirst@careinsurance.com', '1800-102-4488');

-- 6. PRODUCTS
INSERT INTO `insurance_products` (`id`, `company_id`, `product_name`, `insurance_type`, `min_sum_insured`, `max_sum_insured`, `base_commission_percent`) VALUES
(1, 3, 'Comprehensive Optima Health', 'HEALTH', 500000.00, 5000000.00, 15.00),
(2, 1, 'My:Optima Secure Health Plan', 'HEALTH', 1000000.00, 10000000.00, 18.00),
(3, 4, 'Auto Secure Private Car Package', 'MOTOR', 200000.00, 3000000.00, 12.50),
(4, 2, 'iProtect Smart Term Plan', 'LIFE', 2500000.00, 50000000.00, 25.00),
(5, 5, 'Care Supreme Super Topup', 'HEALTH', 1000000.00, 20000000.00, 14.00);

-- 7. CUSTOMERS
INSERT INTO `customers` (`id`, `customer_code`, `first_name`, `last_name`, `email`, `mobile_number`, `whatsapp_number`, `city`, `state`, `assigned_staff_id`, `branch_id`) VALUES
(1, 'CUST-1001', 'Arjun', 'Singhania', 'arjun.s@gmail.com', '+91 9988776655', '+91 9988776655', 'Mumbai', 'Maharashtra', 6, 1),
(2, 'CUST-1002', 'Deepika', 'Padukone', 'deepika.p@outlook.com', '+91 9988776644', '+91 9988776644', 'Bengaluru', 'Karnataka', 6, 1),
(3, 'CUST-1003', 'Suresh', 'Raina', 'suresh.r@yahoo.com', '+91 9988776633', '+91 9988776633', 'Delhi', 'Delhi', 7, 2);

-- 8. LEADS
INSERT INTO `leads` (`id`, `lead_code`, `customer_name`, `mobile_number`, `email`, `lead_source`, `insurance_type`, `estimated_premium`, `assigned_staff_id`, `branch_id`, `priority`, `status`, `lead_score`) VALUES
(1, 'LD-2026-001', 'Rahul Dravid', '+91 9811122233', 'rahul.d@cricket.in', 'WEBSITE', 'HEALTH', 35000.00, 6, 1, 'HIGH', 'INTERESTED', 85),
(2, 'LD-2026-002', 'Kavita Menon', '+91 9822233344', 'kavita.m@techcorp.com', 'REFERRAL', 'LIFE', 65000.00, 6, 1, 'URGENT', 'QUOTATION_SENT', 92),
(3, 'LD-2026-003', 'Venkatesh Iyer', '+91 9833344455', 'venky.i@gmail.com', 'SOCIAL_MEDIA', 'MOTOR', 18500.00, 7, 2, 'MEDIUM', 'CONTACTED', 65),
(4, 'LD-2026-004', 'Neha Agarwal', '+91 9844455566', 'neha.a@fintech.io', 'CAMPAIGN', 'HEALTH', 42000.00, 6, 1, 'HIGH', 'POLICY_ISSUED', 100);

-- 9. POLICIES
INSERT INTO `policies` (`id`, `policy_number`, `customer_id`, `lead_id`, `insurance_company_id`, `insurance_product_id`, `insurance_type`, `sum_insured`, `gross_premium`, `net_premium`, `gst_amount`, `issue_date`, `start_date`, `expiry_date`, `policy_status`, `assigned_staff_id`, `branch_id`) VALUES
(1, 'POL-HDFC-2026-78901', 1, 4, 1, 2, 'HEALTH', 1000000.00, 42000.00, 35593.22, 6406.78, '2026-01-15', '2026-01-15', '2027-01-14', 'ACTIVE', 6, 1),
(2, 'POL-STAR-2025-45612', 2, NULL, 3, 1, 'HEALTH', 500000.00, 24500.00, 20762.71, 3737.29, '2025-08-10', '2025-08-10', '2026-08-09', 'PENDING_RENEWAL', 6, 1);

-- 10. AUDIT LOGS
INSERT INTO `audit_logs` (`id`, `user_id`, `user_email`, `action`, `module`, `ip_address`, `details`) VALUES
(1, 1, 'superadmin@sksmartinsurance.com', 'LOGIN', 'AUTHENTICATION', '192.168.1.100', 'Super admin logged into CRM panel'),
(2, 6, 'priya.advisor@sksmartinsurance.com', 'POLICY_ISSUED', 'POLICY_MODULE', '192.168.1.105', 'Policy POL-HDFC-2026-78901 issued for customer Arjun Singhania');

