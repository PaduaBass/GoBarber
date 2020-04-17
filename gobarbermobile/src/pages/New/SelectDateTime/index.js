import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../../components/Background';
import DateInput from '../../../components/DateInput';
import api from '../../../services/api';

import { Container, HoursList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider'); 
  console.tron.log(provider);

  useEffect(() => {
      async function loadAvailable() {

        const response = await api.get(`/providers/${provider.id}/available`, {
          params: {
            date: date.getTime(),
          }
        });

        console.tron.log(response.data);
        setHours(response.data)
      }
      loadAvailable();
  }, [date, provider.id])

  function handleSelectTime(time) {
    navigation.navigate('Confirm', { provider, time })
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate}></DateInput>

        <HoursList 
        data={hours}
        keyExtractor={item => String(item.time)}
        renderItem={({ item }) => (
            <Hour onPress={() => handleSelectTime(item.value)} enabled={item.available}>
              <Title>{item.time}</Title>
            </Hour>
        )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário', 
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