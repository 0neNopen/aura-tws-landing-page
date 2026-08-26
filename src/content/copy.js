/**
 * Page copy — single source of truth for hero, CTA, and footer text.
 * Sections render from these constants; keep marketing edits here.
 */
import { ORDER_URL } from './links';

export const HERO = {
  badge: 'AURA TWS • Edition 01',
  title: 'Architectural Sound Precision.',
  subtitle:
    'Cinematic audio engineering, wrapped in a hand-milled titanium-aluminum enclosure.',
  primaryCta: { label: 'Pre-Order AURA TWS', href: ORDER_URL },
  secondaryCta: { label: 'Explore Specifications', href: '#storytelling' },
};

export const CTA_SECTION = {
  title: 'Sound Precision. Redefined.',
  body: 'Available in limited batch production. Reserve your pair today in Paper White or Ink Black.',
  cta: { label: 'Order AURA TWS — $299', href: ORDER_URL },
};

export const FOOTER = {
  copyright: '© 2026 AURA Sound Tech. All rights reserved.',
};
