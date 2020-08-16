package com.rmit.sept.agme.model;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email must not be empty")
    private String email;

    @Size(min = 6, max = 64, message = "Invalid Password length")
    @NotBlank(message = "Password must not be empty")
    private String password;

    @Size(min = 3, max = 32, message = "Please enter valid name (3 to 32 characters) ")
    @NotBlank(message = "Field must not be empty")
    private String firstName;

    @Size(min = 3, max = 32, message = "Please enter valid name (3 to 32 characters) ")
    @NotBlank(message = "Field must not be empty")
    private String lastName;

    @Size (min = 6, max = 128, message = "Invalid Address Length")
    @NotBlank(message = "Field must not be empty")
    private String address;


    //Pattern will only influence return to front end, db will still have date to ms
    //@JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;
    private Date modifiedAt;

    //private boolean deleted;

    public Account(){}

    @PrePersist
    protected void onCreate(){ this.createdAt = new Date();}

    @PreUpdate
    protected  void onModify(){ this.modifiedAt = new Date();}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Date modifiedAt) {
        this.modifiedAt = modifiedAt;
    }


}
