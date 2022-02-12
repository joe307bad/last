# Last

### run MySQL docker container
```
docker run -p 3306:3306 --name mysql1 -e MYSQL_ROOT_PASSWORD=secret -d mysql:latest --default-authentication-plugin=mysql_native_password
```

### [API Gateway using Tyk and Keycloak](https://tyk.io/docs/tyk-developer-portal/keycloak-dcr/)

### Planet
```
name: string
description: string
population: number
level: number

planetarySystem: PlanetarySystem
rulingHouse: House

foci: Focus[]
houses: House[]
resources: PlanetResource[]
colors: Color[]
terrains: Terrain[]
timeline: Event[]
```

### Event
This may benefit from its own service. Something that takes a planet, planetary system, house, or character as an input and associates an event  with the given conditions. This would decouple events from the main content API.
```
focus: PlanetFocus[]
planets: Planet[]
planetarySystems: PlanetarySystem[]
level: number
eventType: EventType[]
houses: House[]
characters: Character[]
```

### EventType
```
name: string
- House related (birth, marriage, assassination, death, disappearance)
- Cataclysmic (planet scale, planetary system scale, universal scale)
- Blessing (planet scale, planetary system scale, universal scale)
- Character related (injury, training, hobby, relationship with other characters),
```

### PlanetFocus
```
focus: Focus
level: number
amount: number
```

### Focus
```
name: string
Spirtua (spiritual), Bellum (war + defence), Animalia (wildlife), Plantae (plants), Insecta (bugs and single-celled organisms), Languista (language and cognition)
```

### PlanetarySystem
```
name: string
planets: Planet[]
asteroidBelts: number
suns: number;
```

### Terrain
```
name: string
colors: Color[]
Desert, ice, tropical, dry, temperate, continental, polar, Canyons, Forest, Glacier, hill, gas, marshes, mountains. oasis, oceans, rivers, swamps, tundra, valleys,
```

### Color
```
hex: string
```

### PlanetResource
```
name: string
resource: Resource
amount: number
```

### House
```
name: string
description: string
members: Character[]
colors: Color[]
```

### Character
```
name: string
house: House
```

