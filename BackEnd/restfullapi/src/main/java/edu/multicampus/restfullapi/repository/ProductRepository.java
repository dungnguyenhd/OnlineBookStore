package edu.multicampus.restfullapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import edu.multicampus.restfullapi.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	@Query(value ="SELECT * FROM products p WHERE p.product_name LIKE %?1%"
			+ " OR p.product_type LIKE %?1%",nativeQuery = true)
    public List<Product> search(String search);
	
	@Query(value ="SELECT * FROM products p WHERE p.store_id = ?",nativeQuery = true)
    public List<Product> search1(Integer storeId);
	
	@Query(value ="SELECT * FROM products p WHERE p.store_id = ?",nativeQuery = true)
	public List<Product> getProductByStore(Integer storeId);
	
	@Query(value ="SELECT * FROM products p WHERE p.store_id = ? AND p.product_name LIKE %?%",nativeQuery = true)
	public List<Product> getProductByStoreSearch(Integer storeId, String productName);

}
