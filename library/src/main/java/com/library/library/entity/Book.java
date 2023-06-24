package com.library.library.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JoinColumnOrFormula;

@Entity
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "")
    private String reg_no;

    @Column(name = "")
    private String model;

    @Column(name = "")
    private String colour;

    @Column(name = "")
    private double fair;


    public Book()
    {

    }
    public Book(String reg_no,String model,String colour,double fair)
    {
        this.reg_no = reg_no;
        this.fair = fair;
        this.model = model;
        this.colour = colour;
    }
    public void setReg_no(String reg_no)
    {
        this.reg_no = reg_no;
    }

    public void setModel(String model)
    {
        this.model = model;
    }

    public void setColour(String colour)
    {
        this.
    }

}
