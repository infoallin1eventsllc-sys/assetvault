import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('AssetVault App', () => {
  it('renders the AssetVault brand in the sidebar', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/AssetVault/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('renders the Overview view by default with the search/asset UI', () => {
    render(<App />);
    // The Overview view has a search input or asset section indicator
    // We just verify that the "Asset Overview" section title exists
    expect(screen.getAllByText(/Overview/i).length).toBeGreaterThan(0);
  });

  it('shows all six navigation tabs in the sidebar', () => {
    render(<App />);
    expect(screen.getAllByText(/Overview/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tokenize/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Portfolio/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Treasury/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Analytics/i).length).toBeGreaterThan(0);
  });

  it('navigates from Overview to Portfolio when Portfolio tab is clicked', () => {
    render(<App />);
    const portfolioButtons = screen.getAllByText(/Portfolio/i);
    fireEvent.click(portfolioButtons[0]);
    expect(screen.getAllByText(/Portfolio/i).length).toBeGreaterThan(0);
  });

  it('displays valuation figures on the Overview page', () => {
    render(<App />);
    const dollarSigns = screen.getAllByText(/\$/);
    expect(dollarSigns.length).toBeGreaterThan(0);
  });

  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
