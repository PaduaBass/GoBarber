import React from 'react';

import { useSelector } from 'react-redux';
import { Container } from './styles';
import { Form, Input } from '@rocketseat/unform'; 
import history from '../../services/history';
import { useDispatch } from 'react-redux';
import AvatarInput from './AvatarInput';

import { signOut } from '../../store/modules/auth/actions';

import { updateProfileRequest } from '../../store/modules/user/actions';


export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
 }

 async function logout() {
  dispatch(signOut());
 }

  return (
     <Container>
       <Form initialData={profile} onSubmit={handleSubmit}>

         <AvatarInput name="avatar_id" />
         <Input name="name" placeholder="Nome completo" />
         <Input name="email" type="email" placeholder="Seu endereço de e-mail" />
         <hr />
         
         <Input type="password" name="oldPassword" placeholder="Sua senha atual" />
         <Input type="password" name="password" placeholder="Nova senha" />
         <Input type="password" name="confirmassword" placeholder="Confirme sua senha" />

         <button type="buttom" >Atualizar perfil</button>


       </Form>

       <button type="button" onClick={logout}>Sair do GoBarber</button>
     </Container>
    );
}
