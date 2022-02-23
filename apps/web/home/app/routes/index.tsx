import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import { useLoaderData, json } from 'remix';
import { Planet } from '../components/planet';
import faker from '@faker-js/faker';
import elements from '../elements.json';
import { EventTypes } from '@last/shared/types';

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
  const elementNames = elements.map(
    (e: { name: string }) => e.name
  );

  const capitalizeAllFirstWords = (
    s: string[]
  ) => {
    return s
      .slice(0, 2)
      .join(' ')
      .toLowerCase()
      .split(' ')
      .map(
        (s) =>
          s.charAt(0).toUpperCase() +
          s.substring(1)
      )
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
    capitalizeAllFirstWords([
      faker.name.lastName(),
      faker.lorem.word(),
    ]);

  const randomResource = (): [
    string,
    number,
    string
  ] => {
    return [
      faker.helpers.randomize(['+', '-']),
      faker.datatype.number({
        max: 3000,
        min: 100,
      }),
      faker.helpers.randomize(elementNames),
    ];
  };

  const randomPlanet = (): TPlanet => ({
    name: twoRandomStrings(),
    colors: [
      faker.internet.color(),
      faker.internet.color(),
    ],
    opposingFamilies: [
      randomHouse(),
      randomHouse(),
    ],
    rulingFamily: randomHouse(),
    resources: [
      randomResource(),
      randomResource(),
    ],
  });

  let data: IndexData = {
    planets: [
      randomPlanet(),
      randomPlanet(),
      randomPlanet(),
      randomPlanet(),
    ],
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

const exampleEvents = (createDate: any) => [
  {
    entityId:
      '3512846e-7454-4603-be1d-7f2adfbd4e63',
    entityType: 'planet',
    eventType: EventTypes.resource_change,
    valueChange: '-1180',
    secondaryEntityId:
      '027882a9-d7c7-4709-aea8-ae316e474c68',
    createDate,
  },
];

const creatExampleEvents = async () => {
  await fetch('http://localhost:3077/api', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      exampleEvents(Date.now())
    ),
  }).then((r) => console.log(r.json()));
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <main>
      <div className="p-2 bg-white text-black">
        <button
          onClick={creatExampleEvents}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create example events
        </button>
      </div>
      <div className="remix__page flex justify-center">
        {data.planets.map((planet, i) => (
          <Planet key={i} planet={planet} />
        ))}
      </div>
    </main>
  );
}
