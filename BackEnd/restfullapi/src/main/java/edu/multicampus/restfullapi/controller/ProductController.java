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

import edu.multicampus.restfullapi.model.Product;
import edu.multicampus.restfullapi.model.Store;
import edu.multicampus.restfullapi.repository.ProductRepository;
import edu.multicampus.restfullapi.repository.StoreRepository;
import edu.multicampus.restfullapi.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProductController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	StoreRepository storeRepository;

	@RequestMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts(@Param("productName") String productName) {
		try {
			List<Product> Products = new ArrayList<Product>();

			if (productName != null) {
				Products = productRepository.search(productName);
			} else {
				Products = productRepository.findAll();
			}

			if (Products.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Products, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping("/productStore")
	public ResponseEntity<List<Product>> getProductByStore(@Param("productName") String productName) {
		try {
			List<Product> Products = new ArrayList<Product>();

			if (productName != null) {
				Products = productRepository.search1(productName);
			} else {
				Products = productRepository.findAll();
			}

			if (Products.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Products, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable("id") Integer id) {
		Optional<Product> ProductData = productRepository.findById(id);

		if (ProductData.isPresent()) {
			return new ResponseEntity<>(ProductData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/products")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		try {
//			Product Product = ProductRepository.save(new Product(Product.getProductTitle(), Product.getProductDate(), Product.getProductTotalMoney(), Product.getEmployee(), Product.getCustomer()));
//			return new ResponseEntity<>(Product, HttpStatus.CREATED);
			Optional<Store> store = storeRepository.findById(product.getStore().getStoreId());

			if (store.isPresent()) {
				Store exstingStore = store.get();

				Product pl = productRepository.save(
						new Product(product.getProductName(), product.getProductType(), product.getProductOldPrice(),
								product.getProductNewPrice(), product.getProductAmount(), product.getProductDate(),
								product.getProductDescription(), product.getProductStatus(), product.getProductImage(),product.getProductAddress(), exstingStore));

				return new ResponseEntity<Product>(pl, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}

	}

	@PutMapping("/products/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable("id") Integer id, @RequestBody Product product) {
		Optional<Product> ProductData = productRepository.findById(id);

		if (ProductData.isPresent()) {
			Product _product = ProductData.get();
			_product.setProductName(_product.getProductName());
			_product.setProductType(_product.getProductType());
			_product.setProductOldPrice(_product.getProductOldPrice());
			_product.setProductNewPrice(_product.getProductNewPrice());
			_product.setProductAmount(_product.getProductAmount());
			_product.setProductDate(_product.getProductDate());
			_product.setProductDescription(_product.getProductDescription());
			_product.setProductStatus(_product.getProductStatus());
			_product.setProductImage(_product.getProductImage());
			_product.setProductAddress(_product.getProductAddress());
			_product.setStore(_product.getStore());
			return new ResponseEntity<>(productRepository.save(_product), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<List<Product>> deleteProduct(@PathVariable("id") Integer id) {
		try {
			productRepository.deleteById(id);
			List<Product> list = new ArrayList<Product>();
			list = productRepository.findAll();
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@GetMapping("/products/getAmount")
	public ResponseEntity<Integer> getProductByStore(@Param("storeId")Integer storeId){
		try {
			List<Product> list = new ArrayList<Product>();
					list = productRepository.getProductByStore(storeId);
					int pAmount = list.size();
		return new ResponseEntity<>(pAmount, HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@GetMapping("/products/getProductByStoreSearch")
	public ResponseEntity<List<Product>> getProductByStoreSearch(@Param("storeId") Integer storeId, @Param("productName") String productName ){
		try {
			List<Product> list = new ArrayList<Product>();
			list = productRepository.getProductByStoreSearch(storeId, productName);
		return new ResponseEntity<>(list, HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
