package com.kreitek.store.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userSequence")
    private Long id;
    @Column(nullable = false, length = 40, unique = true)
    private String nick;
    @Column(nullable = false, length = 40)
    private String name;
    @Column(nullable = false, length = 100)
    private String surname;
    @Column(length = 9)
    private String telephone;
    @Column(nullable = false, length = 100)
    private String email;
    @Column(nullable = false)
    private String password;

    public User() {
    }

    public User(Long id, String nick, String name, String surname, String telephone, String email, String password) {
        this.id = id;
        this.nick = nick;
        this.name = name;
        this.surname = surname;
        this.telephone = telephone;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
