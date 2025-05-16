------------------------------------------------------------
--        Script Postgre 
------------------------------------------------------------



------------------------------------------------------------
-- Table: user
------------------------------------------------------------
CREATE TABLE public.user(
	id         SERIAL NOT NULL ,
	email      VARCHAR (70) NOT NULL ,
	password   VARCHAR (255) NOT NULL ,
	is_admin   BOOL  NOT NULL  ,
	CONSTRAINT user_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: startup
------------------------------------------------------------
CREATE TABLE public.startup(
	id             SERIAL NOT NULL ,
	company_name   VARCHAR (255) NOT NULL ,
	siret          VARCHAR (255) NOT NULL ,
	description    VARCHAR (2000)  NOT NULL ,
	secteur        VARCHAR (255) NOT NULL ,
	is_validated   BOOL  NOT NULL ,
	id_user        INT  NOT NULL  ,
	CONSTRAINT startup_PK PRIMARY KEY (id)

	,CONSTRAINT startup_user_FK FOREIGN KEY (id_user) REFERENCES public.user(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: student
------------------------------------------------------------
CREATE TABLE public.student(
	id               SERIAL NOT NULL ,
	first_name       VARCHAR (255) NOT NULL ,
	last_name        VARCHAR (255) NOT NULL ,
	university       VARCHAR (255) NOT NULL ,
	linkedin_url     VARCHAR (255) NOT NULL ,
	starting_date    DATE  NOT NULL ,
	ending_date      DATE  NOT NULL ,
	profil_picture   VARCHAR (255) NOT NULL ,
	birth_date       DATE  NOT NULL ,
	id_user          INT  NOT NULL  ,
	CONSTRAINT student_PK PRIMARY KEY (id)

	,CONSTRAINT student_user_FK FOREIGN KEY (id_user) REFERENCES public.user(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: language_spoken
------------------------------------------------------------
CREATE TABLE public.language_spoken(
	language   VARCHAR (255) NOT NULL  ,
	CONSTRAINT language_spoken_PK PRIMARY KEY (language)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: sector_preference
------------------------------------------------------------
CREATE TABLE public.sector_preference(
	sector_preference   VARCHAR (255) NOT NULL  ,
	CONSTRAINT sector_preference_PK PRIMARY KEY (sector_preference)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: sales_offer
------------------------------------------------------------
CREATE TABLE public.sales_offer(
	id                SERIAL NOT NULL ,
	title             VARCHAR (255) NOT NULL ,
	description       VARCHAR (2000)  NOT NULL ,
	price             DECIMAL (5,2)  NOT NULL ,
	commission        FLOAT  NOT NULL ,
	target_customer   VARCHAR (255) NOT NULL ,
	is_active         BOOL  NOT NULL ,
	product_image     VARCHAR (255) NOT NULL ,
	id_startup        INT  NOT NULL  ,
	CONSTRAINT sales_offer_PK PRIMARY KEY (id)

	,CONSTRAINT sales_offer_startup_FK FOREIGN KEY (id_startup) REFERENCES public.startup(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: sales_documents
------------------------------------------------------------
CREATE TABLE public.sales_documents(
	id               SERIAL NOT NULL ,
	name             VARCHAR (255) NOT NULL ,
	type             VARCHAR (255) NOT NULL ,
	file_path        VARCHAR (255) NOT NULL ,
	id_sales_offer   INT  NOT NULL  ,
	CONSTRAINT sales_documents_PK PRIMARY KEY (id)

	,CONSTRAINT sales_documents_sales_offer_FK FOREIGN KEY (id_sales_offer) REFERENCES public.sales_offer(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: match
------------------------------------------------------------
CREATE TABLE public.match(
	id           SERIAL NOT NULL ,
	date_match   DATE  NOT NULL ,
	id_student   INT  NOT NULL ,
	id_startup   INT  NOT NULL  ,
	CONSTRAINT match_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: message
------------------------------------------------------------
CREATE TABLE public.message(
	id               SERIAL NOT NULL ,
	message_text     VARCHAR (2000)  NOT NULL ,
	is_read          BOOL  NOT NULL ,
	date_envoie      DATE  NOT NULL ,
	id_user          INT  NOT NULL ,
	id_user_recoit   INT  NOT NULL ,
	id_match         INT  NOT NULL  ,
	CONSTRAINT message_PK PRIMARY KEY (id)

	,CONSTRAINT message_user_FK FOREIGN KEY (id_user) REFERENCES public.user(id)
	,CONSTRAINT message_user0_FK FOREIGN KEY (id_user_recoit) REFERENCES public.user(id)
	,CONSTRAINT message_match1_FK FOREIGN KEY (id_match) REFERENCES public.match(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: commission
------------------------------------------------------------
CREATE TABLE public.commission(
	id                   SERIAL NOT NULL ,
	commision_amount     DECIMAL (7,2)  NOT NULL ,
	platform_fee_amout   DECIMAL (7,2)  NOT NULL ,
	sale_date            DATE  NOT NULL ,
	payment_status       BOOL  NOT NULL  ,
	CONSTRAINT commission_PK PRIMARY KEY (id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: parle
------------------------------------------------------------
CREATE TABLE public.parle(
	id         INT  NOT NULL ,
	language   VARCHAR (255) NOT NULL  ,
	CONSTRAINT parle_PK PRIMARY KEY (id,language)

	,CONSTRAINT parle_student_FK FOREIGN KEY (id) REFERENCES public.student(id)
	,CONSTRAINT parle_language_spoken0_FK FOREIGN KEY (language) REFERENCES public.language_spoken(language)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: veut
------------------------------------------------------------
CREATE TABLE public.veut(
	sector_preference   VARCHAR (255) NOT NULL ,
	id                  INT  NOT NULL  ,
	CONSTRAINT veut_PK PRIMARY KEY (sector_preference,id)

	,CONSTRAINT veut_sector_preference_FK FOREIGN KEY (sector_preference) REFERENCES public.sector_preference(sector_preference)
	,CONSTRAINT veut_student0_FK FOREIGN KEY (id) REFERENCES public.student(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: aime_student_offer
------------------------------------------------------------
CREATE TABLE public.aime_student_offer(
	id                 INT  NOT NULL ,
	id_student         INT  NOT NULL ,
	motivation_text    VARCHAR (2000)  NOT NULL ,
	application_date   DATE  NOT NULL  ,
	CONSTRAINT aime_student_offer_PK PRIMARY KEY (id,id_student)

	,CONSTRAINT aime_student_offer_sales_offer_FK FOREIGN KEY (id) REFERENCES public.sales_offer(id)
	,CONSTRAINT aime_student_offer_student0_FK FOREIGN KEY (id_student) REFERENCES public.student(id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: aime_startup_student
------------------------------------------------------------
CREATE TABLE public.aime_startup_student(
	id           INT  NOT NULL ,
	id_startup   INT  NOT NULL ,
	like_date    DATE  NOT NULL  ,
	CONSTRAINT aime_startup_student_PK PRIMARY KEY (id,id_startup)

	,CONSTRAINT aime_startup_student_student_FK FOREIGN KEY (id) REFERENCES public.student(id)
	,CONSTRAINT aime_startup_student_startup0_FK FOREIGN KEY (id_startup) REFERENCES public.startup(id)
)WITHOUT OIDS;



