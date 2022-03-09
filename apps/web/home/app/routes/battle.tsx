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
        svg.classList.add('svg-class-name');
        svg.setAttribute('style', 'width: 200px');
      }}
      className="wrapper-class-name"
      evalScripts="always"
      fallback={() => <span>Error!</span>}
      httpRequestWithCredentials={true}
      loading={() => <span>Loading</span>}
      onClick={() => {
        console.log('wrapper onClick');
      }}
      renumerateIRIElements={false}
      src="../maps/1646798815831.svg"
      useRequestCache={false}
      wrapper="span"
    />
  );
}
