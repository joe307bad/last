import {
  useCatch,
  json,
  useLoaderData,
} from 'remix';
import type {
  LoaderFunction,
  MetaFunction,
} from 'remix';
import { getPlanetById } from '~last/request/node';
import { Planet as TPlanet } from '~last/shared/types';
import { Planet } from '~/components/planet';

export let loader: LoaderFunction = async ({
  params,
}) => {
  if (!params?.id) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const planet = await getPlanetById(params.id);

  if (!planet?.data?.planet) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return planet.data.planet;
};

export default function PlanetById() {
  let data = useLoaderData<Partial<TPlanet>>();
  // console.log(data);
  // return (<></>)
  return <Planet planet={data} />;
}

export function CatchBoundary() {
  let caught = useCatch();

  let message: React.ReactNode;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page
          that you do not have access to. Maybe
          ask the webmaster (
          {caught.data.webmasterEmail}) for
          access.
        </p>
      );
    case 404:
      message = (
        <p>
          Looks like you tried to visit a page
          that does not exist.
        </p>
      );
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay
        in context and try a different link in the
        parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export function ErrorBoundary({
  error,
}: {
  error: Error;
}) {
  console.error(error);
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay
        in context and try a different link in the
        parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data
      ? `Param: ${data.param}`
      : 'Oops...',
  };
};
