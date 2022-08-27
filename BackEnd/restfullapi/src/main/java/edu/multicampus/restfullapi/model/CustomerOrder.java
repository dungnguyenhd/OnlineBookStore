package edu.multicampus.restfullapi.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class CustomerOrder {
	@EmbeddedId
	CustomerOrderKey id;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE, optional = false)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE, optional = false)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @Column(name ="amount")
    @OnDelete(action = OnDeleteAction.CASCADE)
    int amount;
   
    @Column(name ="comment")
    @OnDelete(action = OnDeleteAction.CASCADE)
    String comment;
    
    @Column(name ="rating")
    @OnDelete(action = OnDeleteAction.CASCADE)
    int rating;
    
    @Column(name ="status")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Boolean status;

	public CustomerOrder() {
		super();
	}
	
	public CustomerOrder(Product product, User user, int amount, String comment, int rating, Boolean status) {
		super();
		this.product = product;
		this.user = user;
		this.amount = amount;
		this.comment = comment;
		this.rating = rating;
		this.status = status;
	}



	public CustomerOrderKey getId() {
		return id;
	}

	public void setId(CustomerOrderKey id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
    
    
}
