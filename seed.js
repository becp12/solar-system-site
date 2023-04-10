const mongoose = require('mongoose');
const Planet = require('./models/planet');
const Moon = require('./models/moon');
require('dotenv').config();

mongoose
    .connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MONGO CONNECTION OPEN');
    })
    .catch((err) => {
        console.log(err);
    });

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const seedPlanets = [
    {
        name: "Mercury",
        diameter: 4879,
        distance: 36.04,
        facts: [
            "Mercury is the smallest planet in our Solar System",
            "Mercury's surface appears heavily cratered and is similar in appearance to the Moon's, indicating that it has been geologically inactive for billions of years",
            "Mercury is named after the Roman god Mercurius , god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes"
        ],
        state: "Solid",
    },
    {    
        name: "Venus",
        diameter: 12104,
        distance: 67.24,
        facts: ["When seen from Earth, Venus is the brightest object in the night sky after our own Moon", "Even though Mercury is closer to the Sun, Venus is the hottest planet in our solar system", "Its thick atmosphere is full of the greenhouse gas carbon dioxide, and it has clouds of sulfuric acid"],
        state: "Solid",
    },
    {
        name: "Earth",
        diameter: 12756,
        distance: 92.96,
        facts: [
            "Earth is believed to be more than 4.5 billion years old",
            "The Earth's surface is 70.8% water",
            "Earth is believed to be the only planet where life has originated and found habitability"
        ],
        state: "Solid",
    },
    {    
        name: "Mars",
        diameter: 6779,
        distance: 144.89,
        facts: ["In the English language, Mars is named for the Roman god of war", "Some of the most notable surface features on Mars include Olympus Mons, the largest volcano and highest-known mountain in the Solar System, and Valles Marineris, one of the largest canyons in the Solar System", "In the distant past, Mars was likely wetter, and thus possibly more suited for life. It is not known whether life has ever existed on Mars."],
        state: "Solid",
    },
    {    
        name: "Jupiter",
        diameter: 139820,
        distance: 740.92,
        facts: ["Jupiter is, by far, the largest planet in the solar system – more than twice as massive as all the other planets combined", "Jupiter’s iconic Great Red Spot is a giant storm bigger than Earth that has raged for hundreds of years", "Eleven Earths could fit across Jupiter’s equator. If Earth were the size of a grape, Jupiter would be the size of a basketball."],
        state: "Gas",
    },
    {    
        name: "Saturn",
        diameter: 116460,
        distance: 1465.7,
        facts: ["Saturn takes 29 Earth years to orbit the sun.", "Saturn has the most spectacular ring system, with seven rings and several gaps and divisions between them.", "Saturn cannot support life as we know it, but some of Saturn's moons have conditions that might support life."],
        state: "Gas",
    },
    {    
        name: "Uranus",
        diameter: 50724,
        distance: 2939.3,
        facts: ["Uranus was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star.", "Uranus has 27 known moons, and they are named after characters from the works of William Shakespeare and Alexander Pope.", "Uranus has 13 known rings. The inner rings are narrow and dark and the outer rings are brightly colored."],
        state: "Gas",
    },
    {    
        name: "Neptune",
        diameter: 49244,
        distance: 4473.3,
        facts: ["Neptune is more than 30 times as far from the Sun as Earth and is the only planet in our solar system not visible to the naked eye", "Neptune has 14 known moons which are named after sea gods and nymphs in Greek mythology.", "Because of dwarf planet Pluto’s elliptical orbit, Pluto is sometimes closer to the Sun than Neptune is."],
        state: "Gas",
    }
];

const seedMoons = [
    {
        name: "Moon",
        history: "We call it 'the Moon' because for a long time it was the only one we knew about. Many languages have beautiful names for our Moon. It is 'Luna' in Italian, Latin, and Spanish, 'Lune' in French, 'Mond' in German, and 'Selene' in Greek.",
        diameter: 3475,
        planet: "Earth"
    },
    {
        name: "Phobos",
        history: "It is named after Phobos, the Greek god of fear and panic, who is the son of Ares (Mars) and twin brother of Deimos.",
        diameter: 22.533,
        planet: "Mars"
    },
    {
        name: "Deimos",
        history: "It is named after Deimos, the Ancient Greek god and personification of dread and terror.",
        diameter: 12.4,
        planet: "Mars"
    },
    {
        name: "Io",
        history: "Io is named after a maiden who was loved by Zeus.",
        diameter: 3643.2,
        planet: "Jupiter"
    },
    {
        name: "Europa",
        history: "Europa is named for a woman who, in Greek mythology, was abducted by the god Zeus – Jupiter in Roman mythology.",
        diameter: 3121.6,
        planet: "Jupiter"
    },
    {
        name: "Ganymede",
        history: "Ganymede is named after the mythological Ganymede, a Trojan prince desired by Zeus (the Greek counterpart of Jupiter), who carried him off to be the cupbearer of the gods.",
        diameter: 5268.2,
        planet: "Jupiter"
    },
    {
        name: "Callisto",
        history: "Callisto is named for a woman turned into a bear by Zeus in Greek mythology.",
        diameter: 4820.6,
        planet: "Jupiter"
    },
    {
        name: "Enceladus",
        history: "Enceladus is named after a giant in Greek mythology.",
        diameter: 504.2,
        planet: "Saturn"
    },
    {
        name: "Titan",
        history: "Titan, the largest moon of Saturn, is named for the Titans of Greek mythology.",
        diameter: 5149.5,
        planet: "Saturn"
    },
    {
        name: "",
        history: "",
        diameter: ,
        planet: ""
    },
]

const seedDB = async () => {
    
    await Moon.deleteMany({});
    var seededMoons = await Moon.insertMany(seedMoons);
    for (const planet of seedPlanets) {
        planet.moons = seededMoons.filter(moon => moon.planet === planet.name).map(moon => moon.id);
    };
    await Planet.deleteMany({});
    await Planet.insertMany(seedPlanets);
};

seedDB().then(() => {
    db.close();
});