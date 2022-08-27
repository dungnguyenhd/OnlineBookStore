package edu.multicampus.restfullapi.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class CustomerOrderKey implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "product_id")
    int productId;

    @Column(name = "user_id")
    int userId;

	public CustomerOrderKey() {
		super();
	}

	public CustomerOrderKey(int productId, int userId) {
		super();
		this.productId = productId;
		this.userId = userId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
    
}
