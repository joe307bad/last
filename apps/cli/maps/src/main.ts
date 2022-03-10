import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { parseString, Builder } from 'xml2js';

(async () => {
  const data = await readFile(
    `${process.cwd()}/maps/1646800935170.svg`,
    'utf-8'
  );

  parseString(data, async (err, result) => {
    if (err) {
      throw err;
    }

    const regionIds = [];
    result.svg.g['0'].path.forEach((p) => {
      const regionId = uuidv4();
      regionIds.push(regionId)
      p.$.id = regionId;
      p.$.fill = '#4338ca';
      p.$['fill-opacity'] = '1';
    });

    const builder = new Builder();
    const xml = builder.buildObject(result);
    const svgFileName = Date.now();
    await writeFile(
      `${process.cwd()}/apps/web/home/public/maps/${svgFileName}.svg`,
      xml
    );
    await writeFile(
      `${process.cwd()}/apps/web/home/public/maps/${svgFileName}.json`,
      JSON.stringify(regionIds, null, 4)
    );
    console.log(svgFileName);
  });
})();
