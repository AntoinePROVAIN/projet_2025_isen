import React, { useState, useEffect } from 'react';
import { OfferFilters } from '../types/types_marketplace';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();

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
        id='show-filters'
      >
        {t('offers.showFilters')}
      </button>
    );
  }

  return (
    <div className="offer-filters">
      <div className="filter-header">
        <h3>{t('offers.filterOffers')}</h3>
        <button 
          className="filter-close-button"
          onClick={onToggleFilters}
        >
          ×
        </button>
      </div>

      <div className="filter-section">
        <label>{t('offers.region')}</label>
        <select
          value={localFilters.region || ''}
          onChange={(e) => handleFilterChange('region', e.target.value || undefined)}
        >
          <option value="">{t('filters.allRegions')}</option>
          {availableRegions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>{t('filters.sector')}</label>
        <select
          value={localFilters.secteur || ''}
          onChange={(e) => handleFilterChange('secteur', e.target.value || undefined)}
        >
          <option value="">{t('filters.allSectors')}</option>
          {availableSectors.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>{t('filters.commissionRange')}</label>
        <div className="range-inputs">
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Min"
            value={localFilters.minCommission || ''}
            onChange={(e) => handleFilterChange('minCommission', e.target.value ? Number(e.target.value) : undefined)}
          />
          <span>{t('filters.to')}</span>
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
        <label>{t('filters.workType')}</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="remote"
              checked={localFilters.remote_or_physical === null || localFilters.remote_or_physical === undefined}
              onChange={() => handleFilterChange('remote_or_physical', null)}
            />
            {t('filters.all')}
          </label>
          <label>
            <input
              type="radio"
              name="remote"
              checked={localFilters.remote_or_physical === true}
              onChange={() => handleFilterChange('remote_or_physical', true)}
            />
            {t('filters.remote')}
          </label>
          <label>
            <input
              type="radio"
              name="remote"
              checked={localFilters.remote_or_physical === false}
              onChange={() => handleFilterChange('remote_or_physical', false)}
            />
            {t('filters.onSite')}
          </label>
        </div>
      </div>

      <div className="filter-actions">
        <button 
          className="reset-filters-button"
          onClick={handleResetFilters}
        >
          {t('offers.resetFilters')}
        </button>
      </div>
    </div>
  );
};

export default OfferFiltersComponent;