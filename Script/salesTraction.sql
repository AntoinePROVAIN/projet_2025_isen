#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id       Int  Auto_increment  NOT NULL ,
        password Varchar (255) NOT NULL ,
        is_admin Bool NOT NULL ,
        email    Varchar (70) NOT NULL
	,CONSTRAINT user_AK UNIQUE (email)
	,CONSTRAINT user_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: startup
#------------------------------------------------------------

CREATE TABLE startup(
        id           Int  Auto_increment  NOT NULL ,
        company_name Varchar (255) NOT NULL ,
        siret        Varchar (255) NOT NULL ,
        description  Text NOT NULL ,
        secteur      Varchar (255) NOT NULL ,
        is_validated Bool NOT NULL ,
        id_user      Int NOT NULL
	,CONSTRAINT startup_PK PRIMARY KEY (id)

	,CONSTRAINT startup_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: student
#------------------------------------------------------------

CREATE TABLE student(
        id             Int  Auto_increment  NOT NULL ,
        first_name     Varchar (255) NOT NULL ,
        last_name      Varchar (255) NOT NULL ,
        university     Varchar (255) NOT NULL ,
        linkedin_url   Varchar (255) NOT NULL ,
        starting_date  Date NOT NULL ,
        ending_date    Date NOT NULL ,
        profil_picture Varchar (255) NOT NULL ,
        birth_date     Date NOT NULL ,
        id_user        Int NOT NULL
	,CONSTRAINT student_PK PRIMARY KEY (id)

	,CONSTRAINT student_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: language_spoken
#------------------------------------------------------------

CREATE TABLE language_spoken(
        language Varchar (255) NOT NULL
	,CONSTRAINT language_spoken_PK PRIMARY KEY (language)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sector_preference
#------------------------------------------------------------

CREATE TABLE sector_preference(
        sector_preference Varchar (255) NOT NULL
	,CONSTRAINT sector_preference_PK PRIMARY KEY (sector_preference)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sales_offer
#------------------------------------------------------------

CREATE TABLE sales_offer(
        id                 Int  Auto_increment  NOT NULL ,
        title              Varchar (255) NOT NULL ,
        description        Text NOT NULL ,
        price              Decimal (7,2) NOT NULL ,
        commission         Float NOT NULL ,
        target_customer    Varchar (255) NOT NULL ,
        is_active          Bool NOT NULL ,
        product_image      Varchar (255) NOT NULL ,
        region             Varchar (255) NOT NULL ,
        remote_or_physical Bool NOT NULL ,
        id_startup         Int NOT NULL
	,CONSTRAINT sales_offer_PK PRIMARY KEY (id)

	,CONSTRAINT sales_offer_startup_FK FOREIGN KEY (id_startup) REFERENCES startup(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sales_documents
#------------------------------------------------------------

CREATE TABLE sales_documents(
        id             Int  Auto_increment  NOT NULL ,
        name           Varchar (255) NOT NULL ,
        type           Varchar (255) NOT NULL ,
        file_path      Varchar (255) NOT NULL ,
        id_sales_offer Int NOT NULL
	,CONSTRAINT sales_documents_PK PRIMARY KEY (id)

	,CONSTRAINT sales_documents_sales_offer_FK FOREIGN KEY (id_sales_offer) REFERENCES sales_offer(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: match
#------------------------------------------------------------

CREATE TABLE match(
        id         Int  Auto_increment  NOT NULL ,
        date_match Datetime NOT NULL ,
        id_student Int NOT NULL ,
        id_startup Int NOT NULL
	,CONSTRAINT match_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: message
#------------------------------------------------------------

CREATE TABLE message(
        id             Int  Auto_increment  NOT NULL ,
        message_text   Text NOT NULL ,
        is_read        Bool NOT NULL ,
        date_envoie    Datetime NOT NULL ,
        id_user        Int NOT NULL ,
        id_user_recoit Int NOT NULL ,
        id_match       Int NOT NULL
	,CONSTRAINT message_PK PRIMARY KEY (id)

	,CONSTRAINT message_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
	,CONSTRAINT message_user0_FK FOREIGN KEY (id_user_recoit) REFERENCES user(id)
	,CONSTRAINT message_match1_FK FOREIGN KEY (id_match) REFERENCES match(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: commission
#------------------------------------------------------------

CREATE TABLE commission(
        id                 Int  Auto_increment  NOT NULL ,
        commision_amount   Decimal (7,2) NOT NULL ,
        platform_fee_amout Decimal (7,2) NOT NULL ,
        sale_date          Datetime NOT NULL ,
        payment_status     Bool NOT NULL
	,CONSTRAINT commission_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: parle
#------------------------------------------------------------

CREATE TABLE parle(
        id       Int NOT NULL ,
        language Varchar (255) NOT NULL
	,CONSTRAINT parle_PK PRIMARY KEY (id,language)

	,CONSTRAINT parle_student_FK FOREIGN KEY (id) REFERENCES student(id)
	,CONSTRAINT parle_language_spoken0_FK FOREIGN KEY (language) REFERENCES language_spoken(language)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: veut
#------------------------------------------------------------

CREATE TABLE veut(
        sector_preference Varchar (255) NOT NULL ,
        id                Int NOT NULL
	,CONSTRAINT veut_PK PRIMARY KEY (sector_preference,id)

	,CONSTRAINT veut_sector_preference_FK FOREIGN KEY (sector_preference) REFERENCES sector_preference(sector_preference)
	,CONSTRAINT veut_student0_FK FOREIGN KEY (id) REFERENCES student(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: aime_student_offer
#------------------------------------------------------------

CREATE TABLE aime_student_offer(
        id               Int NOT NULL ,
        id_student       Int NOT NULL ,
        motivation_text  Text NOT NULL ,
        application_date Date NOT NULL
	,CONSTRAINT aime_student_offer_PK PRIMARY KEY (id,id_student)

	,CONSTRAINT aime_student_offer_sales_offer_FK FOREIGN KEY (id) REFERENCES sales_offer(id)
	,CONSTRAINT aime_student_offer_student0_FK FOREIGN KEY (id_student) REFERENCES student(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: aime_startup_student
#------------------------------------------------------------

CREATE TABLE aime_startup_student(
        id         Int NOT NULL ,
        id_startup Int NOT NULL ,
        like_date  Date NOT NULL
	,CONSTRAINT aime_startup_student_PK PRIMARY KEY (id,id_startup)

	,CONSTRAINT aime_startup_student_student_FK FOREIGN KEY (id) REFERENCES student(id)
	,CONSTRAINT aime_startup_student_startup0_FK FOREIGN KEY (id_startup) REFERENCES startup(id)
)ENGINE=InnoDB;

