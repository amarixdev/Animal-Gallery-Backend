package com.example.animal_gallery_BE.animal;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public Animal getAnimalById(Long animalId) {
        return animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found"));
    }

    public List<Animal> getAnimalsByColorPreview(String color) {
        //get first 4 animals by color
        return animalRepository.findByColorIgnoreCase(color).stream()
        .limit(4)
        .collect(Collectors.toList());
    }

    public List<Animal> getAnimalsByColor(String color) {
        return animalRepository.findByColorIgnoreCase(color);
    }

    public Animal getAnimalByName(String name) {
        return animalRepository.findByNameIgnoreCase(name);
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public List<Animal> getAnimalsByLifespan(double lifespan) {
        return animalRepository.findByLifespan(lifespan);
    }

    public Animal addAnimal(String colorName, Animal animal) {
        //set color to colorName
        animal.setColor(colorName);
        return animalRepository.save(animal);
    }
    
    public Animal updateAnimal(Long animalId, Animal animal) {
        //get animal by id
        Animal existingAnimal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        //update animal
        existingAnimal.setName(animal.getName());
        existingAnimal.setColor(animal.getColor());
        existingAnimal.setLifespan(animal.getLifespan());
        existingAnimal.setFunFacts(animal.getFunFacts());
        existingAnimal.setImageUrl(animal.getImageUrl());
        existingAnimal.setDescription(animal.getDescription());
        existingAnimal.setHabitat(animal.getHabitat());
        return animalRepository.save(existingAnimal);
    }
    
    public void deleteAnimal(Long animalId) {
        //get animal by id
        Animal existingAnimal = animalRepository.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found"));
        //delete animal
        animalRepository.delete(existingAnimal);
    }           
}
