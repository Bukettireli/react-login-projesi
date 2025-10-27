import React from 'react';

export default function SuccessPage({ setIsLoggedIn }) {
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div 
      style={{
        maxWidth: '400px', 
        margin: '50px auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px',
        textAlign: 'center'
      }}
    >
      <h2>Giriş Başarılı!</h2>
      <p style={{ marginTop: '15px' }}>Hesabınıza başarıyla giriş yaptınız. Artık uygulamanın ana içeriğine erişebilirsiniz.</p>
      <button 
        style={{
          marginTop: '15px', 
          padding: '10px 20px', 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}
        onClick={handleLogout}
      >
        Çıkış Yap
      </button>
    </div>
  );
}