import type {
  MetaFunction,
  LoaderFunction,
} from 'remix';
import { ReactSVG } from 'react-svg';

export let loader: LoaderFunction = async () => {
  return Promise.resolve(null);
};

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

export default function Battle() {
  return (
    <ReactSVG
      afterInjection={(error, svg) => {
        Array.from(
          (svg || undefined)?.getElementById(
            'svg_g_bezier_cells'
          ).children || []
        ).forEach((c) => {
          c.addEventListener('click', (e) => {
            // @ts-ignore
            if(e.target.style.fill === "blue") {
              // @ts-ignore
              e.target.style.fill = "";
            } else {
              // @ts-ignore
              e.target.style.fill = "blue";
            }
            // @ts-ignore
            console.log(e.target.id);
          });
        });
        if (error) {
          console.error(error);
          return;
        }
        console.log(svg);
      }}
      beforeInjection={(svg) => {
      }}
      className="battle-map"
      evalScripts="always"
      fallback={() => <span>Error!</span>}
      httpRequestWithCredentials={true}
      loading={() => <span>Loading</span>}
      onClick={() => {
        console.log('wrapper onClick');
      }}
      renumerateIRIElements={false}
      src="../maps/1646800935170.svg"
      useRequestCache={false}
    />
  );
}
