package com.example.animal_gallery_BE.animal;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    
    Animal findByColorIgnoreCase(String color);
    Animal findByNameIgnoreCase(String name);

    @Query(value = "SELECT * FROM animals WHERE lifespan >= ?1", nativeQuery = true)
    List<Animal> findByLifespan(Double lifespan);

}