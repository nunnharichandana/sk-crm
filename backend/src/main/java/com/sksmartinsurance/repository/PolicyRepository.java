package com.sksmartinsurance.repository;

import com.sksmartinsurance.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    Optional<Policy> findByPolicyNumber(String policyNumber);
    List<Policy> findByPolicyStatusAndDeletedFalse(String status);
    List<Policy> findByCustomerIdAndDeletedFalse(Long customerId);
}
