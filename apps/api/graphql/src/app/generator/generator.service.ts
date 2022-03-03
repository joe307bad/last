import {
  QueryService,
  InjectQueryService,
} from '@nestjs-query/core';
import { PlanetEntity } from '../schema/planet/planet.entity';
import faker from '@faker-js/faker';
import elements from './elements.json';
import terrainNames from './terrains.json';
import { sampleSize } from 'lodash';
import { ResourceEntity } from '../schema/resource/resource.entity';
import { ColorEntity } from '../schema/color/color.entity';
import { HouseEntity } from '../schema/house/house.entity';
import { TerrainEntity } from '../schema/terrain/terrain.entity';

const capitalizeAllFirstLetters = (
  s: string[]
) => {
  return s
    .join(' ')
    .toLowerCase()
    .split(' ')
    .map(
      (s) =>
        s.charAt(0).toUpperCase() + s.substring(1)
    )
    .join(' ');
};

const ensureUniqueness = (
  item: string,
  listOfItems: string[],
  generateNewItemFn: () => string
) => {
  if (listOfItems.some((i) => i === item)) {
    return ensureUniqueness(
      generateNewItemFn(),
      listOfItems,
      generateNewItemFn
    );
  }

  return item;
};

export class GeneratorService {
  constructor(
    @InjectQueryService(PlanetEntity)
    readonly planets: QueryService<PlanetEntity>,
    @InjectQueryService(ResourceEntity)
    readonly resources: QueryService<ResourceEntity>,
    @InjectQueryService(ColorEntity)
    readonly colors: QueryService<ColorEntity>,
    @InjectQueryService(HouseEntity)
    readonly houses: QueryService<HouseEntity>,
    @InjectQueryService(TerrainEntity)
    readonly terrains: QueryService<TerrainEntity>
  ) {}

  async createPlanets() {
    const characters = [...new Array(90)].reduce<
      string[]
    >((acc, item) => {
      const newName = () =>
        `${faker.name.firstName()} ${faker.name.lastName()}`;
      acc.push(
        ensureUniqueness(newName(), acc, newName)
      );
      return acc;
    }, []);

    const houses = [...new Array(30)].reduce<
      string[]
    >((acc, item) => {
      const newHouseName = () =>
        capitalizeAllFirstLetters([
          faker.name.lastName(),
          faker.lorem.word(),
        ]);
      acc.push(
        ensureUniqueness(
          newHouseName(),
          acc,
          newHouseName
        )
      );
      return acc;
    }, []);

    const colors = [...new Array(20)].reduce<
      string[]
    >((acc, item) => {
      const newColor = () =>
        faker.internet.color();
      acc.push(
        ensureUniqueness(
          newColor(),
          acc,
          newColor
        )
      );
      return acc;
    }, []);

    const elementNames = elements.map(
      (e: { name: string }) => e.name
    );

    const resources = [...new Array(20)].reduce<
      string[]
    >((acc, item) => {
      const newResource = () =>
        faker.helpers.randomize(elementNames);
      acc.push(
        ensureUniqueness(
          newResource(),
          acc,
          newResource
        )
      );
      return acc;
    }, []);

    const terrains = [...new Array(20)].reduce<
      string[]
    >((acc, item) => {
      const newTerrain = () =>
        faker.helpers.randomize(terrainNames);
      acc.push(
        ensureUniqueness(
          newTerrain(),
          acc,
          newTerrain
        )
      );
      return acc;
    }, []);

    // create 90 characters
    // create 30 houses (3 characters per house)
    // create 10 planets (3 houses each)
    // 2 resources per planet
    // 2 colors per planet
    // 2 terrains per planet

    const planetNames = [...new Array(10)].reduce(
      (acc, _) => {
        const newPlanetName = () =>
          capitalizeAllFirstLetters(
            sampleSize(
              [
                faker.name.firstName(),
                faker.name.lastName(),
                faker.lorem.word(),
                faker.random.word(),
                faker.random.alpha({
                  count: 1,
                  upcase: true,
                }),
                `${faker.random.alpha({
                  count: 1,
                  upcase: true,
                })}${faker.datatype.number({
                  min: 1,
                  max: 99,
                })}`,
              ],
              faker.helpers.randomize([2, 3])
            )
          );

        acc.push(
          ensureUniqueness(
            newPlanetName(),
            acc,
            newPlanetName
          )
        );
        return acc;
      },
      []
    );

    const resourceEntities =
      await this.resources.createMany(
        resources.map((resource) => ({
          name: resource,
        }))
      );

    const colorEntities =
      await this.colors.createMany(
        colors.map((color) => ({
          hex: color,
        }))
      );

    const houseEntities =
      await this.houses.createMany(
        houses.map((house) => ({
          name: house,
        }))
      );

    const terrainEntities =
      await this.terrains.createMany(
        terrains.map((terrain) => ({
          name: terrain,
        }))
      );

    return this.planets.createMany(
      planetNames.map((planetName) => {
        const planetHouses = houseEntities.splice(
          0,
          3
        );
        const rulingHouse =
          faker.helpers.randomize(planetHouses);
        return {
          name: planetName,
          enabled: true,
          level: 0,
          initialAlignment: 50,
          planetResources: [
            {
              resourceId: resourceEntities.splice(
                0,
                1
              )[0].id,
              initialAmount:
                faker.datatype.number({
                  min: -100,
                  max: 999,
                }),
            },
            {
              resourceId: resourceEntities.splice(
                0,
                1
              )[0].id,
              initialAmount:
                faker.datatype.number({
                  min: -100,
                  max: 999,
                }),
            },
          ],
          colors: [
            {
              id: colorEntities.splice(0, 1)[0]
                .id,
            },
            {
              id: colorEntities.splice(0, 1)[0]
                .id,
            },
          ],
          rulingHouse: {
            id: rulingHouse.id,
          },
          houses: planetHouses.map(
            (planetHouse) => ({
              id: planetHouse.id,
            })
          ),
          terrains: [
            {
              id: terrainEntities.splice(0, 1)[0]
                .id,
            },
            {
              id: terrainEntities.splice(0, 1)[0]
                .id,
            },
          ],
        };
      })
    );
  }
}
