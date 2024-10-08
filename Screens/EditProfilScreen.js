import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    updateEmail,
    updatePassword,
    updateProfile
} from "firebase/auth";
import {auth, storage} from '../firebase'
import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import Toast from "react-native-toast-message";


const ProfileScreen = ({navigation}) => {

    const [email, setEmail] = useState(auth.currentUser.email);
    const [displayName, setDisplayName] = useState(auth.currentUser.displayName);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const uploadPickerPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        const response = await fetch(result.uri);
        const blob = await response.blob();
        const fileRef = ref(storage, "photoprofil/" + auth.currentUser.uid);

         await uploadBytes(fileRef, blob).then(async () => {
            const downloadURl = await getDownloadURL(fileRef)

            updateProfile(auth.currentUser, {
                photoURL: downloadURl
            }).then(() => {

                Toast.show({
                    type: 'success',
                    text1: 'Génial !',
                    text2: 'Votre photo de profil a bien été modifiée'
                });

                navigation.navigate("Profile")
            }).catch((error) => {
            });
        });

    }



    const changeProfil = async () => {

        if(displayName !== auth.currentUser.displayName){
            updateProfile(auth.currentUser, {
                displayName: displayName
            }).then(() => {

                Toast.show({
                    type: 'success',
                    text1: 'Génial !',
                    text2: 'Votre nom a bien été modifié'
                });

                navigation.navigate("Profile")
            }).catch((error) => {
            });
        }

        if(email !== auth.currentUser.email){
            updateEmail(auth.currentUser, email).then(() => {

                Toast.show({
                    type: 'success',
                    text1: 'Génial !',
                    text2: 'Votre e-mail a bien été modifié'
                });

                navigation.navigate("Profile")
            }).catch((error) => {

                if(error.code === "invalid-email"){
                    Toast.show({
                        type: 'error',
                        text1: 'E-mail',
                        text2: "L'email saisi n'est pas valide"
                    });
                } else if(error.code === 'auth/email-already-in-use'){
                    Toast.show({
                        type: 'error',
                        text1: 'E-mail',
                        text2: "Il y a déjà un compte associé à cet e-mail"
                    });
                }
            });
        }

        if(password === confirmPassword && password !== ""){
            updatePassword(auth.currentUser, password).then(() => {

                Toast.show({
                    type: 'success',
                    text1: 'Génial !',
                    text2: 'Votre mot de passe a bien été modifié'
                });

                navigation.navigate("Profile")
            }).catch((error) => {
                if(error.code === "auth/weak-password"){
                    Toast.show({
                        type: 'error',
                        text1: "Mot de passe pas assez fort",
                        text2: "6 caractères minimum pour le mot de passe"
                    });
                }
            });
        }
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { uploadPickerPicture() }} style={styles.editProfilPicture}>
                <Text style={styles.editProfilPicture.text}>Modifier la photo de profil</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={newDisplayName => setDisplayName(newDisplayName)}
                value={displayName}
                placeholder="Votre nom"
                placeholderTextColor="#9e9e9e"
            />
            <TextInput
                style={styles.input}
                onChangeText={newEmail => setEmail(newEmail)}
                value={email}
                placeholder="Votre nouvelle adresse e-mail"
                placeholderTextColor="#9e9e9e"
            />
            <TextInput
                style={styles.input}
                onChangeText={newPassword => setPassword(newPassword)}
                value={password}
                placeholder="Votre nouveau mot de passe"
                placeholderTextColor="#9e9e9e"
            />
            <TextInput
                style={styles.input}
                onChangeText={newConfirmPassword => setConfirmPassword(newConfirmPassword)}
                value={confirmPassword}
                placeholder="Confirmation du mot de passe"
                placeholderTextColor="#9e9e9e"
            />
            <TouchableOpacity onPress={() => {  changeProfil() }} style={styles.confirmSave}>
                <Text style={styles.confirmSave.text}>Enregistrer vos modifications</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        alignItems:"center",
        width:"100%"
    },
    editProfilPicture:{
        width:300,
        height:70,
        backgroundColor:"#000",
        borderRadius:100,
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:20,
        text:{
            color:"#FFF",
            textAlign:"center",
            fontSize:20
        }
    },
    confirmSave:{
        width:300,
        height:70,
        backgroundColor:"#48B781",
        borderRadius:100,
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:20,
        text:{
            color:"#FFF",
            textAlign:"center",
            fontSize:20
        }
    },
    input:{
        width:350,
        height:50,
        backgroundColor: "#e3e3e3",
        marginTop:20,
        paddingLeft:20,
        fontSize:20,
    }
})

export default ProfileScreen;