import { Planet as TPlanet } from '~last/shared/types';
import { Link, Form } from 'remix';

export const Planet = ({
  planet = {},
  link,
  linkText,
  onActionClick,
  actionText,
}: Partial<{
  planet: Partial<TPlanet>;
  link: string;
  linkText: string;
  onActionClick: () => void;
  actionText: string;
}>) => {
  return (
    <div className="grid p-4 mr-4 border-gray-50 border-4 max-w-sm grid-rows-7 w-full mb-4">
      <div className="flex justify-center w-full content-center">
        <svg
          className="p-4 w-20 h-20 mr-3 fill-current"
          viewBox="0 0 512 512"
          enableBackground="new 0 0 512 512"
        >
          <path
            d="M502.075,9.956c-19.625-19.624-54.304-5.007-65.7-0.204c-22.804,9.611-50.523,26.083-82.448,48.98
			c-30.174-14.515-63.463-22.188-97.937-22.188c-60.411,0-117.206,23.526-159.923,66.243
			C26.015,172.84,11.621,277.789,52.871,362.192C2.268,434.597-11.793,480.422,9.909,502.122C16.49,508.705,25.358,512,36.414,512
			c8.161,0,17.514-1.795,28.021-5.391c18.908-6.469,42.26-18.785,69.406-36.609c4.358-2.861,8.79-5.857,13.277-8.955
			c32.978,18.164,70.18,27.83,108.874,27.83c60.411,0,117.206-23.526,159.923-66.243c72.202-72.201,85.272-181.469,39.239-267.108
			c14.44-20.31,26.45-39.226,35.649-56.228C514.573,55.364,518.259,26.141,502.075,9.956z M33.6,478.348
			c-1.791-5.718,2.347-30.651,38.112-84.511c7.195,10.099,15.302,19.743,24.356,28.796c6.636,6.636,13.614,12.808,20.891,18.501
			C56.582,481.058,36.727,479.059,33.6,478.348z M145.836,420.964c-9.252-6.469-18.006-13.792-26.156-21.942
			c-75.164-75.163-75.164-197.461,0-272.624c36.41-36.409,84.82-56.462,136.312-56.462c51.492,0,99.902,20.052,136.312,56.462
			c8.564,8.564,16.139,17.744,22.752,27.392c-9.828,13.082-20.606,26.688-32.223,40.667c-7.665-3.518-16.177-5.496-25.148-5.496
			c-33.362,0-60.503,27.142-60.503,60.503c0,11.115,3.026,21.531,8.278,30.492c-4.206,4.302-8.449,8.598-12.701,12.85
			C242.712,342.853,191.466,387.499,145.836,420.964z M384.794,249.465c0,14.948-12.162,27.111-27.111,27.111
			c-14.948,0-27.111-12.162-27.111-27.111c0-14.95,12.162-27.111,27.111-27.111C372.632,222.354,384.794,234.517,384.794,249.465z
			 M392.303,399.023c-36.41,36.409-84.82,56.462-136.312,56.462c-27.459,0-54.041-5.706-78.395-16.55
			c43.801-33.225,91.689-75.432,138.773-122.517c4.43-4.429,8.849-8.906,13.23-13.388c8.399,4.422,17.951,6.939,28.085,6.939
			c33.362,0,60.503-27.142,60.503-60.503c0-12.284-3.69-23.717-10.004-33.271c8.634-10.381,16.823-20.568,24.531-30.51
			C463.351,256.206,449.881,341.444,392.303,399.023z M458.386,88.915c-6.37,11.276-14.016,23.439-22.809,36.31
			c-5.98-7.8-12.529-15.302-19.664-22.438c-9.452-9.452-19.595-17.959-30.312-25.486c22.393-15.362,42.589-27.254,59.125-34.756
			c22.551-10.232,31.475-9.322,33.591-8.837C478.922,36.411,480.217,50.274,458.386,88.915z"
          />
        </svg>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {planet.name}
        </div>
      </div>
      {!planet?.rulingHouse ? null : (
        <div className="px-6 py-4">
          <div className="font-bold text-xl w-full mb-2">
            Ruling House
          </div>
          <div className="flex justify-between items-center">
            <span>{planet.rulingHouse.name}</span>
            <div className="flex">
              {(planet?.colors || []).map(
                (color, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: color.hex,
                    }}
                    className="w-5 h-5 mr-1 rounded-full bg-red-400"
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
      {!planet?.houses ? null : (
        <div className="px-6 py-4">
          <div className="font-bold text-xl w-full mb-2">
            Other Houses
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
      )}
      {!planet?.planetResources ? null : (
        <div className="px-6 py-4">
          <div className="font-bold text-xl w-full mb-2">
            Resources
          </div>
          <div className="flex text-gray-500 flex-col">
            {planet.planetResources.map(
              (resource, i) => {
                const prefix = Number(
                  resource.initialAmount > 0
                )
                  ? '+'
                  : '-';
                const _include_class_names =
                  'bg-red-600 bg-green-600';
                const badge = `inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-${
                  prefix === '-' ? 'red' : 'green'
                }-600 rounded-full mr-2`;
                return (
                  <div
                    key={i}
                    className="flex items-center mb-2"
                  >
                    <div className={badge}>
                      {resource.initialAmount.toString()}
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
      )}
      {!planet?.terrains ? null : (
        <div className="px-6 pt-4 pb-2">
          <div className="font-bold text-xl w-full mb-2">
            Terrains
          </div>
          {planet.terrains.map((terrain, i) => (
            <span
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 mb-2"
            >
              {terrain.name}
            </span>
          ))}
        </div>
      )}
      <div className="grow-1 justify-center w-full content-center flex">
        {!link ? null : (
          <Link to={link}>
            <button className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
              <svg
                className="w-4 h-4 mr-3 fill-current"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
              >
                <path
                  d="M366.781,73.842c-12.021,0-23.321,4.681-31.82,13.18c-17.546,17.545-17.546,46.094,0,63.639
				c8.499,8.5,19.8,13.181,31.82,13.181s23.32-4.681,31.819-13.181c17.546-17.545,17.546-46.094,0-63.639
				C390.101,78.522,378.801,73.842,366.781,73.842z M377.388,129.448c-2.833,2.833-6.601,4.394-10.606,4.394
				c-4.007,0-7.774-1.561-10.607-4.394c-5.849-5.849-5.849-15.365,0-21.213c2.833-2.833,6.601-4.393,10.607-4.393
				s7.773,1.56,10.606,4.393C383.236,114.083,383.236,123.6,377.388,129.448z"
                />
                <path
                  d="M472.704,21.533l-2.393-6.223l-6.224-2.393C441.801,4.346,418.406,0,394.556,0c-50.711,0-98.243,19.604-133.841,55.202
				l-44.928,44.927l-113.138,14.142l-83.364,83.364l70.711,28.285l-15.734,15.735l22.835,22.835l-35.355,49.497l109.895,109.895
				l49.497-35.356l22.835,22.835l15.734-15.735l28.284,70.711l83.364-83.364l14.141-113.136l44.928-44.929
				C483.287,172.04,499.885,92.21,472.704,21.533z M72.67,186.679l43.915-43.916l64.65-8.081l-68.159,68.159L72.67,186.679z
				 M174.878,384.698l-73.953-73.954l17.677-24.748l81.025,81.024L174.878,384.698z M342.858,369.038l-43.915,43.915l-16.163-40.406
				l68.159-68.159L342.858,369.038z M409.208,203.694l-165.24,165.24L190.934,315.9l116.673-116.672l-21.213-21.213L169.721,294.688
				l-53.033-53.033l165.24-165.24C311.859,46.484,351.858,30,394.556,30c17.909,0,35.516,2.9,52.435,8.63
				C466.615,96.637,452.134,160.768,409.208,203.694z"
                />
                <rect
                  x="44.257"
                  y="396.362"
                  transform="matrix(0.7071 -0.7071 0.7071 0.7071 -269.1277 172.9926)"
                  width="59.999"
                  height="30"
                />

                <rect
                  x="101.686"
                  y="423.791"
                  transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -121.683 857.1786)"
                  width="30"
                  height="59.999"
                />
                <rect
                  x="1.835"
                  y="353.93"
                  transform="matrix(0.7071 -0.7071 0.7071 0.7071 -251.5493 130.5676)"
                  width="59.999"
                  height="30"
                />
              </svg>
              <span>{linkText}</span>
            </button>
          </Link>
        )}
      </div>
      <div className="grow-1 justify-center w-full content-center flex">
        {!actionText ? null : (
          <Form replace={false} method="post">
            <button
              type="submit"
              className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
            >
              <svg
                className="w-4 h-4 mr-3 fill-current"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
              >
                <path
                  d="M366.781,73.842c-12.021,0-23.321,4.681-31.82,13.18c-17.546,17.545-17.546,46.094,0,63.639
				c8.499,8.5,19.8,13.181,31.82,13.181s23.32-4.681,31.819-13.181c17.546-17.545,17.546-46.094,0-63.639
				C390.101,78.522,378.801,73.842,366.781,73.842z M377.388,129.448c-2.833,2.833-6.601,4.394-10.606,4.394
				c-4.007,0-7.774-1.561-10.607-4.394c-5.849-5.849-5.849-15.365,0-21.213c2.833-2.833,6.601-4.393,10.607-4.393
				s7.773,1.56,10.606,4.393C383.236,114.083,383.236,123.6,377.388,129.448z"
                />
                <path
                  d="M472.704,21.533l-2.393-6.223l-6.224-2.393C441.801,4.346,418.406,0,394.556,0c-50.711,0-98.243,19.604-133.841,55.202
				l-44.928,44.927l-113.138,14.142l-83.364,83.364l70.711,28.285l-15.734,15.735l22.835,22.835l-35.355,49.497l109.895,109.895
				l49.497-35.356l22.835,22.835l15.734-15.735l28.284,70.711l83.364-83.364l14.141-113.136l44.928-44.929
				C483.287,172.04,499.885,92.21,472.704,21.533z M72.67,186.679l43.915-43.916l64.65-8.081l-68.159,68.159L72.67,186.679z
				 M174.878,384.698l-73.953-73.954l17.677-24.748l81.025,81.024L174.878,384.698z M342.858,369.038l-43.915,43.915l-16.163-40.406
				l68.159-68.159L342.858,369.038z M409.208,203.694l-165.24,165.24L190.934,315.9l116.673-116.672l-21.213-21.213L169.721,294.688
				l-53.033-53.033l165.24-165.24C311.859,46.484,351.858,30,394.556,30c17.909,0,35.516,2.9,52.435,8.63
				C466.615,96.637,452.134,160.768,409.208,203.694z"
                />
                <rect
                  x="44.257"
                  y="396.362"
                  transform="matrix(0.7071 -0.7071 0.7071 0.7071 -269.1277 172.9926)"
                  width="59.999"
                  height="30"
                />

                <rect
                  x="101.686"
                  y="423.791"
                  transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -121.683 857.1786)"
                  width="30"
                  height="59.999"
                />
                <rect
                  x="1.835"
                  y="353.93"
                  transform="matrix(0.7071 -0.7071 0.7071 0.7071 -251.5493 130.5676)"
                  width="59.999"
                  height="30"
                />
              </svg>
              <span>{actionText}</span>
            </button>
            <input
              type="hidden"
              name="planetId"
              value={planet?.id}
            />
            <input
              type="hidden"
              name="resourceId"
              value={
                planet?.planetResources?.[0]
                  .resource.id
              }
            />
          </Form>
        )}
      </div>
    </div>
  );
};
