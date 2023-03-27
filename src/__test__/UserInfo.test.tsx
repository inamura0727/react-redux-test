import React from 'react';
import { render, screen } from '@testing-library/react';
import UserInfo from '../components/UserInfo';

describe('useEffect rendering', () => {
  it('should render only after async function resolved', async () => {
    render(<UserInfo />);
    expect(screen.queryByText(/こんにちは/)).toBeNull();
    expect(await screen.findByText(/こんにちは/)).toBeInTheDocument();
  });
});
