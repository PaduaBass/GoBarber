import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
// import { Container } from './styles';

import logo from '../../assets/logo.svg';
import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),

  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),

  password: Yup.string().min(6, 'No mínimo 6 caracteres').required('A senha é obrigatória'),


});


export default function SignUp() {

  const dispatch = useDispatch();
  
  async function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password))
  }
  return (
    <div>
      <img src={logo} alt="goBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />
        <Input name="password" type="password" placeholder="Sua senha secreta" />

        <button type="submit">Criar conta</button>

        <Link to="/">
          Já tenho login
        </Link>

      </Form>
    </div>
    );
}
