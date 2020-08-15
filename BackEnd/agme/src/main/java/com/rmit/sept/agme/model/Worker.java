package com.rmit.sept.agme.model;

import javax.persistence.*;

@Entity
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    

    @ManyToOne
    private Account account;

    public Worker(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
