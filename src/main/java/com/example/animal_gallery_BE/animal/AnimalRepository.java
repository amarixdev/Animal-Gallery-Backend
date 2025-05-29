package com.example.animal_gallery_BE.animal;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    
    Animal findByColor(String color);
    Animal findByName(String name);
    

}