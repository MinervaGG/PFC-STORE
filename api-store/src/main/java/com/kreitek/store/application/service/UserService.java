package com.kreitek.store.application.service;

import com.kreitek.store.application.dto.ItemDTO;
import com.kreitek.store.application.dto.UserDTO;
import com.kreitek.store.application.dto.UserItemCartDTO;
import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<UserDTO> getUserById(Long userId);
    UserDTO saveUser(UserDTO userDTO);
    UserDTO findByNick(String userNick);
    void addItemToFavorite(Long userId, Long itemId);
    List<ItemDTO> getUserFavorites(Long userId);
    void deleteFavoriteByItemId(Long userId, Long itemId);
    void addItemToCart(Long userId, UserItemCartDTO userItemCartDTO);
    List<UserItemCartDTO> getUserCart(Long userId);
    void deleteItemFromCart(Long userId, Long itemId);
}
