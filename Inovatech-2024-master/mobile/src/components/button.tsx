import { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton , Text,ActivityIndicator } from "react-native-paper"

type Props = ComponentProps<typeof PaperButton> & {
    children: string
    isLoading?: boolean
}

export function Button({children, isLoading = false,icon, ...rest}: Props){
    return (
        <PaperButton style={styles.button} disabled={isLoading} {...rest} icon={isLoading ? undefined: icon} >
           {
            isLoading ?  (
                <ActivityIndicator animating={true} color='white'/>
            ) : (
                <Text style={styles.text}>{children}</Text>
            )
           }
        </PaperButton>
    )
}



const styles = StyleSheet.create({
    button:{ 
        height: 48,
        justifyContent: 'center',
        backgroundColor:"#2563eb",
        borderRadius: 8
        
    },
    text:{
        color: "white",
        fontWeight: "bold",
    }
})
