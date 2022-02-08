import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { Planet } from '../components/planet';
import faker from '@faker-js/faker';
import elements from './elements.json';

export type TPlanet = {
  name: string;
  colors: string[];
  rulingFamily: string;
  opposingFamilies: string[];
  resources: Array<[string, number, string]>;
};

type IndexData = {
  planets: Array<TPlanet>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  const elementNames = elements.map((e: { name: string }) => e.name);

  const capitalizeAllFirstWords = (s: string[]) => {
    return s
      .slice(0, 2)
      .join(' ')
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  };

  const twoRandomStrings = () => {
    const words = [
      faker.name.firstName(),
      faker.name.lastName(),
      faker.lorem.word(),
      faker.random.word(),
      faker.random.alpha(),
    ].sort(() => 0.5 - Math.random());

    return capitalizeAllFirstWords(words);
  };

  const randomHouse = () =>
    capitalizeAllFirstWords([faker.name.lastName(), faker.lorem.word()]);

  const randomResource = (): [string, number, string] => {
    return [
      faker.helpers.randomize(['+', '-']),
      faker.datatype.number({ max: 3000, min: 100 }),
      faker.helpers.randomize(elementNames),
    ];
  };

  const randomPlanet = (): TPlanet => ({
    name: twoRandomStrings(),
    colors: [faker.internet.color(), faker.internet.color()],
    opposingFamilies: [randomHouse(), randomHouse()],
    rulingFamily: randomHouse(),
    resources: [randomResource(), randomResource()],
  });

  let data: IndexData = {
    planets: [randomPlanet(), randomPlanet(), randomPlanet(), randomPlanet()],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <main className="remix__page flex justify-center">
      {data.planets.map((planet) => (
        <Planet planet={planet} />
      ))}
    </main>
  );
}
