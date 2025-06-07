package com.example.animal_gallery_BE.animal;
import java.util.List;
import java.io.IOException;
import java.io.File;
import java.util.UUID;
import org.hibernate.mapping.Map;   
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class AnimalController {
    @Autowired
    private AnimalService animalService;


    @GetMapping("/api/all")
    List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }
    
    //Get all animals by color preview
    @GetMapping("/api/{colorName}")
    List<Animal> getAnimalsByColorPreview(@PathVariable String colorName) {
        return animalService.getAnimalsByColor(colorName);
    }

    //Get all animals by color 
    @GetMapping("/api/{colorName}/all")
    List<Animal> getAnimalsByColor(@PathVariable String colorName) {
        return animalService.getAnimalsByColor(colorName);
    }

    //Get animal by id
    @GetMapping("/api/{colorName}/{animalId}")
    Animal getAnimalById(@PathVariable String colorName, @PathVariable Long animalId) {
        System.out.println("colorName: " + colorName);
        System.out.println("animalId: " + animalId);
        return animalService.getAnimalById(animalId);
    }


    //Update animal
    @PutMapping("/api/{colorName}/{animalId}/update")
    Animal updateAnimal(@PathVariable Long animalId, @RequestBody Animal animal) {
        return animalService.updateAnimal(animalId, animal);
    }

    //Create animal
    @PostMapping("/api/{colorName}/create")
    Animal addAnimal(@PathVariable String colorName, @RequestBody Animal animal) {
        return animalService.addAnimal(colorName, animal);
    }


    //Delete animal
    @DeleteMapping("/api/{colorName}/{animalId}/delete")
    void deleteAnimal(@PathVariable Long animalId) {
        animalService.deleteAnimal(animalId);
    }

    //Upload image to server
    @PostMapping("/upload")
    ResponseEntity<java.util.Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) 
    {
        try {
            return animalService.uploadImage(file);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
