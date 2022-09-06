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

import edu.multicampus.restfullapi.model.CustomerOrder;
import edu.multicampus.restfullapi.model.Product;
import edu.multicampus.restfullapi.model.User;
import edu.multicampus.restfullapi.repository.CustomerOrderRepository;
import edu.multicampus.restfullapi.repository.ProductRepository;
import edu.multicampus.restfullapi.repository.UserRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CustomerOrderController {
	@Autowired
	CustomerOrderRepository customerOrderRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@RequestMapping("/customerOrder")
	public ResponseEntity<List<CustomerOrder>> getAllcustomerOrders(@Param("productId") String productId) {
		try {
			List<CustomerOrder> customerOrder = new ArrayList<CustomerOrder>();
			
			if (productId != null) {
				customerOrder = customerOrderRepository.search(productId);
	        }else {
	        	customerOrder = customerOrderRepository.findAll();
			}
	        
			if (customerOrder.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(customerOrder, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/customerOrder/{id}")
	public ResponseEntity<CustomerOrder> getcustomerOrderById(@PathVariable("id") Integer id) {
		Optional<CustomerOrder> customerOrderData = customerOrderRepository.findById(id);

		if (customerOrderData.isPresent()) {
			return new ResponseEntity<>(customerOrderData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/customerOrder")
	public ResponseEntity<CustomerOrder> createcustomerOrder(@RequestBody CustomerOrder customerOrder) {
		try {
//			Branch branch = new Branch(customerOrder.getBranch().getBranchName(), customerOrder.getBranch().getBranchAddress(), customerOrder.getBranch().getBranchEmail(), 
//					customerOrder.getBranch().getBranchPhone(), customerOrder.getBranch().getBranchManagerName(), customerOrder.getBranch().getBranchCardNumber(), customerOrder.getBranch().getBranchImageURL());
			Optional<Product> product = productRepository.findById(customerOrder.getProduct().getProductId());
			Optional<User> user = userRepository.findById(customerOrder.getUser().getId());
			if(user.isPresent() && product.isPresent()) {
			    Product existingProduct = product.get();
			    User existingUser = user.get();
			    CustomerOrder cusOrder = customerOrderRepository.save(new CustomerOrder(existingProduct, existingUser, customerOrder.getAmount(), customerOrder.getComment(), customerOrder.getRating(), customerOrder.getStatus(), customerOrder.getId()));
				return new ResponseEntity<CustomerOrder>(cusOrder, HttpStatus.CREATED);
			}else {
				return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PutMapping("/customerOrder/{id}")
	public ResponseEntity<CustomerOrder> updatecustomerOrder(@PathVariable("id") Integer id, @RequestBody CustomerOrder customerOrder) {
		Optional<CustomerOrder> customerOrderData = customerOrderRepository.findById(id);

		if (customerOrderData.isPresent()) {
			return new ResponseEntity<CustomerOrder>(customerOrderRepository.save(customerOrder), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/customerOrder/{id}")
	public ResponseEntity<List<CustomerOrder>> deletecustomerOrder(@PathVariable("id") Integer id) {
		try {
			customerOrderRepository.deleteById(id);
			List<CustomerOrder> list = new ArrayList<CustomerOrder>();
			list = customerOrderRepository.findAll();
			return new ResponseEntity<>(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
