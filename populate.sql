-- === USER ===
INSERT INTO public."user" (email, password, is_admin) VALUES
('admin@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', TRUE),        -- id 1
('student1@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),  -- id 2
('student2@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),  -- id 3
('startup1@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),  -- id 4
('startup2@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),  -- id 5
('student3@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE), -- id 6
('student4@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE), -- id 7
('startup3@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE), -- id 8
('startup4@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE), -- id 9
('student5@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('student6@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('student7@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('student8@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('student9@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('student10@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('startup5@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('startup6@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('startup7@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE),
('startup8@example.com', '$2b$12$CGLnF5aTObHk6vQNP2EQqOczUwESytwZGGtPzyZt7PlU1qlUMjP8S', FALSE);

-- === LANGUAGE_SPOKEN ===
INSERT INTO language_spoken (language) VALUES
('English'),
('French'),
('Spanish'),
('German'),
('Mandarin'),
('Italian'),

-- === SECTOR_PREFERENCE ===
INSERT INTO sector_preference (sector_preference) VALUES
('Technology'),
('Healthcare'),
('Finance'),
('Education'),
('E-commerce'),
('Green Energy'),

-- === STUDENT ===
INSERT INTO student (first_name, last_name, university, linkedin_url, starting_date, ending_date, profil_picture, birth_date, id_user) VALUES
('Alice', 'Martin', 'Sorbonne', 'https://linkedin.com/in/alice', '2025-01-01', '2025-06-30', 'alice.jpg', '2000-05-10', 2), -- id 1
('Bob', 'Durand', 'HEC Paris', 'https://linkedin.com/in/bob', '2025-02-01', '2025-08-01', 'bob.jpg', '1999-08-15', 3),     -- id 2
('Claire', 'Lemoine', 'Université de Lyon', 'https://linkedin.com/in/clairelemoine', '2025-03-01', '2025-09-01', 'claire.jpg', '2001-02-20', 6), -- id 3
('David', 'Nguyen', 'Polytechnique', 'https://linkedin.com/in/davidnguyen', '2025-01-15', '2025-07-15', 'david.jpg', '1998-11-30', 7),         -- id 4
('Emma', 'Blanc', 'Sciences Po', 'https://linkedin.com/in/emmablanc', '2025-04-01', '2025-10-01', 'emma.jpg', '2001-06-12', 10),
('Lucas', 'Petit', 'Université de Lille', 'https://linkedin.com/in/lucaspetit', '2025-03-01', '2025-09-01', 'lucas.jpg', '2000-12-01', 11),
('Sophie', 'Moreau', 'INSA Lyon', 'https://linkedin.com/in/sophiemoreau', '2025-05-01', '2025-11-01', 'sophie.jpg', '2002-04-05', 12),
('Hugo', 'Leroux', 'Télécom Paris', 'https://linkedin.com/in/hugoleroux', '2025-02-15', '2025-08-15', 'hugo.jpg', '1999-10-20', 13),
('Camille', 'Robert', 'Université Grenoble Alpes', 'https://linkedin.com/in/camillerobert', '2025-06-01', '2025-12-01', 'camille.jpg', '2001-09-14', 14),
('Jules', 'Garnier', 'Université de Bordeaux', 'https://linkedin.com/in/julesgarnier', '2025-01-10', '2025-07-10', 'jules.jpg', '1998-07-19', 15);


-- === STARTUP ===
INSERT INTO startup (company_name, siret, description, secteur, is_validated, id_user) VALUES
('TechCorp', '12345678900012', 'AI solutions for SMBs', 'Technology', TRUE, 4),  -- id 1
('HealthX', '98765432100034', 'Digital health apps', 'Healthcare', TRUE, 5),     -- id 2
('EduPlus', '24681012141618', 'Online learning platforms for kids', 'Education', TRUE, 8),     -- id 3
('EcoPower', '13579111315171', 'Renewable energy panels for homes', 'Green Energy', FALSE, 9),
('GreenHive', '11122233344455', 'Sustainable packaging solutions', 'Green Energy', TRUE, 16),
('MediConnect', '22233344455566', 'Healthcare data platforms', 'Healthcare', FALSE, 17),
('FinMate', '33344455566677', 'AI-based financial advice tools', 'Finance', TRUE, 18),
('EduSpark', '44455566677788', 'Gamified education platforms', 'Education', TRUE, 19);


-- === SALES_OFFER ===
INSERT INTO sales_offer (title, description, price, commission, target_customer, is_active, product_image, id_startup, region, remote_or_physical) VALUES
('SaaS CRM', 'CRM for small businesses', 999.99, 10.0, 'SMBs', TRUE, 'crm.jpg', 1, 'Paris', TRUE),     -- id 1
('Telemed App', 'Remote consultations app', 1499.00, 15.0, 'Clinics', TRUE, 'telemed.jpg', 2, 'Lyon', FALSE), -- id 2
('KidsLearn LMS', 'Interactive platform for remote learning', 299.00, 12.5, 'Schools', TRUE, 'kidslearn.jpg', 3, 'Marseille', TRUE),     -- id 3
('Solar Roof Kit', 'Home solar panel kits with support', 4999.00, 8.0, 'Homeowners', FALSE, 'solar.jpg', 4, 'Nice', FALSE),              -- id 4
('EcoPack Pro', 'Biodegradable packaging for e-commerce', 249.99, 6.0, 'Online retailers', TRUE, 'ecopack.jpg', 5, 'Strasbourg', TRUE),
('MediSync', 'Electronic health record syncing tool', 1999.00, 12.0, 'Clinics & hospitals', FALSE, 'medisync.jpg', 6, 'Toulouse', FALSE),
('FinBot', 'Personal finance chatbot with AI insights', 399.00, 14.5, 'Young professionals', TRUE, 'finbot.jpg', 7, 'Paris', TRUE),
('LearnQuest', 'Gamified online learning for teens', 299.00, 10.0, 'High schools', TRUE, 'learnquest.jpg', 8, 'Lyon', TRUE),
('GreenBox', 'Home composting unit with sensor alerts', 159.00, 7.0, 'Eco-conscious households', TRUE, 'greenbox.jpg', 5, 'Nice', FALSE),
('DataBridge Health', 'Data interoperability platform', 2499.00, 15.0, 'Hospitals', TRUE, 'databridge.jpg', 6, 'Bordeaux', FALSE);



-- === SALES_DOCUMENTS ===
INSERT INTO sales_documents (name, type, file_path, id_sales_offer) VALUES
('CRM Brochure', 'PDF', '/docs/crm.pdf', 1),
('Telemed Pitch', 'PPT', '/docs/telemed.pptx', 2),
('KidsLearn One Pager', 'PDF', '/docs/kidslearn.pdf', 3),
('Solar Kit Specs', 'DOCX', '/docs/solarkit.docx', 4),
('EcoPack Datasheet', 'PDF', '/docs/ecopack.pdf', 5),
('MediSync Whitepaper', 'PDF', '/docs/medisync.pdf', 6),
('FinBot Overview', 'PPT', '/docs/finbot.pptx', 7),
('LearnQuest Brochure', 'PDF', '/docs/learnquest.pdf', 8),
('GreenBox Manual', 'PDF', '/docs/greenbox.pdf', 9),
('DataBridge Health Tech Sheet', 'DOCX', '/docs/databridge.docx', 10);
