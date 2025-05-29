package com.example.animal_gallery_BE.animal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnimalController {
    @Autowired
    private AnimalService animalService;


    @GetMapping("/animals")
    List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @GetMapping("/animal")
    Animal getAnimal(@RequestParam(required = false) String color, @RequestParam(required = false) String name) {
        if (color != null)
            return animalService.getAnimalByColor(color);
        if (name != null)
            return animalService.getAnimalByName(name);
        
        throw new IllegalArgumentException("Must provide either color or name");
    }


    @PostMapping("/animals")
    Animal addAnimal(@RequestBody Animal animal) {
        return animalService.addAnimal(animal);
    }

}
