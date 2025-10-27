
const VALID_EMAIL = 'test@example.com';

const VALID_PASSWORD = 'Password123!'; 

describe('Login Formu Testleri', () => {
  beforeEach(() => {
    
    cy.visit('http://localhost:5173'); 
  });

 
  it('Başarılı giriş: Formu doldurup gönderdiğimde Success sayfasına yönlendiriyorum', () => {
    
    cy.get('[data-cy="email-input"]').type(VALID_EMAIL);
    cy.get('[data-cy="password-input"]').type(VALID_PASSWORD);

   
    cy.get('[data-cy="terms-checkbox"]').check();

  
    cy.get('[data-cy="submit-button"]').should('be.enabled').click();

    
    cy.contains('h2', 'Giriş Başarılı!').should('be.visible');
  });

  
  it('Hatalı Durum 1: Sadece email yanlış girildiğinde hata mesajı görünmeli ve buton disabled kalmalı', () => {
    
    cy.get('[data-cy="email-input"]').type('invalid-email'); 
    cy.get('[data-cy="password-input"]').type(VALID_PASSWORD); 
    cy.get('[data-cy="terms-checkbox"]').check(); 
    
    
    cy.get('body').click(0, 0); 

    
    cy.get('p[style*="color: red"]').should('have.length', 1);

    
    cy.get('[data-cy="email-error"]').should('contain', 'Geçerli bir e-posta adresi girin.');

    
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('Hatalı Durum 2: Email ve password yanlış girildiğinde 2 hata mesajı görünmeli', () => {
    
    cy.get('[data-cy="email-input"]').type('a@b'); 
    cy.get('[data-cy="password-input"]').type('short'); 
    cy.get('[data-cy="terms-checkbox"]').check(); 

   
    cy.get('body').click(0, 0);

    
    cy.get('p[style*="color: red"]').should('have.length', 2);

    
    cy.get('[data-cy="password-error"]').should('contain', 'Şifre en az 8 karakter, bir büyük, bir küçük harf, bir rakam ve bir özel karakter içermelidir.');

   
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('Hatalı Durum 3: Email ve password doğru ama kuralları kabul etmediğimde buton disabled kalmalı', () => {
    
    cy.get('[data-cy="email-input"]').type(VALID_EMAIL);
    cy.get('[data-cy="password-input"]').type(VALID_PASSWORD);
    
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });
});