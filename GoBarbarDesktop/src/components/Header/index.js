import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Content, Profile } from './styles';
import Notifications from '../Notifications';

import logo from '../../assets/logo2.svg';

export default function Header() {
    const profile = useSelector(state => state.user.profile);

  return (
    <Container>
        <Content>
            <nav>
                <img src={logo} alt="Gobarber" />
                <Link to="/dashboard" >DASHBOARD</Link>
            </nav>

            <aside>
                <Notifications />
                <Profile>
                    <div>
                        <strong>{profile.name}</strong>
                        <Link to="profile">Meu perfil</Link>
                    </div>
                    <img src={profile.avatar ? profile.avatar.url :  `https://api.adorable.io/avatars/50/${profile.name}.png`} alt="Avatar" />

                </Profile>
            </aside>
        </Content>
    </Container>
  );
}
