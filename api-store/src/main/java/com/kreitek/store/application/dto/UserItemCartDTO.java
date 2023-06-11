package com.kreitek.store.application.dto;

import com.kreitek.store.domain.entity.Item;
import com.kreitek.store.domain.entity.User;
import com.kreitek.store.domain.key.UserItemCartKey;
import java.io.Serializable;

public class UserItemCartDTO implements Serializable {
    private UserItemCartKey id;

    private User user;

    private Item item;

    public User getUser() {
        return user;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public void setUser(User user) {
        this.user = user;
    }

    private Integer cuantity;

    public UserItemCartDTO() {
    }

    public UserItemCartKey getId() {
        return id;
    }

    public void setId(UserItemCartKey id) {
        this.id = id;
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
        UserItemCartDTO userItemCart = (UserItemCartDTO) obj;
        return id.equals(userItemCart.getId());
    }
}
