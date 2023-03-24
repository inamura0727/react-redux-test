import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';

describe('Rendering', () => {
  it('should render all the element correctly', () => {
    render(<Form />);
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(
      screen.getByPlaceholderText('Input things you have to do'),
    ).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });
});

describe('Input from onChange event', () => {
  it('should update input value correctly', async () => {
    render(<Form />);
    const inputValue: HTMLInputElement = screen.getByPlaceholderText(
      'Input things you have to do',
    );
    await userEvent.type(inputValue, 'test');
    expect(inputValue.value).toBe('test');
  });
});
