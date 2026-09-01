import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { CharacterImage } from '@/components/character-image';

describe('CharacterImage', () => {
  test('falls back to initials when image is missing', () => {
    render(<CharacterImage name="Harry Potter" />);
    expect(screen.getByText('HP')).toBeDefined();
  });

  test('renders image when present', () => {
    render(<CharacterImage name="Harry Potter" image="https://example.com/hp.jpg" />);
    expect(screen.getByAltText('Harry Potter')).toBeDefined();
  });
});
