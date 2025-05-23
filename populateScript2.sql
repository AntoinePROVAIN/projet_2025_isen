-- === SALES_OFFER ===
INSERT INTO sales_offer (title, description, price, commission, target_customer, is_active, product_image, id_startup, region, remote_or_physical) VALUES
('SaaS CRM', 'CRM for small businesses', 999.99, 10.0, 'SMBs', TRUE, 'crm.jpg', 1, 'Paris', TRUE),     -- id 1
('Telemed App', 'Remote consultations app', 1499.00, 15.0, 'Clinics', TRUE, 'telemed.jpg', 2, 'Lyon', FALSE), -- id 2
('KidsLearn LMS', 'Interactive platform for remote learning', 299.00, 12.5, 'Schools', TRUE, 'kidslearn.jpg', 3, 'Marseille', TRUE),     -- id 3
('Solar Roof Kit', 'Home solar panel kits with support', 4999.00, 8.0, 'Homeowners', FALSE, 'solar.jpg', 4, 'Nice', FALSE),              -- id 4
('EcoPack Pro', 'Biodegradable packaging for e-commerce', 249.99, 6.0, 'Online retailers', TRUE, 'ecopack.jpg', 5, 'Strasbourg', TRUE),
('MediSync', 'Electronic health record syncing tool', 1999.00, 12.0, 'Clinics & hospitals', FALSE, 'medisync.jpg', 6, 'Toulouse', FALSE),
('FinBot', 'Personal finance chatbot with AI insights', 399.00, 14.5, 'Young professionals', TRUE, 'finbot.jpg', 7, 'Paris', TRUE);



-- === SALES_DOCUMENTS ===
INSERT INTO sales_documents (name, type, file_path, id_sales_offer) VALUES
('CRM Brochure', 'PDF', '/docs/crm.pdf', 1),
('Telemed Pitch', 'PPT', '/docs/telemed.pptx', 2),
('KidsLearn One Pager', 'PDF', '/docs/kidslearn.pdf', 3),
('Solar Kit Specs', 'DOCX', '/docs/solarkit.docx', 4),
('EcoPack Datasheet', 'PDF', '/docs/ecopack.pdf', 5),
('MediSync Whitepaper', 'PDF', '/docs/medisync.pdf', 6),
('FinBot Overview', 'PPT', '/docs/finbot.pptx', 7);
