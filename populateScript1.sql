-- === LANGUAGE_SPOKEN ===
INSERT INTO language_spoken (language) VALUES
('English'),
('French'),
('Spanish'),
('German'),
('Mandarin'),
('Italian') ON CONFLICT (language);

-- === SECTOR_PREFERENCE ===
INSERT INTO sector_preference (sector_preference) VALUES
('Technology'),
('Healthcare'),
('Finance'),
('Education'),
('E-commerce'),
('Green Energy');

