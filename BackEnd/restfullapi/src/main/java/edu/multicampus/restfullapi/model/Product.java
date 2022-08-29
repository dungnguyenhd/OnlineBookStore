package edu.multicampus.restfullapi.model;

import java.sql.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int productId;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "product_type")
	private String productType;
	
	@Column(name = "product_image")
	private String productImage;
	
	@Column(name = "product_oldPrice")
	private int productOldPrice;
	
	@Column(name = "product_newPrice")
	private int productNewPrice;
	
	@Column(name ="product_amount")
	private int productAmount;
	
	@Column(name ="product_date")
	private Date productDate;
	
	@Column(name = "product_description", length = 500)
	private String productDescription;
	
	@Column(name= "product_status")
	private Boolean productStatus;
	
	@Column(name= "product_address")
	private String productAddress;

	@ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE, optional = false)
	@JoinColumn(name = "storeId", nullable = false)
	private Store store;
	
	@OneToMany(mappedBy = "product", fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
	@JsonIgnore
	Set<CustomerOrder> amount;
	
	public Product() {
		super();
	}


	public Product(String productName, String productType, int productOldPrice, int productNewPrice,
			int productAmount, Date productDate, String productDescription, Boolean productStatus,String productImage, String productAddress ,Store store) {
		super();
		this.productName = productName;
		this.productType = productType;
		this.productOldPrice = productOldPrice;
		this.productNewPrice = productNewPrice;
		this.productAmount = productAmount;
		this.productDate = productDate;
		this.productDescription = productDescription;
		this.productStatus = productStatus;
		this.productImage = productImage;
		this.productAddress = productAddress;
		this.store = store;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductImage() {
		return productImage;
	}

	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}

	public String getProductName() {
		return productName;
	}

	public String getProductAddress() {
		return productAddress;
	}

	public void setProductAddress(String productAddress) {
		this.productAddress = productAddress;
	}


	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public int getProductOldPrice() {
		return productOldPrice;
	}

	public void setProductOldPrice(int productOldPrice) {
		this.productOldPrice = productOldPrice;
	}

	public int getProductNewPrice() {
		return productNewPrice;
	}

	public void setProductNewPrice(int productNewPrice) {
		this.productNewPrice = productNewPrice;
	}

	public int getProductAmount() {
		return productAmount;
	}

	public void setProductAmount(int productAmount) {
		this.productAmount = productAmount;
	}

	public Date getProductDate() {
		return productDate;
	}

	public void setProductDate(Date productDate) {
		this.productDate = productDate;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public Boolean getProductStatus() {
		return productStatus;
	}

	public void setProductStatus(Boolean productStatus) {
		this.productStatus = productStatus;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}


	public Set<CustomerOrder> getAmount() {
		return amount;
	}

	public void setAmount(Set<CustomerOrder> amount) {
		this.amount = amount;
	}
	
	
	
}
