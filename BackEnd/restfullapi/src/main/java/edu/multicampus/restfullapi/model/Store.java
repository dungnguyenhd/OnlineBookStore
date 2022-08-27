package edu.multicampus.restfullapi.model;

import java.beans.JavaBean;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Stores")
@JavaBean
public class Store {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int storeId;

	@Column(name = "store_name")
	private String storeName;

	@Column(name = "store_address", length = 255)
	private String storeAddress;

	@Column(name = "store_email")
	private String storeEmail;

	@Column(name = "store_phone")
	private int storePhone;

	@Column(name = "store_image", length = 500)
	private String storeImageURL;

	@OneToMany(mappedBy = "store", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JsonIgnore
	private Set<Product> product;

	public Store() {
		super();
	}

	public Store(String storeName, String storeAddress, String storeEmail, int storePhone,
			String storeImageURL) {
		super();
		this.storeName = storeName;
		this.storeAddress = storeAddress;
		this.storeEmail = storeEmail;
		this.storePhone = storePhone;
		this.storeImageURL = storeImageURL;
	}

	public int getStoreId() {
		return storeId;
	}

	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getStoreAddress() {
		return storeAddress;
	}

	public void setStoreAddress(String storeAddress) {
		this.storeAddress = storeAddress;
	}

	public String getStoreEmail() {
		return storeEmail;
	}

	public void setStoreEmail(String storeEmail) {
		this.storeEmail = storeEmail;
	}

	public int getStorePhone() {
		return storePhone;
	}

	public void setStorePhone(int storePhone) {
		this.storePhone = storePhone;
	}

	public String getStoreImageURL() {
		return storeImageURL;
	}

	public void setStoreImageURL(String storeImageURL) {
		this.storeImageURL = storeImageURL;
	}

	public Set<Product> getProduct() {
		return product;
	}

	public void setProduct(Set<Product> product) {
		this.product = product;
	}

}
