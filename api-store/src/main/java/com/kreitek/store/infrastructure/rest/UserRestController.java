package com.kreitek.store.infrastructure.rest;

import com.kreitek.store.application.dto.ItemDTO;
import com.kreitek.store.application.dto.UserDTO;
import com.kreitek.store.application.dto.UserItemCartDTO;
import com.kreitek.store.application.service.UserService;
import com.kreitek.store.infrastructure.specs.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserRestController {
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @PostMapping(value = "/users", produces = "application/json", consumes = "application/json")
    ResponseEntity<UserDTO> insertItem(@RequestBody UserDTO userDTO) {
        userDTO.setPassword(PasswordEncryptor.encryptPassword(userDTO.getPassword()));
        UserDTO userSaved = this.userService.saveUser(userDTO);
        return new ResponseEntity<>(userSaved, HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}")
    ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        Optional<UserDTO> user = this.userService.getUserById(userId);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @PostMapping(value = "/users/login", produces = "application/text", consumes = "application/json")
    ResponseEntity<String> login(@RequestBody UserDTO userDTO){
        UserDTO userByNick = this.userService.findByNick(userDTO.getNick());
        if (userByNick != null) {
            Optional<UserDTO> user = this.userService.getUserById(userByNick.getId());
            if (user.isPresent()) {
                String decryptPassword = PasswordEncryptor.decryptPassword(user.get().getPassword());
                if (user.get().getNick().equals(userDTO.getNick()) && decryptPassword != null && decryptPassword.equals(userDTO.getPassword())) {
                    return new ResponseEntity<>(user.get().getId().toString(), HttpStatus.OK);
                }
                else {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @PutMapping(value = "/users/{userId}/favorites/{itemId}", produces = "application/json", consumes = "application/json")
    ResponseEntity<?> addItemToFavorite(@PathVariable Long userId, @PathVariable Long itemId) {
        try {
            this.userService.addItemToFavorite(userId, itemId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}/favorites", produces = "application/json")
    ResponseEntity<List<ItemDTO>> getUserFavorites(@PathVariable Long userId) {
        List<ItemDTO> itemsDto = this.userService.getUserFavorites(userId);
        return new ResponseEntity<>(itemsDto, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping(value = "/users/{userId}/favorites/{itemId}")
    ResponseEntity<?> deleteFavoriteById(@PathVariable Long userId, @PathVariable Long itemId) {
        this.userService.deleteFavoriteByItemId(userId, itemId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}/favorites/{itemId}", produces = "application/json")
    ResponseEntity<?> isItemFavorite(@PathVariable Long userId, @PathVariable Long itemId) {
        Optional<UserDTO> userDto = this.userService.getUserById(userId);
        if (userDto.isPresent()) {
            List<ItemDTO> favorites = userDto.get().getFavorites();
            for (ItemDTO favorite : favorites) {
                if (favorite.getId().equals(itemId)) {
                    return new ResponseEntity<>(true, HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping(value = "/users/{userId}/cart", produces = "application/json", consumes = "application/json")
    ResponseEntity<List<UserItemCartDTO>> addItemToCart(@PathVariable Long userId, @RequestBody UserItemCartDTO userItemCartDTO) {
        try {
            this.userService.addItemToCart(userId, userItemCartDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}/cart", produces = "application/json")
    ResponseEntity<List<UserItemCartDTO>> getUserCart(@PathVariable Long userId) {
        try {
            List<UserItemCartDTO> userItemCartDTOS = this.userService.getUserCart(userId);
            return new ResponseEntity<>(userItemCartDTOS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @DeleteMapping(value = "/users/{userId}/cart/{itemId}")
    ResponseEntity<?> deleteItemFromCart(@PathVariable Long userId, @PathVariable Long itemId) {
        try {
            this.userService.deleteItemFromCart(userId, itemId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}