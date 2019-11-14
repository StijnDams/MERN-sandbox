import React from 'react';
import { render as renderRtl } from '@testing-library/react';

import Home from './Home';

describe('Home module', () => {
  function renderComponent() {
    const result = renderRtl(<Home />);

    return {
      ...result,
      getHeader: result.getByRole.bind(null, 'heading'),
    };
  }

  describe('when user is anonymous', () => {
    test('it renders a welcome message', () => {
      const { getHeader } = renderComponent();

      const header = getHeader();
      expect(header).toHaveTextContent(/welcome stranger/i);
    });
  });
});
