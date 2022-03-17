import { useEffect, useState } from 'react';

const regionIds = [
  '96672445-04a4-42a2-a9d0-5c90a973ed16',
  '4e0cc65f-ff86-4dc9-a052-f9654d5debe9',
  'e5af719e-f6e8-4ee4-953e-113fc6d32773',
  'c13d7894-5271-4589-84f0-125e097fa337',
  'b1e16bab-bd95-4b51-a726-07e5b8145ba2',
  'e37a3fc5-1437-4e4e-99b1-c5d7cd5477c2',
  '1e5c33ea-06bf-45d7-ba52-92f34929c240',
  '35f2f527-90ca-4de5-9a14-64158c99effb',
  '5a2ffb3a-a797-4421-b708-4fc5b46fb4f5',
  '124115b6-35de-47ee-9a4a-6fd357252e6d',
  '2d1e0f85-00c0-4f5c-9307-a9c30b800a79',
  'a1b81728-cdfe-4884-b3f2-8fd4a1f21c03',
  '946cb5ed-c96e-4f0a-9be0-8331f00d21f2',
  '70499d77-1e7e-422c-880b-455726f5e1b0',
  '8e7e3095-9858-40b2-85be-fa8d38de63b7',
  '2078c32c-7a63-4a84-b0b0-098b802d1b97',
  '346cf4ed-c9d3-44fd-aa8f-f8f09e3fcffe',
];

const regions = [
  {
    x: 465.11197791978185,
    y: 369.18885146095613,
    id: 0,
    amount: 0,
  },
  {
    x: 904.2545473581984,
    y: 263.3306909950219,
    id: 1,
    amount: 0,
  },
  {
    x: 29.138244960174127,
    y: 82.28652917524371,
    id: 2,
    amount: 0,
  },
  {
    x: 346.34245249153815,
    y: 69.72434116510297,
    id: 3,
    amount: 0,
  },
  {
    x: 195.06035397343126,
    y: 428.4967220486614,
    id: 4,
    amount: 0,
  },
  {
    x: 697.7398707106858,
    y: 19.81302820803389,
    id: 5,
    amount: 0,
  },
  {
    x: 734.6538565365373,
    y: 329.84821943045563,
    id: 6,
    amount: 0,
  },
  {
    x: 26.64418891433046,
    y: 284.24192338259434,
    id: 7,
    amount: 0,
  },
  {
    x: 170.5608226647212,
    y: 60.54536850320073,
    id: 8,
    amount: 0,
  },
  {
    x: 697.7804890352235,
    y: 462.7953382925425,
    id: 9,
    amount: 0,
  },
  {
    x: 27.45412858968267,
    y: 463.62451618979674,
    id: 10,
    amount: 0,
  },
  {
    x: 488.3611860925294,
    y: 181.04024626593628,
    id: 11,
    amount: 0,
  },
  {
    x: 529.0463943881513,
    y: 24.349714193428014,
    id: 12,
    amount: 0,
  },
  {
    x: 225.07690544813644,
    y: 197.6099941199362,
    id: 13,
    amount: 0,
  },
  {
    x: 912.2005765613332,
    y: 5.986118649651431,
    id: 14,
    amount: 0,
  },
  {
    x: 336.73548046400026,
    y: 297.71481882212305,
    id: 15,
    amount: 0,
  },
  {
    x: 828.4743408752713,
    y: 432.97142296097934,
    id: 16,
    amount: 0,
  },
];

const findSeedByRegionElement = (
  regionElement: SVGGeometryElement
) => {
  return (
    regions.find((r) => {
      return regionElement?.isPointInFill({
        x: r.x,
        y: r.y,
      });
    }) || { id: null, x: null, y: null }
  );
};

const MapSvg = () => {
  const onRegionClick = (e: any) => {
    const { id } = findSeedByRegionElement(
      e.target
    );

    setRegionsState((prevState) => {
      const b = prevState.map((el) => {
        return el?.id === id
          ? { ...el, amount: el.amount + 1 }
          : el;
      });
      return b;
    });

    if (e.target.style.fill == '') {
      e.target.style.fill = 'blue';
    } else {
      e.target.style.fill = '';
    }
    console.log(e.target.id);
  };

  const [regionsState, setRegionsState] =
    useState<any[]>([]);

  useEffect(() => {
    setRegionsState(
      regions.map((r) => ({
        ...r,
        color: 'black',
      }))
    );

    regionIds.forEach((rid) => {
      const region = document.getElementById(rid);

      const { id, y, x } =
        findSeedByRegionElement(
          region as unknown as SVGGeometryElement
        );

      if (x && x > 350 && !!region) {
        region.style.fill = 'green';
      }
    });
  }, []);

  return (
    <svg
      id="main_svg"
      xmlns="http://www.w3.org/2000/svg"
      width="920"
      height="480"
      style={{ display: 'block', margin: 'auto' }}
    >
      <g id="svg_g_bezier_cells">
        <path
          d="M 804.1385503724395 0 L 812.630063070334 131.7066405360372 L 919.9999999999999 135.02190243026075 L 920 0 L 804.1385503724395 0 Z"
          id="8e7e3095-9858-40b2-85be-fa8d38de63b7"
          fillOpacity="1"
          fill="#4338ca"
          onClick={onRegionClick}
        />
        <path
          d="M 612.7992966202027 0 L 616.3124983027986 130.63593265377597 L 655.8741303365521 182.01288113898767 L 769.2240807141343 168.51699880027195 L 812.6300630703339 131.7066405360369 L 804.1385503724396 0 L 612.7992966202027 0 Z"
          fill="#4338ca"
          id="96672445-04a4-42a2-a9d0-5c90a973ed16"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 426.0127510979816 0 L 447.57522999773306 86.82274995905495 L 616.3124983027985 130.6359326537758 L 612.7992966202027 0 L 426.0127510979816 0 Z"
          fill="#4338ca"
          id="4e0cc65f-ff86-4dc9-a052-f9654d5debe9"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 88.87062476226981 0 L 113.84838320757834 162.47609950095273 L 256.3278534555273 105.80631646959748 L 261.8528522127231 0 L 88.87062476226981 0 Z"
          fill="#4338ca"
          id="e5af719e-f6e8-4ee4-953e-113fc6d32773"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 256.3278534555274 105.80631646959752 L 338.3529636952923 183.58532947611096 L 370.66443414234357 184.94685736071145 L 447.5752299977331 86.82274995905493 L 426.01275109798166 0 L 261.8528522127231 0 L 256.3278534555274 105.80631646959752 Z"
          fill="#4338ca"
          id="c13d7894-5271-4589-84f0-125e097fa337"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 0 182.9197826036148 L 101.08114631117544 184.16808817657395 L 113.84838320757835 162.4760995009527 L 88.87062476226981 0 L 0 0 L 0 182.9197826036148 Z"
          fill="#4338ca"
          id="b1e16bab-bd95-4b51-a726-07e5b8145ba2"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 370.6644341423433 184.94685736071185 L 436.1925159784282 270.1045864974152 L 591.08569599987 289.24447745289007 L 655.8741303365523 182.01288113898784 L 616.3124983027985 130.63593265377577 L 447.575229997733 86.82274995905492 L 370.6644341423433 184.94685736071185 Z"
          fill="#4338ca"
          id="e37a3fc5-1437-4e4e-99b1-c5d7cd5477c2"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 101.08114631117542 184.16808817657383 L 154.1777392307977 305.787233235505 L 221.00663787618112 314.475359634898 L 338.35296369529283 183.58532947611133 L 256.3278534555273 105.80631646959746 L 113.84838320757824 162.47609950095276 L 101.08114631117542 184.16808817657383 Z"
          fill="#4338ca"
          id="1e5c33ea-06bf-45d7-ba52-92f34929c240"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 769.2240807141346 168.51699880027158 L 834.0078236374304 333.6970319770744 L 919.9999999999999 372.11059459940185 L 920 135.0219024302608 L 812.6300630703332 131.70664053603718 L 769.2240807141346 168.51699880027158 Z"
          fill="#4338ca"
          id="35f2f527-90ca-4de5-9a14-64158c99effb"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 0 374.05535084983603 L 96.07508174505384 373.62155725091293 L 154.17773923079764 305.78723323550497 L 101.08114631117543 184.16808817657395 L 0 182.91978260361478 L 0 374.05535084983603 Z"
          fill="#4338ca"
          id="5a2ffb3a-a797-4421-b708-4fc5b46fb4f5"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 221.00663787618123 314.4753596348979 L 339.82586696257715 443.19140440118275 L 436.19251597842816 270.1045864974153 L 370.6644341423431 184.9468573607118 L 338.352963695293 183.58532947611133 L 221.00663787618123 314.4753596348979 Z"
          fill="#4338ca"
          id="124115b6-35de-47ee-9a4a-6fd357252e6d"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 591.0856959998698 289.24447745288995 L 602.0942370259244 364.6693670858744 L 753.7358245040427 406.72771352784355 L 834.0078236374302 333.69703197707423 L 769.2240807141347 168.5169988002718 L 655.8741303365521 182.0128811389875 L 591.0856959998698 289.24447745288995 Z"
          fill="#4338ca"
          id="2d1e0f85-00c0-4f5c-9307-a9c30b800a79"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 339.8258669625763 443.1914044011843 L 347.9096525454521 479.99999999999983 L 555.694768015706 479.99999999999994 L 602.0942370259244 364.6693670858747 L 591.0856959998698 289.24447745289 L 436.19251597842845 270.10458649741526 L 339.8258669625763 443.1914044011843 Z"
          fill="#4338ca"
          id="a1b81728-cdfe-4884-b3f2-8fd4a1f21c03"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 96.07508174505381 373.6215572509128 L 118.37043521052728 480.00000000000006 L 347.909652545453 480.00000000000006 L 339.8258669625766 443.1914044011821 L 221.00663787618126 314.4753596348979 L 154.1777392307976 305.78723323550497 L 96.07508174505381 373.6215572509128 Z"
          fill="#4338ca"
          id="946cb5ed-c96e-4f0a-9be0-8331f00d21f2"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 753.7358245040418 406.72771352784434 L 770.4563238781833 480.0000000000002 L 920.0000000000002 480.0000000000002 L 920.0000000000003 372.1105945994023 L 834.0078236374303 333.6970319770745 L 753.7358245040418 406.72771352784434 Z"
          fill="#4338ca"
          id="70499d77-1e7e-422c-880b-455726f5e1b0"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 770.4563238781839 479.9999999999999 L 753.7358245040425 406.7277135278435 L 602.0942370259246 364.66936708587446 L 555.6947680157061 479.99999999999983 L 770.4563238781839 479.9999999999999 Z"
          fill="#4338ca"
          id="2078c32c-7a63-4a84-b0b0-098b802d1b97"
          fillOpacity="1"
          onClick={onRegionClick}
        />
        <path
          d="M 118.37043521052726 480.00000000000006 L 96.07508174505381 373.6215572509129 L 0 374.05535084983615 L 0 480 L 118.37043521052726 480.00000000000006 Z"
          fill="#4338ca"
          id="346cf4ed-c9d3-44fd-aa8f-f8f09e3fcffe"
          fillOpacity="1"
          onClick={onRegionClick}
        />
      </g>
      <g id="svg_g_edges">
        <path
          id="svg_path_edges"
          d="M 804.1385503724395 0 L 812.6300630703339 131.7066405360372 M 612.7992966202027 0 L 616.3124983027985 130.6359326537758 M 426.01275109798166 0 L 447.57522999773306 86.82274995905495 M 261.85285221272306 0 L 256.3278534555273 105.80631646959743 M 113.84838320757835 162.4760995009527 L 88.87062476226981 0 M 447.57522999773306 86.82274995905495 L 616.3124983027985 130.6359326537758 M 447.57522999773306 86.82274995905495 L 370.6644341423433 184.94685736071187 M 256.3278534555273 105.80631646959743 L 113.84838320757835 162.4760995009527 M 256.3278534555273 105.80631646959743 L 338.35296369529283 183.58532947611135 M 812.6300630703339 131.7066405360372 L 920 135.02190243026075 M 616.3124983027985 130.6359326537758 L 655.8741303365523 182.01288113898767 M 113.84838320757835 162.4760995009527 L 101.08114631117544 184.16808817657395 M 101.08114631117544 184.16808817657395 L 0 182.9197826036148 M 812.6300630703339 131.7066405360372 L 769.2240807141347 168.5169988002719 M 338.35296369529283 183.58532947611135 L 221.00663787618117 314.47535963489787 M 338.35296369529283 183.58532947611135 L 370.6644341423433 184.94685736071187 M 370.6644341423433 184.94685736071187 L 436.1925159784284 270.1045864974153 M 101.08114631117544 184.16808817657395 L 154.1777392307976 305.7872332355049 M 769.2240807141347 168.5169988002719 L 655.8741303365523 182.01288113898767 M 769.2240807141347 168.5169988002719 L 834.0078236374304 333.6970319770743 M 655.8741303365523 182.01288113898767 L 591.0856959998698 289.2444774528901 M 436.1925159784284 270.1045864974153 L 591.0856959998698 289.2444774528901 M 436.1925159784284 270.1045864974153 L 339.8258669625771 443.1914044011827 M 221.00663787618117 314.47535963489787 L 154.1777392307976 305.7872332355049 M 221.00663787618117 314.47535963489787 L 339.8258669625771 443.1914044011827 M 834.0078236374304 333.6970319770743 L 753.735824504043 406.72771352784355 M 834.0078236374304 333.6970319770743 L 920 372.11059459940185 M 154.1777392307976 305.7872332355049 L 96.0750817450538 373.6215572509129 M 591.0856959998698 289.2444774528901 L 602.0942370259244 364.6693670858744 M 753.735824504043 406.72771352784355 L 602.0942370259244 364.6693670858744 M 96.0750817450538 373.6215572509129 L 0 374.05535084983615 M 753.735824504043 406.72771352784355 L 770.4563238781843 480 M 96.0750817450538 373.6215572509129 L 118.37043521052723 480 M 602.0942370259244 364.6693670858744 L 555.6947680157058 480 M 339.8258669625771 443.1914044011827 L 347.90965254545335 480 M 0 374.05535084983615 L 0 480 M 0 480 L 118.37043521052723 480 M 555.6947680157058 480 L 770.4563238781843 480 M 770.4563238781843 480 L 920 480 M 920 480 L 920 372.11059459940185 M 118.37043521052723 480 L 347.90965254545335 480 M 347.90965254545335 480 L 555.6947680157058 480 M 0 182.9197826036148 L 0 374.05535084983615 M 920 372.11059459940185 L 920 135.02190243026075 M 88.87062476226981 0 L 0 0 M 0 0 L 0 182.9197826036148 M 426.01275109798166 0 L 261.85285221272306 0 M 261.85285221272306 0 L 88.87062476226981 0 M 612.7992966202027 0 L 426.01275109798166 0 M 804.1385503724395 0 L 612.7992966202027 0 M 920 135.02190243026075 L 920 0 M 920 0 L 804.1385503724395 0 "
          stroke="black"
          strokeWidth="2"
        />
      </g>
      {regionsState.map((r, i) => {
        const x = Number(r.x) > 900 ? 870 : r.x;
        const y = Number(r.y) < 10 ? 30 : r.y;
        return (
          <g>
            <circle
              id="c_0"
              cx={x}
              cy={y}
              r="3"
              stroke="black"
              strokeWidth="2"
              fill="#4338ca"
            />
            <text
              fill={r.color || 'black'}
              key={r.id}
              x={x + 10}
              y={y}
            >
              {r.amount}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default MapSvg;