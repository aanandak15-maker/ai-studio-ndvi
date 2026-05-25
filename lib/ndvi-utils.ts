export interface ColorStop {
  val: number;
  r: number;
  g: number;
  b: number;
}

export const PALETTES: Record<string, ColorStop[]> = {
  classic: [
    { val: -1.0, r: 180, g: 20,  b: 20 },
    { val: -0.1, r: 220, g: 110, b: 30 },
    { val: 0.1,  r: 200, g: 200, b: 40 },
    { val: 0.5,  r: 34,  g: 197, b: 94 },
    { val: 1.0,  r: 10,  g: 100, b: 35 }
  ],
  spectral: [
    { val: -1.0, r: 15,  g: 32,  b: 168 },
    { val: -0.3, r: 0,   g: 180, b: 216 },
    { val: 0.0,  r: 34,  g: 197, b: 94 },
    { val: 0.4,  r: 234, g: 179, b: 8 },
    { val: 1.0,  r: 220, g: 38,  b: 38 }
  ],
  thermal: [
    { val: -1.0, r: 10,  g: 10,  b: 15 },
    { val: -0.4, r: 120, g: 20,  b: 120 },
    { val: 0.0,  r: 230, g: 80,  b: 20 },
    { val: 0.5,  r: 250, g: 210, b: 40 },
    { val: 1.0,  r: 255, g: 255, b: 255 }
  ],
  emerald: [
    { val: -1.0, r: 100, g: 116, b: 129 },
    { val: -0.2, r: 140, g: 160, b: 130 },
    { val: 0.2,  r: 74,  g: 117, b: 89 },
    { val: 0.6,  r: 16,  g: 185, b: 129 },
    { val: 1.0,  r: 0,   g: 255, b: 130 }
  ]
};

export const PALETTES_LIST = [
  { id: "classic", name: "Agri-Classic", desc: "Red-Yellow-Green standard indices", gradient: "linear-gradient(to right, #B41414, #DCA028, #22C55E)" },
  { id: "spectral", name: "Spectral GIS", desc: "Vibrant high-contrast moisture tracking", gradient: "linear-gradient(to right, #0F20A8, #00B4D8, #22C55E, #EAB308, #DC2626)" },
  { id: "thermal", name: "Thermal Stress", desc: "Dark thermal contrast stress mapping", gradient: "linear-gradient(to right, #0A0A0F, #781478, #E65014, #FAD228, #FFFFFF)" },
  { id: "emerald", name: "Canopy Structure", desc: "Forest green structural details", gradient: "linear-gradient(to right, #647481, #4A7559, #10B981, #00FF82)" },
];

export function getColorForNdvi(ndvi: number, paletteName: string): [number, number, number] {
  const stops = PALETTES[paletteName] || PALETTES.classic;
  if (ndvi <= stops[0].val) return [stops[0].r, stops[0].g, stops[0].b];
  if (ndvi >= stops[stops.length - 1].val) {
    const last = stops[stops.length - 1];
    return [last.r, last.g, last.b];
  }

  let i = 0;
  for (; i < stops.length - 1; i++) {
    if (ndvi >= stops[i].val && ndvi <= stops[i + 1].val) {
      break;
    }
  }

  const c1 = stops[i];
  const c2 = stops[i + 1];
  const t = (ndvi - c1.val) / (c2.val - c1.val);

  const r = Math.round(c1.r + t * (c2.r - c1.r));
  const g = Math.round(c1.g + t * (c2.g - c1.g));
  const b = Math.round(c1.b + t * (c2.b - c1.b));

  return [r, g, b];
}

export function getHealthStatus(ndvi: number): string {
  if (ndvi > 0.3) return "Healthy Crop (High Vitality)";
  if (ndvi > 0.15) return "Healthy Crop (Moderate Vitality)";
  if (ndvi > 0.05) return "Minor Stress (Low Vitality)";
  if (ndvi > -0.05) return "Stressed / Bare Soil (Sparse)";
  return "Severe Stress / Soil / Water";
}

export const generateSyntheticField = (): string => {
  if (typeof document === "undefined") return "";

  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 450;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // 1. Draw soil base (warm sandy brown)
  ctx.fillStyle = "#B38B6D";
  ctx.fillRect(0, 0, 800, 450);

  // Add soil texture
  for (let i = 0; i < 1500; i++) {
    const rx = Math.random() * 800;
    const ry = Math.random() * 450;
    const size = Math.random() * 1.5 + 1;
    ctx.fillStyle = Math.random() > 0.5 ? "#9C7356" : "#C79F80";
    ctx.fillRect(rx, ry, size, size);
  }

  // 2. Draw Crop Rows (green bands)
  const numRows = 16;
  const rowSpacing = 450 / numRows;

  for (let row = 0; row < numRows; row++) {
    const yCenter = row * rowSpacing + rowSpacing / 2;

    // Draw crop clumps along the row
    for (let x = 5; x < 795; x += 6) {
      // Stress Zone 1: Center (580, 300), Radius 95
      // Stress Zone 2: Center (220, 140), Radius 65
      const distToStress1 = Math.hypot(x - 580, yCenter - 300);
      const distToStress2 = Math.hypot(x - 220, yCenter - 140);

      let stressLevel = 0; // 0 is healthy, 1 is bare soil

      if (distToStress1 < 95) {
        stressLevel = Math.max(0, 1 - distToStress1 / 95);
      } else if (distToStress2 < 65) {
        stressLevel = Math.max(0, 1 - distToStress2 / 65);
      }

      const plantRate = 0.9 - stressLevel * 0.7;
      if (Math.random() < plantRate) {
        const healthyG = 130 + Math.floor(Math.random() * 40);
        const healthyR = 30 + Math.floor(Math.random() * 30);
        
        const g = Math.floor(healthyG * (1 - stressLevel) + 110 * stressLevel);
        const r = Math.floor(healthyR * (1 - stressLevel) + 170 * stressLevel);
        const b = Math.floor(15 * (1 - stressLevel) + 60 * stressLevel);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        const radius = (Math.random() * 3 + 5) * (1 - stressLevel * 0.4);
        ctx.beginPath();
        ctx.arc(x + (Math.random() * 4 - 2), yCenter + (Math.random() * 6 - 3), radius, 0, Math.PI * 2);
        ctx.fill();
        
        if (Math.random() > 0.6 && stressLevel < 0.3) {
          ctx.fillStyle = `rgb(${r - 20}, ${g + 30}, ${b})`;
          ctx.beginPath();
          ctx.arc(x, yCenter, radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  return canvas.toDataURL("image/jpeg", 0.95);
};
