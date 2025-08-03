import type React from 'react';

export const isToggleKey = (e: React.KeyboardEvent) => e.key === 'Enter' || e.key === ' ';
