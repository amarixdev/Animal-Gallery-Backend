package com.example.animal_gallery_BE.animal;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "animals")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;

    @Column(unique = true, nullable = false)
    private String color;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String scientificName;
    @Column(nullable = false)
    private String habitat;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String diet;
    @Column(nullable = false)
    private String lifespan;
    @Column(nullable = false)
    private List<String> funFacts;

    public Animal() {
    // required by JPA
}
 
    public Animal(String color, String name, String scientificName, String habitat, String description, String diet,
        String lifespan, List<String> funFacts) {
        this.color = color;
        this.name = name;
        this.scientificName = scientificName;
        this.habitat = habitat;
        this.description = description;
        this.diet = diet;
        this.lifespan = lifespan;
        this.funFacts = funFacts;
    }


    public Long getAnimalId() {
        return animalId;
    }

    public String getColor() {
        return color;
    }

    public String getName() {
        return name;
    }

    public String getScientificName() {
        return scientificName;
    }

    public String getHabitat() {
        return habitat;
    }

    public String getDescription() {
        return description;
    }

    public String getDiet() {
            return diet;
    }

    public String getLifespan() {
        return lifespan;
    }

    public List<String> getFunFacts() {
        return funFacts;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDiet(String diet) {
        this.diet = diet;
    }

    public void setLifespan(String lifespan) {
        this.lifespan = lifespan;
    }

    public void setFunFacts(List<String> funFacts) {
        this.funFacts = funFacts;
    }
}




