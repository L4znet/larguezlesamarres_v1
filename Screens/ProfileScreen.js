import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import {signOut} from "firebase/auth";
import {auth, db, doc, deleteDoc, storage, deleteObject} from '../firebase'
import { useState} from "react";
import {ref} from "firebase/storage";
import ToggleSwitch from "toggle-switch-react-native";
import {useDispatch, useSelector} from "react-redux";
import {toggleLeftHandMode, toggleTenantOwner} from "../store/settingsSlice";

const logout = () => {
    signOut(auth).then(() => {})
}

const deleteAccount = async () => {
    auth.currentUser.delete().then(function () {})

    const fileRef = ref(storage, auth.currentUser.uid);

    if(fileRef.name !== "default"){
        const profilPict = ref(storage, fileRef.name);
        deleteObject(profilPict).then(() => {
        }).catch((error) => {
        });
    }

    await deleteDoc(doc(db, "users", auth.currentUser.uid));

    signOut(auth).then(() => {
    })
}




const ProfileScreen = ({navigation}) => {


    const [currentUser, setCurrentUser] = useState(JSON.stringify(auth.currentUser));
    const leftHandMode = useSelector((state) => state.settings.leftHandMode)
    const ownerTenantState = useSelector((state) => state.settings.ownerTenantState)
    const dispatch = useDispatch()

    navigation.addListener('focus', async () => {
        auth.currentUser.reload().then(() => {
            setCurrentUser(JSON.stringify(auth.currentUser))
        });
    });

    const leftMode = () => {
        dispatch(toggleLeftHandMode())
    }

    const ownerTenantMode = () => {
        dispatch(toggleTenantOwner())
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image
                        style={styles.profilPicture}
                        source={{ uri: JSON.parse(currentUser).photoURL }}
                    />
                    <Text style={styles.username}>{JSON.parse(currentUser).displayName}</Text>
                    <View  style={styles.loginCredentials}>
                        <Text style={styles.loginCredentials.title}>Adresse e-mail de connexion</Text>
                        <Text style={styles.loginCredentials.email}>{JSON.parse(currentUser).email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate('EditProfil') }} style={styles.editProfil}><Text style={styles.editProfil.editProfilText}>Modifier mon profil</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { logout() }} style={styles.logout}><Text style={styles.logout.logoutText}>Déconnexion</Text></TouchableOpacity>
                </View>
                <View  style={[{marginTop:30, paddingBottom:30}, styles.options]}>
                    <Text style={styles.options.title}>Options d'interface</Text>
                    <ToggleSwitch
                        style={{marginTop:30, width:"100%", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}
                        isOn={leftHandMode}
                        onColor="green"
                        offColor="#a9a9a9"
                        label="Mode gaucher"
                        labelStyle={{ color: "black", fontWeight: "900", fontSize:20 }}
                        size="large"
                        animationSpeed={150}
                        onToggle={isOn => leftMode()}
                    />
                    <View style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <ToggleSwitch
                            style={{marginTop:40, width:"100%", alignItems:"center", justifyContent:"center"}}
                            isOn={ownerTenantState}
                            onColor="green"
                            offColor="blue"
                            animationSpeed={150}
                            label="Changer de type de profil"
                            labelStyle={{ color: "black", fontWeight: "900", fontSize:20, marginBottom:20 }}
                            size="large"
                            onToggle={isOn => ownerTenantMode()}
                        />
                        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:20}}>
                            <Text style={{fontSize:20, marginLeft:60}}> Propriétaire</Text>
                            <Text style={{fontSize:20, marginRight:80}}>Locataire</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dangerZone}>
                    <Text style={styles.deleteAccount.title}>DANGER ZONE</Text>
                    <TouchableOpacity onPress={() => { deleteAccount() }} style={styles.deleteAccount}><Text style={styles.deleteAccount.deleteAccountText}>Supprimer mon compte</Text></TouchableOpacity>
                    <Text style={styles.deleteAccount.warningMessage}>Cette action est irréversible</Text>
                </View>
            </View>
        </ScrollView>


    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
    },
    profilPicture:{
        width:150,
        height:150,
        marginTop:50,
        borderRadius:100
    },
    username:{
        fontSize:30,
        marginVertical:20,
        fontWeight:"bold"
    },
    options:{
        width:"100%",
        height:"auto",
        backgroundColor:"#dfdfdf",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop:20,
        paddingBottom:50,
        title:{
            fontSize:30,
            fontWeight: "bold",
            marginTop:20
        },
    },
    loginCredentials:{
        width:"100%",
        height:100,
        backgroundColor:"#dfdfdf",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end",
        alignItems:"center",
        title:{
            fontSize:20,
            fontWeight: "bold",
            marginBottom:10
        },
        email:{
            fontSize:20,
            marginBottom:20
        },
        passwordText:{
            fontSize:20,
            height:30,
            marginBottom:20
        },
        passwwordFake:{
            marginLeft:2,
        }
    },
    editProfil:{
        width:"80%",
        height:60,
        backgroundColor:"#48B781",
        marginTop:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        editProfilText:{
            color:"#FFF",
            fontSize:18
        }
    },
    logout:{
        width:"80%",
        height:60,
        backgroundColor:"#c74a4a",
        marginTop:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        logoutText:{
            color:"#FFF",
            fontSize:18
        }
    },
    dangerZone:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:220,
        marginVertical:10,
    },
    deleteAccount:{
        width:"80%",
        height:60,
        backgroundColor:"#c74a4a",
        marginTop:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        deleteAccountText:{
            color:"#FFF",
            fontSize:18
        },
        title:{
            color:"#c74a4a",
            fontSize:30,
            fontWeight:"bold",
            marginVertical:10
        },
        warningMessage:{
            color:"#c74a4a",
            fontSize:20,
            fontWeight:"bold",
            marginTop:10
        }
    },
})

export default ProfileScreen;