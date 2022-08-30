package edu.multicampus.restfullapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.multicampus.restfullapi.model.CustomerOrder;

public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer> {
	@Query(value ="SELECT * FROM customer_order c WHERE c.product_id = ?",nativeQuery = true)
    public List<CustomerOrder> search(String search);
}
