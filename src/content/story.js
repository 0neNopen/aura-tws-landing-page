/**
 * Story content — single source of truth for the scroll sequence.
 * Each chapter owns its image, copy, metrics, and scroll range.
 *
 * Copy style: plain, confident English. Technical claims are verbatim.
 */

export const STORY_CHAPTERS = [
  {
    id: 'foto1',
    path: '/foto1.webp',
    title: 'Unveil Perfection',
    subtitle: 'Chassis & Form',
    // "precision-milled" takes a hyphen as a compound modifier.
    description: 'A precision-milled aluminum casing, engineered to micron tolerances for a seamless hand feel and clean sound isolation.',
    metrics: [
      { label: 'Weight', value: '4.2g per earbud' },
      { label: 'Tolerance', value: '±0.01mm' },
    ],
    range: [0.00, 0.11],
  },
  {
    id: 'foto2',
    path: '/foto2.webp',
    title: 'Ergonomic Sculpting',
    subtitle: 'Anatomic Fit',
    // Lightened: "crafted to provide" → "shaped for"; "across" → "through".
    description: '3D-scanned ear-contour geometry, shaped for fatigue-free listening through long listening sessions.',
    metrics: [
      { label: 'Ear Tips', value: '4 Custom Sizes' },
      { label: 'Pressure Relief', value: 'Dual Vented' },
    ],
    range: [0.12, 0.22],
  },
  {
    id: 'foto3',
    path: '/foto3.webp',
    title: 'Acoustic Engineering',
    subtitle: 'Driver Chamber',
    description: 'A custom 11mm titanium-diaphragm driver delivering visceral bass and crystalline highs.',
    metrics: [
      { label: 'Frequency', value: '10Hz - 40kHz' },
      { label: 'Driver', value: '11mm Titanium' },
    ],
    range: [0.23, 0.33],
  },
  {
    id: 'foto4',
    path: '/foto4.webp',
    title: 'Wireless Freedom',
    subtitle: 'Ultra Low Latency',
    // Tightened: dropped the redundant "wireless audio codec" wording.
    description: 'Next-generation Bluetooth 5.4 with high-resolution codec support for lossless clarity.',
    metrics: [
      { label: 'Latency', value: '38ms Game Mode' },
      { label: 'Codec', value: 'LDAC / AAC / SBC' },
    ],
    range: [0.34, 0.44],
  },
  {
    id: 'foto5',
    path: '/foto5.webp',
    title: 'Magnetic Docking',
    subtitle: 'Smart Enclosure',
    // "Neodymium magnetic snap-fit" stacked three modifiers; now one clean sentence.
    description: 'The neodymium snap-fit charging case seats the earbuds with a solid, satisfying click — and charges wirelessly over Qi.',
    metrics: [
      { label: 'Magnet Type', value: 'N52 Neodymium' },
      { label: 'Charging', value: 'Qi & USB-C' },
    ],
    range: [0.45, 0.55],
  },
  {
    id: 'foto6',
    path: '/foto6.webp',
    title: 'Capacitive Touch',
    subtitle: 'Intuitive Controls',
    description: 'An ultra-responsive touch surface that reads tap, swipe, and hold gestures with instant haptic feedback.',
    metrics: [
      { label: 'Sensors', value: 'High-Precision Capacitive' },
      { label: 'Gestures', value: 'Fully Customizable' },
    ],
    range: [0.56, 0.66],
  },
  {
    id: 'foto7',
    path: '/foto7.webp',
    title: 'Enduring Power',
    subtitle: 'All-Day Stamina',
    description: 'Energy-dense lithium-polymer cells deliver up to 9 hours of playback on a single charge.',
    metrics: [
      { label: 'Playback', value: '9 hrs Earbuds' },
      { label: 'Total Battery', value: '36 hrs w/ Case' },
    ],
    range: [0.67, 0.77],
  },
  {
    id: 'foto8',
    path: '/foto8.webp',
    title: 'Silence on Demand',
    subtitle: 'Hybrid ANC',
    // "in real-time" → "in real time" (adverbial phrase takes no hyphen).
    description: 'A dual-feedforward and feedback mic array filters up to 48dB of ambient noise in real time.',
    metrics: [
      { label: 'Noise Reduction', value: '-48dB Hybrid ANC' },
      { label: 'Transparency', value: 'Adaptive Pass-through' },
    ],
    range: [0.78, 0.88],
  },
  {
    id: 'foto9',
    path: '/foto9.webp',
    title: 'Pure Sound Architecture',
    subtitle: 'Acoustic Mastery',
    description: 'Tuned for studio-reference fidelity, precise spatial placement, and effortless musicality.',
    metrics: [
      { label: 'Fidelity Rating', value: 'Hi-Res Certified' },
      { label: 'Tuning', value: 'Reference Studio' },
    ],
    range: [0.89, 1.00],
  },
];

export const PRODUCT_IMAGES = STORY_CHAPTERS.map(chapter => chapter.path);
