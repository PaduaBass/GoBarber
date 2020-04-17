import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; 
import { signInRequest } from '../../store/modules/auth/actions';

import Background from '../../components/Background';

import logo from '../../assets/logo.png';

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const passwordRef = useRef();

  const dispatch = useDispatch();

  async function handleSubmit() {
    dispatch(signInRequest(email, password))
  }
  
  return (
      <>
      <Background>
          <Container>
            <Image source={logo}  />

            <Form>
              <FormInput 
                icon="mail-outline"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
              />

              <FormInput 
                icon="lock-outline"
                secureTextEntry
                autoCapitalize="none"
                placeholder="Sua senha secreta"
                ref={passwordRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                value={password}
                onChangeText={setPassword}
              />

              <SubmitButton loading={loading} onPress={handleSubmit} >Acessar</SubmitButton>

              <SignLink onPress={() => navigation.navigate('SignUp')}>
                <SignLinkText>Criar conta gratuita</SignLinkText>
              </SignLink>
            </Form>
          </Container>
      </Background>

      </>
  );
}
