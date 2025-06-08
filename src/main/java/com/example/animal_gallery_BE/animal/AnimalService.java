package com.example.animal_gallery_BE.animal;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public List<Animal> getAllAnimals(String animalName) {
        if (animalName == null || animalName.isEmpty()) {
            return animalRepository.findAll();
        } else {
            return animalRepository.findByNameContainingIgnoreCase(animalName);
        }
    }

    public Animal addAnimal(String colorName, Animal animal) {
        //set color to colorName
        animal.setColor(colorName);
        return animalRepository.save(animal);
    }

    public  ResponseEntity<Map<String, String>> uploadImage(MultipartFile file) throws IllegalStateException, IOException {
             // 1️⃣ Generate a unique filename
             String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();

             // 2️⃣ Create the uploads folder if it doesn't exist
             File uploadDir = new File(System.getProperty("user.dir"), "uploads");
             if (!uploadDir.exists()) uploadDir.mkdirs();
     
             // 3️⃣ Save file into uploads/
             File destinationFile = new File(uploadDir, filename);
             file.transferTo(destinationFile);
     
             // 4️⃣ Build public URL for access (relative to server)
             String publicUrl = "/uploads/" + filename;
     
             // 5️⃣ Return it in JSON
             return ResponseEntity.ok(Map.of(
                "url", publicUrl
             ));
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
