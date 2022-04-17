import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { parseString, Builder } from 'xml2js';
import yargs from 'yargs/yargs';
import { getSvgData } from '../utils';

(async () => {
  var { svgFileName } = yargs(
    process.argv.slice(2)
  )
    .usage(
      'Parse an SVG exported from https://voronoi-editor.web.app/ and convert to useful JSON'
    )
    .options({
      svgFileName: {
        string: true,
        description:
          'An SVG exported from https://voronoi-editor.web.app/ and placed in /maps',
        alias: 's',
        require: true,
      },
    }).argv;

  const svgData = await getSvgData(svgFileName);

  await writeFile(
    `${process.cwd()}/apps/web/home/public/maps/${svgFileName}.json`,
    JSON.stringify(svgData, null, 4)
  );
  //
  // const data = await readFile(
  //   `${process.cwd()}/maps/${svgFileName}.svg`,
  //   'utf-8'
  // );

  //
  // parseString(data, async (err, result) => {
  //   if (err) {
  //     throw err;
  //   }
  //
  //   const regionIds = [];
  //   result.svg.g['0'].path.forEach((p) => {
  //     const regionId = uuidv4();
  //     regionIds.push(regionId);
  //     p.$.id = regionId;
  //     p.$.fill = '#4338ca';
  //     p.$['fillOpacity'] = '1';
  //   });
  //
  //   const builder = new Builder();
  //   const xml = builder.buildObject(result);
  //   const svgFileName = Date.now();
  //   await writeFile(
  //     `${process.cwd()}/apps/web/home/public/maps/${svgFileName}.svg`,
  //     xml
  //   );
  //   await writeFile(
  //     `${process.cwd()}/apps/web/home/public/maps/${svgFileName}.json`,
  //     JSON.stringify(regionIds, null, 4)
  //   );
  //   console.log(svgFileName);
  // });
})();
