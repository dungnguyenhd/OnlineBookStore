package edu.multicampus.restfullapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import edu.multicampus.restfullapi.model.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {
	@Query(value ="SELECT * FROM stores s WHERE s.id",nativeQuery = true)
    public List<Store> search(String search);
}
