package com.rmit.sept.agme.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class TemplateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //Example validation using hibernate-validation
    @Size(min = 3, max = 20, message = "field must be 3-20 chars")
    @NotBlank(message = "temp must have a field")
    private String field;

    //TODO getters and setters for all fields must be added, intelliJ auto-generate function can be used

    //Pattern will only influence return to front end, db will still have date to ms
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;
    private Date modifiedAt;

    public TemplateEntity(){}

    @PrePersist
    protected void onCreate(){ this.createdAt = new Date();}

    @PreUpdate
    protected  void onModify(){ this.modifiedAt = new Date();}


}
