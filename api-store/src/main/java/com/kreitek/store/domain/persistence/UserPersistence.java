package com.kreitek.store.domain.persistence;

import com.kreitek.store.domain.entity.User;
import java.util.Optional;

public interface UserPersistence {
    Optional<User> getUserById(Long userId);
    User saveUser(User user);
    User findByNick(String userNick);
}
