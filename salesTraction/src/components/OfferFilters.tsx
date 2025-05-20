import React, { useState, useEffect } from 'react';
import { OfferFilters } from '../types/types_marketplace';

interface OfferFiltersProps {
  filters: OfferFilters;
  onFilterChange: (filters: OfferFilters) => void;
  availableRegions: string[];
  availableSectors: string[];
  onToggleFilters: () => void;
  isVisible: boolean;
}

const OfferFiltersComponent: React.FC<OfferFiltersProps> = ({
  filters,
  onFilterChange,
  availableRegions,
  availableSectors,
  onToggleFilters,
  isVisible
}) => {
  // Local state for filters to enable reset
  const [localFilters, setLocalFilters] = useState<OfferFilters>(filters);

  // Update local filters when the parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof OfferFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const emptyFilters: OfferFilters = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  if (!isVisible) {
    return (
      <button 
        className="filter-toggle-button"
        onClick={onToggleFilters}
      >
        Show Filters
      </button>
    );
  }

  return (
    <div className="offer-filters">
      <div className="filter-header">
        <h3>Filter Offers</h3>
        <button 
          className="filter-close-button"
          onClick={onToggleFilters}
        >
          ×
        </button>
      </div>

      <div className="filter-section">
        <label>Region</label>
        <select
          value={localFilters.region || ''}
          onChange={(e) => handleFilterChange('region', e.target.value || undefined)}
        >
          <option value="">All Regions</option>
          {availableRegions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>Sector</label>
        <select
          value={localFilters.secteur || ''}
          onChange={(e) => handleFilterChange('secteur', e.target.value || undefined)}
        >
          <option value="">All Sectors</option>
          {availableSectors.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>Commission Range (%)</label>
        <div className="range-inputs">
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Min"
            value={localFilters.minCommission || ''}
            onChange={(e) => handleFilterChange('minCommission', e.target.value ? Number(e.target.value) : undefined)}
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Max"
            value={localFilters.maxCommission || ''}
            onChange={(e) => handleFilterChange('maxCommission', e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
      </div>

      <div className="filter-section">
        <label>Work Type</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="remote"
              checked={localFilters.remote_or_physical === null || localFilters.remote_or_physical === undefined}
              onChange={() => handleFilterChange('remote_or_physical', null)}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="remote"
              checked={localFilters.remote_or_physical === true}
              onChange={() => handleFilterChange('remote_or_physical', true)}
            />
            Remote
          </label>
          <label>
            <input
              type="radio"
              name="remote"
              checked={localFilters.remote_or_physical === false}
              onChange={() => handleFilterChange('remote_or_physical', false)}
            />
            On-site
          </label>
        </div>
      </div>

      <div className="filter-actions">
        <button 
          className="reset-filters-button"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default OfferFiltersComponent;