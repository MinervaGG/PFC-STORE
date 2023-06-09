package com.kreitek.store.application.service.impl;

import com.kreitek.store.application.dto.ItemDTO;
import com.kreitek.store.application.dto.UserDTO;
import com.kreitek.store.application.mapper.ItemMapper;
import com.kreitek.store.application.mapper.UserMapper;
import com.kreitek.store.application.service.UserService;
import com.kreitek.store.domain.entity.User;
import com.kreitek.store.domain.persistence.ItemPersistence;
import com.kreitek.store.domain.persistence.UserPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserPersistence persistence;
    private final ItemPersistence itemPersistence;
    private final ItemMapper itemMapper;
    private final UserMapper mapper;

    @Autowired
    public UserServiceImpl(UserPersistence persistence, ItemPersistence itemPersistence, ItemMapper itemMapper, UserMapper mapper) {
        this.persistence = persistence;
        this.itemPersistence = itemPersistence;
        this.itemMapper = itemMapper;
        this.mapper = mapper;
    }

    @Override
    public Optional<UserDTO> getUserById(Long userId) {
        return this.persistence.getUserById(userId).map(mapper::toDto);
    }

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User userSaved = this.persistence.saveUser(this.mapper.toEntity(userDTO));
        return this.mapper.toDto(userSaved);
    }

    @Override
    public UserDTO findByNick(String userNick) {
        User user = this.persistence.findByNick(userNick);
        return this.mapper.toDto(user);
    }

/**
    @Override
    @Transactional
    public List<ItemDTO> addItemToFavorite(Long userId, ItemDTO itemDTO) {
        Optional<UserDTO> userDto = this.persistence.getUserById(userId).map(mapper::toDto);
        userDto.get().getFavorites().add(itemDTO);
        User user = this.persistence.saveUser(this.mapper.toEntity(userDto.get()));
        return this.mapper.toDto(user).getFavorites();
    }



    @Override
    @Transactional
    public boolean addItemToFavorite(Long userId, ItemDTO itemDTO) {
        Optional<UserDTO> userDto = this.persistence.getUserById(userId).map(mapper::toDto);
        if (userDto.isPresent()){
            userDto.get().getFavorites().add(itemDTO);
            this.persistence.saveUser(this.mapper.toEntity(userDto.get()));
            return true;
        }
        return false;
    }
*/

    @Override
    @Transactional
    public void addItemToFavorite(Long userId, Long itemId) {
        Optional<UserDTO> userDto = this.persistence.getUserById(userId).map(mapper::toDto);
        if (userDto.isPresent()) {
            Optional<ItemDTO> itemDTO = this.itemPersistence.getItemById(itemId).map(itemMapper::toDto);
            if (itemDTO.isPresent()) {
                userDto.get().getFavorites().add(itemDTO.get());
                this.persistence.saveUser(this.mapper.toEntity(userDto.get()));
            }
        }
    }
    @Override
    public List<ItemDTO> getUserFavorites(Long userId) {
        Optional<UserDTO> userDto = this.persistence.getUserById(userId).map(mapper::toDto);
        if (userDto.isPresent()) {
            List<ItemDTO> favoritesList = userDto.get().getFavorites();
            return favoritesList;
        }
        return null;
    }

    @Override
    public void deleteFavoriteByItemId(Long userId, Long itemId) {
        Optional<UserDTO> userDto = this.persistence.getUserById(userId).map(mapper::toDto);
        Optional<ItemDTO> itemDto = this.itemPersistence.getItemById(itemId).map(itemMapper::toDto);
        if (userDto.isPresent() & itemDto.isPresent()) {
            List<ItemDTO> favorites =  userDto.get().getFavorites();
            favorites.removeIf(favorite -> favorite.getId().equals(itemDto.get().getId()));
            userDto.get().setFavorites(favorites);
            this.persistence.saveUser(this.mapper.toEntity(userDto.get()));
        }
    }
}
