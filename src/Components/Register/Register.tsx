import React, { useState } from 'react'
import './Register.css'
// @ts-ignore
import WhatsApp from '../../assets/whatsapp.svg'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie';

const Register = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState('');
  const [passWordLength, setPassWordLength] = useState(0);
  const [passWordLengthConfirm, setPassWordLengthConfirm] = useState(0);
  const [passWordBorder, setPassWordBorder] = useState('1px solid #128C7E');
  const [passWordBorderConfirm, setPassWordBorderConfirm] = useState('1px solid #128C7E');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne sont pas égaux')
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      axios.post('http://localhost:3001/register', { pseudo, email, hashedPassword })
        .then(res => {
          if (res.data.created) {
            Cookies.set('user', res.data.token, { expires: 1 });
            setLogged(true);
            window.location.href = '/';
          } else {
            setError('Identifiant déjà utilisé ou mots de passe non égaux')
          }
        })
    }
  }

  const handlePassword = (e: string) => {
    setPassword(e);
    setPassWordLength(e.length);
    if (e.length < 5) {
      setPassWordBorder('1px solid red');
    } else {
      setPassWordBorder('1px solid #128C7E');
    }
  }

  const handleConfirmPassword = (e: string) => {
    setConfirmPassword(e);
    setPassWordLengthConfirm(e.length);
    if ((e.length < 5) || (e !== password)) {
      setPassWordBorderConfirm('1px solid red');
    } else {
      setPassWordBorderConfirm('1px solid #128C7E');
    }
  }


  return (
    <div className='signUpPage'>
      <div className="signUp">
        <form className='formClass'>
          <h1 className='title'> <img src={WhatsApp} width={40} className='logo' />  Inscription</h1>
          <input onChange={(e) => setPseudo(e.target.value)} placeholder='Entrez un pseudo' className='input-register' type="text" maxLength={50} />
          <input onChange={(e) => setEmail(e.target.value)} placeholder='Entrez une adresse mail' className='input-register' type="text" maxLength={20} />
          <input style={{ border: passWordBorder }} onChange={(e) => handlePassword(e.target.value)} placeholder='Entrez un mot de passe' className='input-register' type="password" minLength={5} />
          <input style={{border:passWordBorderConfirm}} onChange={(e) => handleConfirmPassword(e.target.value)} placeholder='Confirmez votre mot de passe' className='input-register' type="password" minLength={5} />
          <button onClick={(e) => handleSubmit(e)} className='button-register'>S'inscire sur WhastApp</button>
        </form>
        <div className='error'>{error}</div>
      </div>
    </div>
  )
}

export default Register