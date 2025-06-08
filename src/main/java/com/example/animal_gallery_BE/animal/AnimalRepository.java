package com.example.animal_gallery_BE.animal;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    
    Animal findByNameIgnoreCase(String name);

    List<Animal> findByColorIgnoreCase(String color);

    List<Animal> findByNameContainingIgnoreCase(String name);
        

}