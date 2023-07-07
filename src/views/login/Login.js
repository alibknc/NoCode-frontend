import React, { useState } from 'react';
import '../../css/Login.css'
import authService from '../../service/authService'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await authService.login(email, password);

            if (response) {
                window.location.href = '/projects';
            } else {
                setErrorMessage('Kullanıcı adı veya şifre hatalı!');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Giriş Yap</h3>
                    <div className="form-group mt-3">
                        <label>E-posta adresi</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="E-posta adresinizi girin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Şifre</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="**********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Giriş
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        {errorMessage && <p>{errorMessage}</p>}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;