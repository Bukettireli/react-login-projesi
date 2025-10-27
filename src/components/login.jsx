import React, { useState, useEffect } from 'react';


const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const initialState = {
  email: '',
  password: '',
  isTermsAccepted: false,
};

const initialErrors = {
  email: null,
  password: null,
  isTermsAccepted: null,
};

export default function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    
    const hasErrors = Object.values(errors).some(error => error !== null);
    const isFormFilled = form.email && form.password;

    setIsButtonDisabled(hasErrors || !isFormFilled || !form.isTermsAccepted);
  }, [form, errors]);

  const validateField = (name, value) => {
    let error = null;

    if (name === 'email') {
      if (!EMAIL_REGEX.test(value)) {
        error = 'Geçerli bir e-posta adresi girin.';
      }
    } else if (name === 'password') {
      if (!PASSWORD_REGEX.test(value)) {
        error = 'Şifre en az 8 karakter, bir büyük, bir küçük harf, bir rakam ve bir özel karakter içermelidir.';
      }
    } else if (name === 'isTermsAccepted') {
      if (value === false) {
        error = 'Şartları kabul etmelisiniz.';
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setForm(prev => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      
      setIsLoggedIn(true);
      
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>E-posta:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={() => validateField('email', form.email)}
            data-cy="email-input" 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: errors.email ? '1px solid red' : '1px solid #ccc' }}
          />
          {errors.email && <p data-cy="email-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Şifre:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={() => validateField('password', form.password)}
            data-cy="password-input" 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: errors.password ? '1px solid red' : '1px solid #ccc' }}
          />
          {errors.password && <p data-cy="password-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.password}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="checkbox"
            id="isTermsAccepted"
            name="isTermsAccepted"
            checked={form.isTermsAccepted}
            onChange={handleChange}
            data-cy="terms-checkbox" 
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="isTermsAccepted">Şartları kabul ediyorum.</label>
          {errors.isTermsAccepted && <p data-cy="terms-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.isTermsAccepted}</p>}
        </div>

        <button
          type="submit"
          data-cy="submit-button" 
          disabled={isButtonDisabled}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isButtonDisabled ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer'
          }}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}