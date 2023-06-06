package com.kreitek.store.infrastructure.rest;

import com.kreitek.store.application.dto.UserDTO;
import com.kreitek.store.application.service.UserService;
import com.kreitek.store.infrastructure.specs.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    ResponseEntity<UserDTO> insertItem(@RequestBody UserDTO userDTO){
        userDTO.setPassword(PasswordEncryptor.encryptPassword(userDTO.getPassword()));
        UserDTO userSaved = this.userService.saveUser(userDTO);
        return new ResponseEntity<>(userSaved, HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping(value = "/users/{userId}")
    ResponseEntity<UserDTO> getUserById(@PathVariable Long userId){
        Optional<UserDTO> user = this.userService.getUserById(userId);
        if (user.isPresent()){
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @PostMapping(value = "/users/login", produces = "application/text", consumes = "application/json")
    ResponseEntity<String> login(@RequestBody UserDTO userDTO){
        UserDTO userByNick = this.userService.findByNick(userDTO.getNick());
        if (userByNick != null){
            Optional<UserDTO> user = this.userService.getUserById(userByNick.getId());
            if (user.isPresent()){
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
}
