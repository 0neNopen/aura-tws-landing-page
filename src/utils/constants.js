export const STORY_CHAPTERS = [
  {
    id: 'foto1',
    path: '/foto1.webp',
    title: 'Unveil Perfection',
    subtitle: 'Chassis & Form',
    description: 'Precision milled aluminum casing engineered to micron tolerances for seamless hand feel and sound isolation.',
    metrics: [
      { label: 'Weight', value: '4.2g per earbud' },
      { label: 'Tolerance', value: '±0.01mm' }
    ],
    range: [0.00, 0.11]
  },
  {
    id: 'foto2',
    path: '/foto2.webp',
    title: 'Ergonomic Sculpting',
    subtitle: 'Anatomic Fit',
    description: '3D scanned ear contour geometry crafted to provide fatigue-free listening across extended sessions.',
    metrics: [
      { label: 'Ear Tips', value: '4 Custom Sizes' },
      { label: 'Pressure Relief', value: 'Dual Vented' }
    ],
    range: [0.12, 0.22]
  },
  {
    id: 'foto3',
    path: '/foto3.webp',
    title: 'Acoustic Engineering',
    subtitle: 'Driver Chamber',
    description: 'Custom 11mm titanium diaphragm driver delivering visceral bass and crystalline high frequencies.',
    metrics: [
      { label: 'Frequency', value: '10Hz - 40kHz' },
      { label: 'Driver', value: '11mm Titanium' }
    ],
    range: [0.23, 0.33]
  },
  {
    id: 'foto4',
    path: '/foto4.webp',
    title: 'Wireless Freedom',
    subtitle: 'Ultra Low Latency',
    description: 'Next-generation Bluetooth 5.4 with high-resolution wireless audio codec support for lossless clarity.',
    metrics: [
      { label: 'Latency', value: '38ms Game Mode' },
      { label: 'Codec', value: 'LDAC / AAC / SBC' }
    ],
    range: [0.34, 0.44]
  },
  {
    id: 'foto5',
    path: '/foto5.webp',
    title: 'Magnetic Docking',
    subtitle: 'Smart Enclosure',
    description: 'Neodymium magnetic snap-fit charging case with solid tactile feedback and wireless Qi charging capability.',
    metrics: [
      { label: 'Magnet Type', value: 'N52 Neodymium' },
      { label: 'Charging', value: 'Qi & USB-C' }
    ],
    range: [0.45, 0.55]
  },
  {
    id: 'foto6',
    path: '/foto6.webp',
    title: 'Capacitive Touch',
    subtitle: 'Intuitive Controls',
    description: 'Ultra-responsive touch glass surface supporting tap, swipe, and hold gestures with instant haptic cues.',
    metrics: [
      { label: 'Sensors', value: 'High Precision Capacitive' },
      { label: 'Gestures', value: 'Fully Customizable' }
    ],
    range: [0.56, 0.66]
  },
  {
    id: 'foto7',
    path: '/foto7.webp',
    title: 'Enduring Power',
    subtitle: 'All-Day Stamina',
    description: 'Energy-dense lithium-polymer cells providing up to 9 hours of playback on a single charge.',
    metrics: [
      { label: 'Playback', value: '9 hrs Earbuds' },
      { label: 'Total Battery', value: '36 hrs w/ Case' }
    ],
    range: [0.67, 0.77]
  },
  {
    id: 'foto8',
    path: '/foto8.webp',
    title: 'Silence on Demand',
    subtitle: 'Hybrid ANC',
    description: 'Dual-feedforward and feedback mic array filtering up to 48dB of ambient noise in real-time.',
    metrics: [
      { label: 'Noise Reduction', value: '-48dB Hybrid ANC' },
      { label: 'Transparency', value: 'Adaptive Pass-thru' }
    ],
    range: [0.78, 0.88]
  },
  {
    id: 'foto9',
    path: '/foto9.webp',
    title: 'Pure Sound Architecture',
    subtitle: 'Acoustic Mastery',
    description: 'Mastered to deliver studio reference audio fidelity, spatial placement, and effortless musicality.',
    metrics: [
      { label: 'Fidelity Rating', value: 'Hi-Res Certified' },
      { label: 'Tuning', value: 'Reference Studio' }
    ],
    range: [0.89, 1.00]
  }
];

export const PRODUCT_IMAGES = STORY_CHAPTERS.map(chapter => chapter.path);
export const RENDER_SEQUENCE = STORY_CHAPTERS;
