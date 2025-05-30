# su25-jpa-crud-api
## Description
Simple CRUD API for Animal Objects with JPA (Hibernate)

### Version
1.0.0

## Installation
- Get the project
    - clone
        ```
      https://github.com/amarixdev/Animal-Gallery-Backend.git
        ```
    - OR download zip.
- Open the project in VS Code.
- This project is built to run with jdk 21.
- [Dependencies](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/3149ec363e4aae4baebe6f755df7d4c2d79c9d2c/pom.xml#L32) to JPA and Postgres in addition to the usual Spring Web. JPA handles the persistence, Postgresql is the database to be used.
- [`/src/main/resources/application.properties`](https://github.com/uncg-csc340/su25-jpa-crud-api/blob/main/src/main/resources/application.properties) This file  is the configuration for the PostgreSQL database to use for the API.
  - You MUST have the database up and running before running the project!
    - Login to your neon.tech account.
    - Locate your database project.
    - On the project dashboard, click on "Connect" and select Java.
    - Copy the connection string provided.
    - Paste it as a value for the property `spring.datasource.url`. No quotation marks.
- Build and run the main class. You should see a new table created in the Neon database.

## API Endpoints
Base URL: [`http://localhost:8080`](http://localhost:8080)


1. ### [`/animals`](http://localhost:8080/animals) (GET)

Returns a list of animals.  
If the optional **`lifespan`** query parameter is supplied, the list is filtered to animals whose average lifespan is **greater than or equal to** the given value (in years).

| Parameter | Type   | Required | Description                                               |
|-----------|--------|----------|-----------------------------------------------------------|
| lifespan  | number | No       | Minimum lifespan in **years** to include in the response |

### Example – Retrieve all animals

```GET /animals```

```Accept: application/json```

#### Response - A JSON array of Animal objects.

 ```
[
    {
    "animalId": 1,
    "color": "black",
    "name": "Black Panther",
    "scientificName": "Panthera pardus",
    "habitat": "Dense forests of Africa and Asia",
    "description": "The black panther is a melanistic color variant of big cats, most commonly leopards and jaguars. Known for their sleek black coat and incredible stealth, they are powerful apex predators.",
    "diet": "Carnivorous - deer, wild boar, monkeys",
    "lifespan": 15.0,
    "funFacts": [
      "Black panthers can see six times better at night than humans",
      "Their dark coloration is caused by a mutation in a gene that controls coat color",
      "They are excellent swimmers and climbers"
    ]
  },
  {
    "animalId": 2,
    "color": "white",
    "name": "Snowy Owl",
    "scientificName": "Bubo scandiacus",
    "habitat": "Arctic regions",
    "description": "Snowy owls are large, white owls that are native to the Arctic regions. They are known for their distinctive white fur and ability to camouflage in snowy environments.",
    "diet": "Carnivorous - lemmings, birds, eggs, berries",
    "lifespan": 20.0,
    "funFacts": [
      "They can fly at speeds of up to 40 mph (64 km/h)",
      "They are the largest owl species in the world",
      "They are able to see in both visible and ultraviolet light"
    ]
  }
]
```

### Example – Filter by lifespan ≥ 20 years

```GET /animals?lifespan=20```

```Accept: application/json```

#### Response - A JSON array of Animal objects with lifespans greator or equal to 20.
```
[
  {
    "animalId": 2,
    "color": "white",
    "name": "Snowy Owl",
    "scientificName": "Bubo scandiacus",
    "habitat": "Arctic regions",
    "description": "Snowy owls are large, white owls that are native to the Arctic regions. They are known for their distinctive white fur and ability to camouflage in snowy environments.",
    "diet": "Carnivorous - lemmings, birds, eggs, berries",
    "lifespan": 20.0,
    "funFacts": [
      "They can fly at speeds of up to 40 mph (64 km/h)",
      "They are the largest owl species in the world",
      "They are able to see in both visible and ultraviolet light"
    ]
  },
  {
    "animalId": 5,
    "color": "violet",
    "name": "Purple Sea Urchin",
    "scientificName": "Strongylocentrotus purpuratus",
    "habitat": "Rocky shores and kelp forests in the Pacific Ocean",
    "description": "Purple Sea Urchins are spiny marine animals known for their vibrant purple color. They play a crucial role in the marine ecosystem by grazing on algae.",
    "diet": "Herbivorous - primarily kelp and algae",
    "lifespan": 30.0,
    "funFacts": [
      "They have a unique water vascular system that helps them move and feed",
      "Their spines can regenerate if broken",
      "They are an important food source for sea otters and other marine animals"
    ]
  }
]

```

2. ### [`/animal`](http://localhost:8080/animal) (GET)

Returns **one** animal that matches a given **`color`** or **`name`** (exact match).  
At least one of the two query parameters must be supplied; if both are provided, `color` takes precedence.


| Parameter | Type   | Required | Description                                                                                 |
|-----------|--------|----------|---------------------------------------------------------------------------------------------|
| color     | string | No       | Exact coat/feather color. **Allowed values:** `red`, `orange`, `yellow`, `green`, `blue`, `indigo`, `violet`, `black`, `white`. |
| name      | string | No       | Common name of the animal (e.g. `Snowy Owl`).                                               |

> **Validation**  
> • If neither `color` nor `name` is supplied, the service returns **HTTP 400** 

### Example – Look up by color

```GET /animal?color=blue```

```Accept: application/json```


#### Response - A single JSON object representing a blue-colored animal

```
 {
  "animalId": 4,
  "color": "blue",
  "name": "Blue Morpho Butterfly",
  "scientificName": "Morpho peleides",
  "habitat": "Tropical rainforests of Central and South America",
  "description": "The Blue Morpho Butterfly is one of the largest butterflies in the world, known for its vibrant blue wings. The iridescent blue color is due to microscopic scales on the backs of their wings, which reflect light.",
  "diet": "Nectar, rotting fruits, and tree sap",
  "lifespan": 0.315,
  "funFacts": [
    "Their wingspan can reach up to 8 inches",
    "They are more active during the day and rest at night",
    "The underside of their wings is brown, providing camouflage from predators"
}
```

6. ### [`/animals`](http://localhost:8080/animals) (POST)
Creates a new Animal entry

### Example – Create an animal

```POST /animals```

```Accept: application/json```




#### Request Body
An animal object. Note the object does not include an ID as this is autogenerated.
```
  {
      "color": "green",
      "name": "Chameleon",
      "scientificName": "Chamaeleonidae",
      "habitat": "Rainforests, savannas, and sometimes deserts",
      "description": "Chameleons are known for their ability to change colors and their long, sticky tongues used to catch prey. They have unique eyes that can move independently of each other.",
      "diet": "Insectivorous - primarily insects and small invertebrates",
      "lifespan": 10,
      "funFacts": [
        "They can rotate their eyes independently to look in two different directions at once",
        "Their color change is used for communication and temperature regulation",
        "They have a prehensile tail that helps them grasp branches"
    ]
  }
```
#### Response - The newly created Animal.

```
  {
  "animalId": 6,
  "color": "green",
  "name": "Chameleon",
  "scientificName": "Chamaeleonidae",
  "habitat": "Rainforests, savannas, and sometimes deserts",
  "description": "Chameleons are known for their ability to change colors and their long, sticky tongues used to catch prey. They have unique eyes that can move independently of each other.",
  "diet": "Insectivorous - primarily insects and small invertebrates",
  "lifespan": 10.0,
  "funFacts": [
    "They can rotate their eyes independently to look in two different directions at once",
    "Their color change is used for communication and temperature regulation",
    "They have a prehensile tail that helps them grasp branches"
  ]
}
```

