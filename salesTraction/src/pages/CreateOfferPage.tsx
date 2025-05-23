import React, { useState, FormEvent, useEffect } from 'react';
import '../assets/css/CreateOfferPage.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CreateOfferFormData {
  title: string;
  description: string;
  price: number;
  commission: number;
  target_customer: string;
  is_active: boolean;
  product_image: string;
  region: string;
  remote_or_physical: boolean;
  id_startup: number;
}

const CreateOfferPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CreateOfferFormData>({
    title: '',
    description: '',
    price: 0,
    commission: 0,
    target_customer: '',
    is_active: true,
    product_image: '',
    region: '',
    remote_or_physical: true,
    id_startup: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const nav = useNavigate();

  useEffect(() => {
    // Get startup ID from localStorage
    const startupId = localStorage.getItem('userId');
    if (startupId) {
      setFormData(prev => ({
        ...prev,
        id_startup: parseInt(startupId, 10)
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number' || name === 'price' || name === 'commission') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Create a copy of the form data to modify the commission
      const dataToSubmit = {
        ...formData,
        commission: formData.commission / 100 // Convert percentage to decimal
      };
      
      const response = await fetch('http://localhost:3000/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Offer created:', data);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        price: 0,
        commission: 0,
        target_customer: '',
        is_active: true,
        product_image: '',
        region: '',
        remote_or_physical: true,
        id_startup: formData.id_startup, // Keep the startup ID
      });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      nav('/offers');
    } catch (err) {
      console.error('Error creating offer:', err);
      setError(t('offerCreation.error'));
    } finally {
      setLoading(false);
    }
  };

  return (<>
        <Header />
    <div className="create-offer-container">
    
      
      
      {success && (
        <div className="success-message">
          {t('offerCreation.success')}
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">{t('offerCreation.pageTitle')}</label><br />
          <label htmlFor="title">{t('offerCreation.title')}*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={255}
            placeholder={t('offerCreation.titlePlaceholder')}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">{t('offerCreation.description')}*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={2000}
            rows={5}
            placeholder={t('offerCreation.descriptionPlaceholder')}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">{t('offerCreation.price')} (€)*</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              max="999.99"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="commission">{t('offerCreation.commission')} (%)*</label>
            <input
              type="number"
              id="commission"
              name="commission"
              value={formData.commission}
              onChange={handleChange}
              required
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="target_customer">{t('offerCreation.targetCustomer')}*</label>
          <input
            type="text"
            id="target_customer"
            name="target_customer"
            value={formData.target_customer}
            onChange={handleChange}
            required
            maxLength={255}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="region">{t('offerCreation.region')}*</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            maxLength={255}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="product_image">{t('offerCreation.image')}*</label>
          <input
            type="text"
            id="product_image"
            name="product_image"
            value={formData.product_image}
            onChange={handleChange}
            required
            maxLength={255}
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="remote_or_physical"
              checked={formData.remote_or_physical}
              onChange={handleChange}
            />
            {t('offerCreation.remote')}
          </label>
        </div>
        
        <div className="form-actions">
          <button className="button" type="submit" disabled={loading}>
            {loading ? t('offerCreation.creating') : t('offerCreation.submit')}
          </button>
        </div>
      </form>
    </div></>
  );
};

export default CreateOfferPage;