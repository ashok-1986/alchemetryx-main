const fs = require('fs');
const path = require('path');

// Palette
const PALETTE = {
  SAPPHIRE: [0.10196, 0.14902, 0.25882, 1], // #1A2642
  CARD_FILL: [0.16471, 0.20784, 0.30588, 1], // #2A354E
  LEFT_BORDER: [0.25882, 0.29412, 0.38039, 1], // #424B61
  GOLD: [0.83137, 0.68627, 0.21569, 1], // #D4AF37
  PEARL: [0.97255, 0.96471, 0.94118, 1] // #F8F6F0
};

// Ease-out easing handles: cubic-bezier(0.16, 1, 0.3, 1)
const EASE_OUT = {
  i: { x: [0.3], y: [1.0] },
  o: { x: [0.16], y: [1.0] }
};

// Ease-in-out easing handles for pulse
const EASE_IN_OUT = {
  i: { x: [0.42], y: [1.0] },
  o: { x: [0.58], y: [0.0] }
};

/**
 * Creates a shape layer with given shapes
 */
function createShapeLayer({ ind, nm, shapes, transform = {} }) {
  return {
    ddd: 0,
    ind,
    ty: 4,
    nm,
    sr: 1,
    ks: {
      o: transform.o || { a: 0, k: 100 },
      r: transform.r || { a: 0, k: 0 },
      p: transform.p || { a: 0, k: [0, 0, 0] },
      a: transform.a || { a: 0, k: [0, 0, 0] },
      s: transform.s || { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes,
    ip: 0,
    op: 144,
    st: 0,
    bm: 0
  };
}

/**
 * Creates a rounded rectangle shape group
 */
function createRoundedRect({ nm, x, y, width, height, rx, fill, stroke, strokeOpacityKeyframes }) {
  const items = [];

  // Rectangle path
  items.push({
    ty: "rc",
    nm: "Rectangle Path",
    d: 1,
    s: { a: 0, k: [width, height] },
    p: { a: 0, k: [x + width / 2, y + height / 2] },
    r: { a: 0, k: rx }
  });

  // Fill
  if (fill) {
    items.push({
      ty: "fl",
      nm: "Fill",
      c: { a: 0, k: fill.color },
      o: { a: 0, k: fill.opacity != null ? fill.opacity : 100 },
      r: 1
    });
  }

  // Stroke
  if (stroke) {
    let strokeOpacity;
    if (strokeOpacityKeyframes) {
      strokeOpacity = {
        a: 1,
        k: strokeOpacityKeyframes
      };
    } else {
      strokeOpacity = {
        a: 0,
        k: stroke.opacity != null ? stroke.opacity : 100
      };
    }

    items.push({
      ty: "st",
      nm: "Stroke",
      c: { a: 0, k: stroke.color },
      o: strokeOpacity,
      w: { a: 0, k: stroke.width || 1 },
      lc: 2,
      lj: 2
    });
  }

  // Group transform
  items.push({
    ty: "tr",
    p: { a: 0, k: [0, 0] },
    a: { a: 0, k: [0, 0] },
    s: { a: 0, k: [100, 100] },
    r: { a: 0, k: 0 },
    o: { a: 0, k: 100 }
  });

  return {
    ty: "gr",
    nm,
    it: items
  };
}

/**
 * Creates an ellipse shape group
 */
function createEllipse({ nm, cx, cy, rx, ry, fill, stroke, strokeOpacityKeyframes, gradientFill }) {
  const items = [];

  items.push({
    ty: "el",
    nm: "Ellipse Path",
    d: 1,
    s: { a: 0, k: [rx * 2, ry * 2] },
    p: { a: 0, k: [cx, cy] }
  });

  if (gradientFill) {
    items.push(gradientFill);
  } else if (fill) {
    items.push({
      ty: "fl",
      nm: "Fill",
      c: { a: 0, k: fill.color },
      o: { a: 0, k: fill.opacity != null ? fill.opacity : 100 },
      r: 1
    });
  }

  if (stroke) {
    let strokeOpacity;
    if (strokeOpacityKeyframes) {
      strokeOpacity = {
        a: 1,
        k: strokeOpacityKeyframes
      };
    } else {
      strokeOpacity = {
        a: 0,
        k: stroke.opacity != null ? stroke.opacity : 100
      };
    }

    items.push({
      ty: "st",
      nm: "Stroke",
      c: { a: 0, k: stroke.color },
      o: strokeOpacity,
      w: { a: 0, k: stroke.width || 1 },
      lc: 2,
      lj: 2
    });
  }

  items.push({
    ty: "tr",
    p: { a: 0, k: [0, 0] },
    a: { a: 0, k: [0, 0] },
    s: { a: 0, k: [100, 100] },
    r: { a: 0, k: 0 },
    o: { a: 0, k: 100 }
  });

  return {
    ty: "gr",
    nm,
    it: items
  };
}

/**
 * Creates a connector path with trim path animation
 */
function createConnector({ nm, v, i, o, startFrame, endFrame }) {
  const items = [];

  // Path shape
  items.push({
    ty: "sh",
    nm: "Path",
    d: 1,
    ks: {
      a: 0,
      k: {
        i,
        o,
        v,
        c: false
      }
    }
  });

  // Trim path: animated 0 to 100% with ease-out
  const trimKeyframes = [];
  if (startFrame > 0) {
    trimKeyframes.push({
      t: 0,
      s: [0],
      h: 1 // hold until startFrame
    });
  }
  trimKeyframes.push({
    t: startFrame,
    s: [0],
    ...EASE_OUT
  });
  trimKeyframes.push({
    t: endFrame,
    s: [100]
  });

  items.push({
    ty: "tm",
    nm: "Trim Paths",
    s: { a: 0, k: 0 },
    e: {
      a: 1,
      k: trimKeyframes
    },
    o: { a: 0, k: 0 },
    m: 1
  });

  // Stroke: #D4AF37 at 40% opacity, 1.25px
  items.push({
    ty: "st",
    nm: "Stroke",
    c: { a: 0, k: PALETTE.GOLD },
    o: { a: 0, k: 40 },
    w: { a: 0, k: 1.25 },
    lc: 2,
    lj: 2
  });

  items.push({
    ty: "tr",
    p: { a: 0, k: [0, 0] },
    a: { a: 0, k: [0, 0] },
    s: { a: 0, k: [100, 100] },
    r: { a: 0, k: 0 },
    o: { a: 0, k: 100 }
  });

  return {
    ty: "gr",
    nm,
    it: items
  };
}

function generateLottie() {
  const layers = [];
  let layerIndex = 1;

  // 1. Right boxes border animation keyframes (2.2s to 2.4s = frames 132 to 144)
  // Each right box's border brightens from 45% to 70% opacity and settles.
  const rightBoxBorderOpacityKeyframes = [
    {
      t: 0,
      s: [45],
      h: 1
    },
    {
      t: 132,
      s: [45],
      ...EASE_OUT
    },
    {
      t: 144,
      s: [70]
    }
  ];

  // 2. Hub gold ring pulse keyframes (1.0s to 1.2s = frames 60 to 72)
  // Ring brightens from 30% to 60% opacity and back, one soft pulse.
  const hubRingOpacityKeyframes = [
    {
      t: 0,
      s: [30],
      h: 1
    },
    {
      t: 60,
      s: [30],
      ...EASE_IN_OUT
    },
    {
      t: 66,
      s: [60],
      ...EASE_IN_OUT
    },
    {
      t: 72,
      s: [30]
    }
  ];

  // Background Layer: Hub Radial Glow (at the very bottom, z-index lowest)
  const radialGlow = {
    ty: "gf",
    nm: "Radial Glow",
    g: {
      p: 2,
      k: {
        a: 0,
        k: [
          0, PALETTE.GOLD[0], PALETTE.GOLD[1], PALETTE.GOLD[2],
          1, PALETTE.GOLD[0], PALETTE.GOLD[1], PALETTE.GOLD[2],
          0, 0.16,
          1, 0
        ]
      }
    },
    o: { a: 0, k: 100 },
    t: 2, // radial
    s: { a: 0, k: [310, 220] },
    e: { a: 0, k: [410, 220] },
    r: 1
  };

  layers.push(createShapeLayer({
    ind: layerIndex++,
    nm: "Hub Radial Glow",
    shapes: [
      createEllipse({
        nm: "Glow Circle",
        cx: 310,
        cy: 220,
        rx: 100,
        ry: 100,
        gradientFill: radialGlow
      })
    ]
  }));

  // Connector Paths Layer: Left Connectors
  const leftConnectors = [
    createConnector({
      nm: "Left Connector 1 (Top)",
      v: [[184, 78], [266, 182]],
      i: [[0, 0], [-8, -50]],
      o: [[56, 0], [0, 0]],
      startFrame: 0,
      endFrame: 45.6
    }),
    createConnector({
      nm: "Left Connector 2 (Middle)",
      v: [[184, 220], [244, 220]],
      i: [[0, 0], [-16, 0]],
      o: [[26, 0], [0, 0]],
      startFrame: 7.2,
      endFrame: 52.8
    }),
    createConnector({
      nm: "Left Connector 3 (Bottom)",
      v: [[184, 362], [266, 258]],
      i: [[0, 0], [-8, 50]],
      o: [[56, 0], [0, 0]],
      startFrame: 14.4,
      endFrame: 60.0
    })
  ];

  layers.push(createShapeLayer({
    ind: layerIndex++,
    nm: "Left Connectors",
    shapes: leftConnectors
  }));

  // Connector Paths Layer: Right Connectors
  const rightConnectors = [
    createConnector({
      nm: "Right Connector 1 (Top)",
      v: [[354, 182], [436, 78]],
      i: [[0, 0], [-56, 0]],
      o: [[8, -50], [0, 0]],
      startFrame: 72.0,
      endFrame: 117.6
    }),
    createConnector({
      nm: "Right Connector 2 (Middle)",
      v: [[376, 220], [436, 220]],
      i: [[0, 0], [-24, 0]],
      o: [[20, 0], [0, 0]],
      startFrame: 79.2,
      endFrame: 124.8
    }),
    createConnector({
      nm: "Right Connector 3 (Bottom)",
      v: [[354, 258], [436, 362]],
      i: [[0, 0], [-56, 0]],
      o: [[8, 50], [0, 0]],
      startFrame: 86.4,
      endFrame: 132.0
    })
  ];

  layers.push(createShapeLayer({
    ind: layerIndex++,
    nm: "Right Connectors",
    shapes: rightConnectors
  }));

  // Left Boxes Layer (3 rounded rectangles stacked down left edge)
  const leftBoxesShapes = [
    createRoundedRect({
      nm: "Left Box 1",
      x: 8,
      y: 40,
      width: 176,
      height: 76,
      rx: 5,
      fill: { color: PALETTE.CARD_FILL, opacity: 100 },
      stroke: { color: PALETTE.LEFT_BORDER, opacity: 100, width: 1 }
    }),
    createRoundedRect({
      nm: "Left Box 2",
      x: 8,
      y: 182,
      width: 176,
      height: 76,
      rx: 5,
      fill: { color: PALETTE.CARD_FILL, opacity: 100 },
      stroke: { color: PALETTE.LEFT_BORDER, opacity: 100, width: 1 }
    }),
    createRoundedRect({
      nm: "Left Box 3",
      x: 8,
      y: 324,
      width: 176,
      height: 76,
      rx: 5,
      fill: { color: PALETTE.CARD_FILL, opacity: 100 },
      stroke: { color: PALETTE.LEFT_BORDER, opacity: 100, width: 1 }
    })
  ];

  layers.push(createShapeLayer({
    ind: layerIndex++,
    nm: "Left Boxes",
    shapes: leftBoxesShapes
  }));

  // Right Boxes Layer (3 rounded rectangles stacked down right edge)
  const rightBoxesShapes = [
    createRoundedRect({
      nm: "Right Box 1",
      x: 436,
      y: 40,
      width: 176,
      height: 76,
      rx: 5,
      fill: { color: PALETTE.CARD_FILL, opacity: 100 },
      stroke: { color: PALETTE.GOLD, width: 1 },
      strokeOpacityKeyframes: rightBoxBorderOpacityKeyframes
    }),
    createRoundedRect({
      nm: "Right Box 2",
      x: 436,
      y: 182,
      width: 176,
      height: 76,
      rx: 5,
      fill: { color: PALETTE.CARD_FILL, opacity: 100 },
      stroke: { color: PALETTE.GOLD, width: 1 },
      strokeOpacityKeyframes: rightBoxBorderOpacityKeyframes
    }),
    createRoundedRect({
      nm: "Right Box 3",
      x: 436,
      y: 324,
      width: 176,
      height: 76,
      rx: 5,
      fill: { color: PALETTE.CARD_FILL, opacity: 100 },
      stroke: { color: PALETTE.GOLD, width: 1 },
      strokeOpacityKeyframes: rightBoxBorderOpacityKeyframes
    })
  ];

  layers.push(createShapeLayer({
    ind: layerIndex++,
    nm: "Right Boxes",
    shapes: rightBoxesShapes
  }));

  // Center Hub Layer (inner circle, outer gold ring, ports)
  const hubShapes = [
    // Outer thin gold ring (r=66), thin 1px, 30% -> 60% -> 30% pulse
    createEllipse({
      nm: "Hub Gold Ring",
      cx: 310,
      cy: 220,
      rx: 66,
      ry: 66,
      stroke: { color: PALETTE.GOLD, width: 1 },
      strokeOpacityKeyframes: hubRingOpacityKeyframes
    }),
    // Main hub inner circle (r=52), fill #2A354E, stroke #D4AF37 at 50%
    createEllipse({
      nm: "Hub Inner Circle",
      cx: 310,
      cy: 220,
      rx: 52,
      ry: 52,
      fill: { color: PALETTE.CARD_FILL, opacity: 100 },
      stroke: { color: PALETTE.GOLD, opacity: 50, width: 1 }
    }),
    // Connection anchor dots (r=2.5) on hub boundary
    ...[
      [266, 182], [244, 220], [266, 258],
      [354, 182], [376, 220], [354, 258]
    ].map(([cx, cy], idx) => createEllipse({
      nm: `Hub Port ${idx + 1}`,
      cx,
      cy,
      rx: 2.5,
      ry: 2.5,
      fill: { color: PALETTE.GOLD, opacity: 70 }
    }))
  ];

  layers.push(createShapeLayer({
    ind: layerIndex++,
    nm: "Hub",
    shapes: hubShapes
  }));

  // In Bodymovin: layers[0] is drawn on top, layers[last] is drawn at the bottom
  // So we put Hub and Boxes at the top (lowest index), connectors below, and glow at the bottom (highest index).
  layers.reverse();
  // Update ind
  layers.forEach((l, idx) => {
    l.ind = idx + 1;
  });

  const lottieData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 144,
    w: 620,
    h: 440,
    nm: "Alchemetryx System Flow",
    ddd: 0,
    assets: [],
    layers
  };

  return lottieData;
}

const lottieJson = generateLottie();
const outputDir = path.join(__dirname, '..', 'public', 'animations');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'system-flow.json');
// Minified format to stay well under 40KB
const jsonString = JSON.stringify(lottieJson);
fs.writeFileSync(outputPath, jsonString, 'utf8');

const fileSizeKB = (Buffer.byteLength(jsonString, 'utf8') / 1024).toFixed(2);
console.log(`Lottie animation written to: ${outputPath}`);
console.log(`File size: ${fileSizeKB} KB (Limit: < 40KB)`);

