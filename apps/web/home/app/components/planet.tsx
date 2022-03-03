import { Planet as TPlanet } from '~last/shared/types';

export const Planet = ({
  planet,
}: {
  planet: TPlanet;
}) => {
  return (
    <div className="p-4 m-4 border-gray-50 border-4 max-w-sm">
      <div className="flex justify-center w-full content-center">
        <img
          className="w-32"
          src="/images/planets.png"
          alt="Sunset in the mountains"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {planet.name}
        </div>
        <p className="text-gray-500 text-base">
          Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Voluptatibus quia,
          nulla! Maiores et perferendis eaque,
          exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl w-full mb-2">
          Ruling Family
        </div>
        <div className="flex justify-between items-center">
          <span>{planet.rulingHouse.name}</span>
          <div className="flex">
            {planet.colors.map((color, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color.hex,
                }}
                className="w-5 h-5 mr-1 rounded-full bg-red-400"
              />
            ))}
            {/*<div className="w-5 h-5 mr-1 rounded-full bg-red-400" />*/}
            {/*<div className="w-5 h-5 rounded-full bg-purple-400" />*/}
          </div>
        </div>
        <p className="text-gray-500 text-base">
          Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Voluptatibus quia,
          nulla! Maiores et perferendis eaque,
          exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl w-full mb-2">
          Opposing Families
        </div>
        <ul className="marker:text-green list-outside list-disc ml-6">
          {planet.houses.map((house, i) => (
            <li
              key={i}
              className="text-green-400"
            >
              <div className="text-gray-500">
                {house.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl w-full mb-2">
          Resources
        </div>
        <div className="flex text-gray-500 flex-col">
          {planet.planetResources.map(
            (resource, i) => {
              const prefix = Number(
                resource.initialAmount >
                  0
              )
                ? '+'
                : '-';
              const badge = `inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-${
                prefix === '-' ? 'red' : 'green'
              }-600 rounded-full mr-2`;
              return (
                <div
                  key={i}
                  className="flex items-center mb-2"
                >
                  <div className={badge}>
                    +
                    {
                      resource.initialAmount.toString()
                    }
                  </div>
                  <div>
                    {resource.resource.name}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};
