package com.kreitek.store.application.service;

import com.kreitek.store.application.dto.UserDTO;
import java.util.Optional;

public interface UserService {
    Optional<UserDTO> getUserById(Long userId);
    UserDTO saveUser(UserDTO userDTO);
    UserDTO findByNick(String userNick);
}
