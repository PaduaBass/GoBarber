import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';


// import { Container } from './styles';

import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),

  password: Yup.string().required('A senha é obrigatória')
});


export default function SignIn() {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  console.tron.log(loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <div>
      <img src={logo} alt="goBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu email" />
        <Input name="password" type="password" placeholder="Sua senha secreta" />

        <button type="submit">{ loading ? 'Carregando...' : 'Acessar' }</button>

        <Link to="/register">
          Criar conta gratuita
        </Link>

      </Form>
    </div>
    );
}
