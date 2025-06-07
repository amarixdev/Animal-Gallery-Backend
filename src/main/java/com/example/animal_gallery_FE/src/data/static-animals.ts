import type { Animal } from "../types/Animal";

export const staticAnimals: Animal[] = [
    // Red
    {
        id: 1,
        color: 'red',
        name: 'Red Fox',
        scientificName: 'Vulpes vulpes',
        habitat: 'Forests and grasslands',
        diet: 'Omnivore',
        description: 'Known for its bright red fur and clever behavior.',
        lifespan: 5,
        funFacts: ['Uses its tail for balance', 'Excellent hearing', 'Adaptable to urban life'],
        imageUrl: 'red/red-fox.png'
    },
    {
        id: 2,
        color: 'red',
        name: 'Scarlet Macaw',
        scientificName: 'Ara macao',
        habitat: 'Rainforests',
        diet: 'Fruits and nuts',
        description: 'A brilliantly colored parrot native to Central and South America.',
        lifespan: 40,
        funFacts: ['Can mimic human speech', 'Strong beak for cracking nuts', 'Forms monogamous pairs'],
        imageUrl: 'red/scarlet-macaw.png'
    },
    {
        id: 3,
        color: 'red',
        name: 'Red Panda',
        scientificName: 'Ailurus fulgens',
        habitat: 'Eastern Himalayas',
        diet: 'Bamboo and fruit',
        description: 'Small arboreal mammal with reddish fur and a striped tail.',
        lifespan: 8,
        funFacts: ['Not related to giant pandas', 'Mostly active at dawn and dusk', 'Good climbers'],
        imageUrl: 'red/red-panda.png'
    },

    // Orange
    {
        id: 4,
        color: 'orange',
        name: 'Clownfish',
        scientificName: 'Amphiprioninae',
        habitat: 'Coral reefs',
        diet: 'Plankton and algae',
        description: 'Small, bright orange fish often found living among sea anemones.',
        lifespan: 6,
        funFacts: ['All born male', 'Live in symbiosis with anemones', 'Made famous by Finding Nemo'],
        imageUrl: 'orange/clownfish.png'
    },
    {
        id: 5,
        color: 'orange',
        name: 'Orangutan',
        scientificName: 'Pongo pygmaeus',
        habitat: 'Tropical rainforests',
        diet: 'Fruit and leaves',
        description: 'Large primates with orange fur, known for intelligence.',
        lifespan: 30,
        funFacts: ['Use tools', 'Build nests daily', 'Very strong arms'],
        imageUrl: 'orange/orangutan.png'
    },
    {
        id: 6,
        color: 'orange',
        name: 'Tiger',
        scientificName: 'Panthera tigris',
        habitat: 'Forests and grasslands',
        diet: 'Carnivore',
        description: 'Powerful big cats with orange fur and black stripes.',
        lifespan: 15,
        funFacts: ['Excellent swimmers', 'Solitary hunters', 'Top of the food chain'],
        imageUrl: 'orange/tiger.png'
    },

    // Yellow
    {
        id: 7,
        color: 'yellow',
        name: 'Yellow Tang',
        scientificName: 'Zebrasoma flavescens',
        habitat: 'Coral reefs',
        diet: 'Algae',
        description: 'Bright yellow saltwater fish popular in aquariums.',
        lifespan: 10,
        funFacts: ['Can change color at night', 'Uses scalpel-like spines for defense', 'Native to Hawaii'],
        imageUrl: 'yellow/yellow-tang.png'
    },
    {
        id: 8,
        color: 'yellow',
        name: 'Golden Lion Tamarin',
        scientificName: 'Leontopithecus rosalia',
        habitat: 'Atlantic coastal forests',
        diet: 'Fruits and insects',
        description: 'Small monkeys with striking yellow-orange manes.',
        lifespan: 12,
        funFacts: ['Live in family groups', 'Help reforest their habitats', 'Very vocal'],
        imageUrl: 'yellow/golden-tamarin.png'
    },
    {
        id: 9,
        color: 'yellow',
        name: 'American Goldfinch',
        scientificName: 'Spinus tristis',
        habitat: 'Fields and meadows',
        diet: 'Seeds',
        description: 'Bright yellow songbird found across North America.',
        lifespan: 7,
        funFacts: ['State bird of New Jersey', 'Breeds late in summer', 'Can eat while hanging upside down'],
        imageUrl: 'yellow/goldfinch.png'
    },

    // Green
    {
        id: 10,
        color: 'green',
        name: 'Green Tree Python',
        scientificName: 'Morelia viridis',
        habitat: 'Tropical rainforests',
        diet: 'Small mammals',
        description: 'A striking green snake that coils in tree branches.',
        lifespan: 15,
        funFacts: ['Juveniles are yellow or red', 'Ambush predators', 'Excellent climbers'],
        imageUrl: 'green/python.png'
    },
    {
        id: 11,
        color: 'green',
        name: 'Green Iguana',
        scientificName: 'Iguana iguana',
        habitat: 'Rainforests and rivers',
        diet: 'Leaves and fruits',
        description: 'Large herbivorous lizard with spines along its back.',
        lifespan: 20,
        funFacts: ['Excellent swimmers', 'Use tail as a whip', 'Can fall from 40 feet and survive'],
        imageUrl: 'green/iguana.png'
    },
    {
        id: 12,
        color: 'green',
        name: 'Leaf Insect',
        scientificName: 'Phylliidae',
        habitat: 'Tropical forests in Southeast Asia',
        diet: 'Leaves',
        description: 'Insect that mimics the shape and color of a leaf for camouflage.',
        lifespan: 6,
        funFacts: ['Masters of camouflage', 'Wiggle to mimic leaves in wind', 'Males can fly, females usually cannot'],
        imageUrl: 'green/leaf-insect.png'
    }
    ,

    // Blue
    {
        id: 13,
        color: 'blue',
        name: 'Blue Poison Dart Frog',
        scientificName: 'Dendrobates tinctorius',
        habitat: 'Rainforests',
        diet: 'Insects',
        description: 'Vibrant blue frog with black spots, highly toxic in the wild.',
        lifespan: 10,
        funFacts: ['Toxins come from diet', 'Males guard eggs', 'Vivid colors warn predators'],
        imageUrl: 'blue/blue-dart-frog.png'
    },
    {
        id: 14,
        color: 'blue',
        name: 'Blue Jay',
        scientificName: 'Cyanocitta cristata',
        habitat: 'Woodlands and suburbs',
        diet: 'Nuts and insects',
        description: 'Intelligent and noisy blue songbird.',
        lifespan: 7,
        funFacts: ['Can mimic hawk calls', 'Form tight family units', 'Bold around humans'],
        imageUrl: 'blue/blue-jay.png'
    },
    {
        id: 15,
        color: 'blue',
        name: 'Mandarinfish',
        scientificName: 'Synchiropus splendidus',
        habitat: 'Shallow reefs',
        diet: 'Small crustaceans',
        description: 'Small reef fish with dazzling blue and orange stripes.',
        lifespan: 5,
        funFacts: ['Secretes foul-smelling mucus', 'Mating dance at sunset', 'Poor swimmers'],
        imageUrl: 'blue/mandarinfish.png'
    },

    // Indigo
    {
        id: 16,
        color: 'indigo',
        name: 'Indigo Bunting',
        scientificName: 'Passerina cyanea',
        habitat: 'Fields and forests',
        diet: 'Seeds and insects',
        description: 'Small migratory bird with deep blue-indigo feathers.',
        lifespan: 10,
        funFacts: ['Sings from dawn to dusk', 'Migrates at night', 'Uses stars to navigate'],
        imageUrl: 'indigo/indigo-bunting.png'
    },
    {
        id: 17,
        color: 'indigo',
        name: 'Purple Sea Urchin',
        scientificName: 'Strongylocentrotus purpuratus',
        habitat: 'Rocky sea floors',
        diet: 'Algae',
        description: 'Spiny marine animal with a vibrant purplish hue.',
        lifespan: 30,
        funFacts: ['No eyes, but light-sensitive', 'Important for kelp forest health', 'Covered in tube feet'],
        imageUrl: 'indigo/sea-urchin.png'
    },
    {
        id: 18,
        color: 'indigo',
        name: 'Blue Dragon (Sea Slug)',
        scientificName: 'Glaucus atlanticus',
        habitat: 'Open ocean',
        diet: 'Jellyfish',
        description: 'Tiny sea slug that floats upside down with an iridescent blue body.',
        lifespan: 1,
        funFacts: ['Feeds on Portuguese Man o’ War', 'Can store stinging cells', 'Floats using air bubble'],
        imageUrl: 'indigo/sea-slug.png'
    },

    // Violet
    {
        id: 19,
        color: 'violet',
        name: 'Violet-backed Starling',
        scientificName: 'Cinnyricinclus leucogaster',
        habitat: 'African woodlands',
        diet: 'Fruits and insects',
        description: 'A bird with stunning violet plumage on its back.',
        lifespan: 5,
        funFacts: ['Male is more colorful', 'Feeds in flocks', 'Known for melodic song'],
        imageUrl: 'violet/violet-starling.png'
    },
    {
        id: 20,
        color: 'violet',
        name: 'Purple Fiddler Crab',
        scientificName: 'Uca purpurea',
        habitat: 'Tropical and subtropical mudflats and mangroves',
        diet: 'Algae and detritus',
        description: 'Small crab with a vibrant purple body and one oversized claw (in males).',
        lifespan: 2,
        funFacts: ['Males wave their big claw to attract mates', 'Breathe through gills and modified lungs', 'Can regenerate lost limbs'],
        imageUrl: 'violet/purple-fiddler-crab.png'
    }
    ,
    {
        id: 21,
        color: 'violet',
        name: 'Mexican Violet Tarantula',
        scientificName: 'Cyriopagopus lividus',
        habitat: 'Tropical forests',
        diet: 'Insects and small animals',
        description: 'Striking tarantula with bluish-violet legs.',
        lifespan: 12,
        funFacts: ['Lives in burrows', 'Fast and defensive', 'Rarely found in the wild'],
        imageUrl: 'violet/violet-tarantula.png'
    },

    // White
    {
        id: 22,
        color: 'white',
        name: 'Snowy Owl',
        scientificName: 'Bubo scandiacus',
        habitat: 'Arctic tundra',
        diet: 'Small mammals',
        description: 'Large white owl adapted to cold environments.',
        lifespan: 10,
        funFacts: ['Active during day', 'Can hear prey under snow', 'Females have dark spots'],
        imageUrl: 'white/snowy-owl.png'
    },
    {
        id: 23,
        color: 'white',
        name: 'Arctic Fox',
        scientificName: 'Vulpes lagopus',
        habitat: 'Arctic regions',
        diet: 'Small animals and birds',
        description: 'Compact white fox that thrives in freezing climates.',
        lifespan: 8,
        funFacts: ['Fur changes color with season', 'Can survive -50°C', 'Has hairy footpads'],
        imageUrl: 'white/arctic-fox.png'
    },
    {
        id: 24,
        color: 'white',
        name: 'Beluga Whale',
        scientificName: 'Delphinapterus leucas',
        habitat: 'Cold Arctic waters',
        diet: 'Fish and squid',
        description: 'Social white whale known for its vocalizations.',
        lifespan: 35,
        funFacts: ['Nicknamed "canary of the sea"', 'Lacks a dorsal fin', 'Flexible neck'],
        imageUrl: 'white/beluga-whale.png'
    }
];
