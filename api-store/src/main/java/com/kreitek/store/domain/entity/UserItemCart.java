package com.kreitek.store.domain.entity;

import com.kreitek.store.domain.key.UserItemCartKey;
import javax.persistence.*;

@Entity
@Table(name = "user_itemCart")
public class UserItemCart {
    @EmbeddedId
    private UserItemCartKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "cuantity")
    private Integer cuantity;

    public UserItemCart() {
    }

    public UserItemCartKey getId() {
        return id;
    }

    public void setId(UserItemCartKey id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Integer getCuantity() {
        return cuantity;
    }

    public void setCuantity(Integer cuantity) {
        this.cuantity = cuantity;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if (obj == null || getClass() != obj.getClass() || id == null) return false;
        UserItemCart userItemCart = (UserItemCart) obj;
        return id.equals(userItemCart.id);
    }
}
