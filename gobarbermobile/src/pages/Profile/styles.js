import styled from 'styled-components/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
export const Container = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`;

export const Form = styled.ScrollView.attrs({
    contentContainerStyle: { padding: 30 },
    showsVerticalScrollIndicator: false,
})`
    align-self: stretch;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 20px 0 30px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
    background-color: #f64c75;
    margin-top: 10px;
`;
