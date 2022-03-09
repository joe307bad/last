import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { parseString, Builder } from 'xml2js';

(async () => {
  const data = await readFile(
    `${process.cwd()}/maps/voronoi_svg_export.svg`,
    'utf-8'
  );

  parseString(
    data,
    async (err, result) => {
      if (err) {
        throw err;
      }

      result.svg.g['0'].path.forEach((p) => {
        p.$.id = uuidv4();
        p.text = "2";
      });

      const builder = new Builder();
      const xml = builder.buildObject(result);
      const svgFileName = Date.now();
      await writeFile(
        `${process.cwd()}/apps/web/home/public/maps/${svgFileName}.svg`,
        xml
      );
      console.log(svgFileName);
    }
  );
})();
