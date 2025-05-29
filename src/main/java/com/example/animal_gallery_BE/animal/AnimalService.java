package com.example.animal_gallery_BE.animal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public Animal getAnimalByColor(String color) {
        return animalRepository.findByColor(color);
    }

    public Animal getAnimalByName(String name) {
        return animalRepository.findByName(name);
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal addAnimal(Animal animal) {
      return animalRepository.save(animal);
    }

}
