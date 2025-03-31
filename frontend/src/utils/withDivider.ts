import React from 'react';

/**
 * 컴포넌트 배열 사이에 Divider 삽입
 */
export const withDivider = (
  components: React.ReactNode[],
  divider: React.ReactElement,
): React.ReactNode[] => {
  return components.flatMap((comp, i) => {
    const keyPrefix = `section-${i}`;

    const contentWithKey = React.isValidElement(comp)
      ? React.cloneElement(comp, {key: `${keyPrefix}-component`})
      : comp;

    const dividerWithKey = React.cloneElement(divider, {
      key: `${keyPrefix}-divider`,
    });

    return i === components.length - 1
      ? [contentWithKey]
      : [contentWithKey, dividerWithKey];
  });
};
