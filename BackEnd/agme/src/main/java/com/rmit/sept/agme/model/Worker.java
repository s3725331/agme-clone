package com.rmit.sept.agme.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @ManyToOne
    private User user;

    @NotNull
    @ManyToOne
    private ServiceName serviceName;

    public boolean isAccepted() {
        return accepted;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public Worker(){}

    public Worker(User user){this.user = user;}

    private boolean accepted;

    private Date createdAt;
    private Date modifiedAt;

    @PrePersist
    protected void onCreate(){
        this.accepted = false;
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.modifiedAt = new Date();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean getAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public ServiceName getServiceName() {
        return serviceName;
    }

    public void setServiceName(ServiceName serviceName) {
        this.serviceName = serviceName;
    }
}
