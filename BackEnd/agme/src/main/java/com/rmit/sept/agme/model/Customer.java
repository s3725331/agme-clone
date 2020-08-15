package com.rmit.sept.agme.model;

import javax.persistence.*;


@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Account account;

    public Customer(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
