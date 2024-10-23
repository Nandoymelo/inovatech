
import { View } from 'react-native';
import { StyleSheet,ScrollView, } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { Button } from '../src/components/button';
import { useRouter } from 'expo-router';


import LogoSvg from '../assets/logo.svg'
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

type FormDataProps = {
  email: string
  password: string
}

const signProfileSchema = yup.object({
  email: yup.string().required("Informe o email").email("Email inválido"),
  password: yup.string().required("Informe a senha"),

})

export default function signUp() {
  
  const {control,handleSubmit, formState: {errors} } = useForm<FormDataProps>({
    resolver: yupResolver(signProfileSchema)
  });

  const router = useRouter();

  function handleSignUp({email,password}:FormDataProps){
    console.log(email,password)
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <View style={styles.container}>
        
    
      <View style={styles.formContainer}>

        <View style={styles.logo}>
            <LogoSvg />
            <Text variant='headlineLarge' style={{ fontFamily: 'Inter_900Black', fontSize: 40 }}>Acesse a conta</Text>
        </View>

        
        <View style={styles.input}>
          <Text style={styles.inputLabel}>E-mail</Text>

          <Controller
           control={control} 
           name='email' 
           
           render={({ field: {onChange, value}})  => (
              <TextInput
                placeholder='Digite seu email...'  
                mode="outlined" 
                
                right={<TextInput.Icon icon='email' />} 
                theme={{colors: {background: "ffffff"} }}
                onChangeText={onChange}
                value={value}
              />
          )}/>
          {
            errors.email?.message && <Text style={{color: 'red'}}>{ errors.email.message }</Text>
          }

          
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Senha</Text>

          <Controller 
          control={control} 
          name='password' 
        
          render={({ field: {onChange, value}}) => (
            <TextInput
              placeholder='Digite sua senha...'  
              mode="outlined" 
              secureTextEntry right={<TextInput.Icon icon="eye" />}
              theme={{colors: {background: "ffffff"} }}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType='send'
            />
          )}/>
          {
            errors.password?.message && <Text style={{color: 'red'}}>{ errors.password.message }</Text>
          }
          

        </View>
        
        <View style={styles.createButton}>
          <Text variant='titleMedium' style={styles.text} >Esqueci a senha!</Text>
          <Button children='Acessar' mode='contained' icon="login" onPress={handleSubmit(handleSignUp)}/>
        </View>
        
      </View>

    
      <View style={styles.createButton}>
          <Text variant='titleMedium' style={styles.text}>Não possiu conta?</Text>
          <Button children="Criar Conta" mode='contained' onPress={() => router.push('/signIn')}/>
      </View>
    </View>
  </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between', 
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center', 
    gap: 16, 
  },
  input: {
    gap: 4
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold', 
  },
  title: {
    fontSize: 24,           
    fontWeight: 'bold',      
    textAlign: 'center',   
  },
  text: {
    fontSize:14,
    textAlign: 'right',
    alignSelf: 'flex-end',
    color: '#2563eb'
  },
  createButton: {
    justifyContent: 'flex-end', 
    gap: 8, 
  },
  logo: {
    alignSelf: 'center',
  
}
});
