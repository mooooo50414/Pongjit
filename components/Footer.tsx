
import React from 'react';
import type { Language } from '../types.ts';
import { i18n } from '../lib/i18n.ts';

interface FooterProps {
    lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = i18n(lang).footer;
  return (
    <footer className="text-center py-6 px-4 text-xs text-gray-600 dark:text-gray-500 font-body">
      <p className="font-semibold accent-gradient-text mb-2 text-sm">{t.powered_by}</p>
      <p>{t.inspiredBy}</p>
      <p>{t.conceptual}</p>
    </footer>
  );
};
