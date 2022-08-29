package edu.multicampus.restfullapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.multicampus.restfullapi.model.Store;
import edu.multicampus.restfullapi.model.User;
import edu.multicampus.restfullapi.repository.StoreRepository;
import edu.multicampus.restfullapi.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class StoreController {
	@Autowired
	StoreRepository storeRepository;
	
	@Autowired
	UserRepository userRepository;

	@RequestMapping("/stores")
	public ResponseEntity<List<Store>> getAllstores(@Param("storeName") String storeName) {
		try {
			List<Store> stores = new ArrayList<Store>();

			if (storeName != null) {
				stores = storeRepository.search(storeName);
			} else {
				stores = storeRepository.findAll();
			}

			if (storeName.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(stores, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping("/storeUser")
	public ResponseEntity<Store> getStorebyUserId(@Param("storeName") Integer storeName) {
		try {
			Store storesUser = new Store();

			if (storeName !=null) {
				storesUser = storeRepository.search1(storeName);
			}
			else {
				return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(storesUser, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/stores/{id}")
	public ResponseEntity<Store> getBranchById(@PathVariable("id") Integer id) {
		Optional<Store> StoreData = storeRepository.findById(id);

		if (StoreData.isPresent()) {
			return new ResponseEntity<>(StoreData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/stores")
	public ResponseEntity<Store> createBranch(@RequestBody Store store) {
		try {
//			Store newstore = storeRepository.save(new Store(store.getStoreName(), store.getStoreAddress(),
//					store.getStoreEmail(), store.getStorePhone(), store.getStoreImageURL(), store.getUser()));
//			return new ResponseEntity<>(newstore, HttpStatus.CREATED);
			Optional<User> user = userRepository.findById(store.getUser().getId());
			
			if (user.isPresent()) {
				User exstingUser = user.get();

				Store newstore = storeRepository.save(
						new Store(store.getStoreName(), store.getStoreAddress(),
								store.getStoreEmail(), store.getStorePhone(), store.getStoreImageURL(), exstingUser));

				return new ResponseEntity<Store>(newstore, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/stores/{id}")
	public ResponseEntity<Store> updateBranch(@PathVariable("id") Integer id, @RequestBody Store store) {
		Optional<Store> StoreData = storeRepository.findById(id);

		if (StoreData.isPresent()) {
			Store _store = StoreData.get();
			_store.setStoreName(_store.getStoreName());
			_store.setStoreAddress(_store.getStoreAddress());
			_store.setStoreEmail(_store.getStoreEmail());
			_store.setStorePhone(_store.getStorePhone());
			_store.setStoreImageURL(_store.getStoreImageURL());
			return new ResponseEntity<>(storeRepository.save(_store), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/stores/{id}")
	public ResponseEntity<List<Store>> deleteBranch(@PathVariable("id") Integer id) {
		try {
			storeRepository.deleteById(id);
			List<Store> list = new ArrayList<Store>();
			list = storeRepository.findAll();
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

//	@DeleteMapping("/stores")
//	public ResponseEntity<HttpStatus> deleteAllstores() {
//		try {
//			restaurantRepository.deleteAll();
//			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
//		}
//
//	}

}
