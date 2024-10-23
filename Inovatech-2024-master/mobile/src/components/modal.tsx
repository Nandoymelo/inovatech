import { TextInput, Text, Portal, Dialog,Button, Divider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';


type ModalProps = {
    visible: boolean,
    onDismiss: () => void,
    onConfirm: () => void,
    message: string,
    
}

export function Modal({message,onConfirm,onDismiss,visible}: ModalProps ){
    return (
        <Portal>
        <Dialog visible={visible} onDismiss={onDismiss} dismissable={false} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle} >Confirmação de ação! </Dialog.Title>
          
          <Dialog.Content>
            <Text style={styles.messageText} >{message}</Text>
            
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button onPress={onDismiss} style={styles.cancelButton} labelStyle={styles.buttonText}>Cancelar</Button>
            <Button onPress={onConfirm} style={styles.confirmButton} labelStyle={styles.buttonText}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
}

const styles = StyleSheet.create({
    dialog: {
        backgroundColor: '#fafafa'
      },
    
    dialogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ef4444', 
        borderBottomWidth: 1,   
        borderBottomColor: '#ccc',          
    
    },
    messageText: {
        fontSize: 14,
        color: '#333333',          
        
    },
    
    dialogActions: {
        gap: 5  
        
    },
    cancelButton: {
        backgroundColor: '#a1a1aa',   
        borderRadius: 5,          
      },
    confirmButton: {
        backgroundColor: '#4A90E2', 
        borderRadius: 5,            
    },
    buttonText: {
        color: '#ffffff',          
    },
})

