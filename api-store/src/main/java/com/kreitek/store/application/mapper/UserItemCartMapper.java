package com.kreitek.store.application.mapper;

import com.kreitek.store.application.dto.UserItemCartDTO;
import com.kreitek.store.domain.entity.UserItemCart;
import com.kreitek.store.domain.key.UserItemCartKey;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ItemMapper.class})
public interface UserItemCartMapper extends EntityMapper<UserItemCartDTO, UserItemCart> {
    @Override
    UserItemCart toEntity(UserItemCartDTO dto);

    @Override
    UserItemCartDTO toDto(UserItemCart entity);

    default UserItemCart fromId(UserItemCartKey id){
        if (id == null) return null;
        UserItemCart userItemCart = new UserItemCart();
        userItemCart.setId(id);
        return userItemCart;
    }
}