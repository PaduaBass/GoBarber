import React, { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import Background from '../../../components/Background';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import api from '../../../services/api';

export default function Confirm({ navigation }) {
  const [loading, setLoading] = useState(false);
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const dateFormatted = useMemo(() => formatRelative(parseISO(time), new Date(), { locale: pt }), [time])

  async function handleAddAppointment() {
    try{
      setLoading(true);
      await api.post('/appointments', {
        provider_id: provider.id,
        date: time,
      });

      
  
      navigation.navigate('Dashboard');
      setLoading(false);
    }catch (err) {
      Alert.alert('Falha ao confirmar agendamento', 'Houve um erro ao confirmar seu agendamento, tente novametne em outro horario!');
    } 
 
  }

  return (
    <Background>
      <Container>
        <Avatar source={{ uri: provider.avatar ? `http://192.168.1.7:3333/files/${provider.avatar.path}` : `https://api.adorable.io/avatars/50/${provider.name}.png` }} />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton loading={loading} onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
    );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar o agendamento', 
  headerTransparent: true,
  headerTintColor: '#FFF',
  headerLeftContainerStyle: {
     marginLeft: 20,
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => {navigation.goBack()}}>
      <Icon name="chevron-left" size={20} color="#fff" /> 
    </TouchableOpacity>
  ),
});