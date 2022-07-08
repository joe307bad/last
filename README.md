# Last
## Resources
- https://dawchihliou.github.io/articles/build-better-nextjs-static-sites-with-mdx-and-contentlayer
- https://github.com/alexcarpenter/alexcarpenter-next
## Current ToDos
- [X] Integrate `@nestjs/bull` to consume messages from `api-story`. After `insertMantStoryEvents`, we should queue a message. That message should trigger the `calculateEntityStats` function.
- [ ] When a new entity's stat is calculated, send the new info to the clients listening on websockets. Clients will receive and entityId and a set of stats. The client can then determine "do i have this entity in my local cache?" and update the entity's stat accordingly. Same with the leaderboard. Websocket clients will receive an entityId and the leaderboard value. The client can ask "do I have this entity on my local leaderboards?" and update the leaderboard accordingly. 
## Domains
### Generating story templates
Provide authors with the tools to make customized stories with different characters, houses, and custom story event outcomes
#### Apps and libs
```
/apps/cli/story
/libs/story
```
### Generating and managing characters, planets, houses, and other content
Facilitate the creation of a universe worth of relational data
#### Apps and libs
```
/apps/api/graphql
```
### Calculate stats on a series of story events
Performant system to consume story events associated with entities and cache a set of stats based on the story events
#### Apps and libs
```
/apps/api/stats
```
### Build a timeline of story events
Record the denormalized data that comprises a universal timeline
### Apps and libs
```
/apps/api/story
```
### Complete stories and quests, browse planets, explore the Last universe
A user experience that promotes a seamless user journey; making it obvious how to continue exploration
### Apps and libs
```
/apps/web/home
```
### Socialize and show off
Create communities, challenge other houses which have been claimed by other users, and explore the void with friends
### Apps and libs
```
```
### Manage and track
Classic administration tools to claim planets, visualize trends for claimed entities, see progress, pin planets
### Apps and libs
```
```
### Mini-games and daily engagement
How do we keep users engaged on a daily basis? Pipe connecting games, path drawing, risk style to challenge other houses and planets
#### Risk based gameplay with RPG elements
Level up a claimed house to defend your planet and attack other planets. Daily troop and territory bonuses.
- **Map Editor** - create your own risk map with terrains and territories, secret underground tunnels. defence mechanisms.
- **Build an attacking force** - complete daily challenges to build a force to challenge other planet
- **Covert operations** - allow for spying on other planets, assassinating leaders, faking alliances to infiltrate houses.
### Apps and libs
```
```





## Development
### run MySQL docker container
```
docker run -p 3306:3306 --name mysql1 -e MYSQL_ROOT_PASSWORD=secret -d mysql:latest --default-authentication-plugin=mysql_native_password
```
## Resources
- [API Gateway using Tyk and Keycloak](https://tyk.io/docs/tyk-developer-portal/keycloak-dcr/)
## CLI

### Generate `story.yml` from structure template
```
nx run cli-story:start --storyNo=02
```
## Schema
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
resources: Resource[]
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

### Resource
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
planets: Planet[]
```

### Character
```
name: string
house: House
```

