import React from 'react';
import { Student } from '../types/types_marketplace';
import { useTranslation } from 'react-i18next';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const {t, i18n} = useTranslation();
  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <>
    
      <img 
        src={student.profil_picture} 
        alt={`${student.first_name} ${student.last_name}`}
        className="student-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = '/api/placeholder/400/250';
        }}
      />
      
      <div className="card-content">
        <h2 className='name_student'>{student.first_name} {student.last_name}</h2>
        <div className="student-info">
          <p className="university"><span className='logo'>🎓</span> {student.university}</p>
          <p className="duration">
            <span className='logo'>📅</span> {formatDate(student.starting_date)} - {formatDate(student.ending_date)}
          </p>
          
          {student.languages.length > 0 && (
            <div className="languages">
              <strong><span className='logo'>🗣️</span> {t('profile.student.sections.languages.title')}:</strong>
              <span className="language-list">
                {student.languages.map((lang, index) => (
                  <span key={index} className="language-tag">
                    {lang.languageSpoken.language}
                  </span>
                ))}
              </span>
            </div>
          )}
          
          {student.sectorPreferences.length > 0 && (
            <div className="sectors">
              <strong><span className='logo'>💼</span> {t('profile.interestedIn')}:</strong>
              <span className="sector-list">
                {student.sectorPreferences.map((sector, index) => (
                  <span key={index} className="sector-tag">
                    {sector.sectorPreference.sector_preference}
                  </span>
                ))}
              </span>
            </div>
          )}
          
          {student.linkedin_url && (
            <a 
              href={student.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-link"
              onClick={(e) => e.stopPropagation()}
            >
              <span className='logo'>🔗</span> {t('profile.linkedInProfile')}
            </a>
          )}
        </div>
        <div className="swipe-hint">
          <span className="hint-left">👈 {t('actions.skip')}</span>
          <span className="hint-right">{t('actions.like')} 👉</span>
        </div>
      </div>    
    </>
  );
};

export default StudentCard;