import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import {signOut} from "firebase/auth";
import {auth, db, doc, deleteDoc, storage, deleteObject} from '../firebase'
import { useState} from "react";
import {ref} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import { toggleTenantOwner} from "../store/settingsSlice";

const logout = () => {
    signOut(auth).then(() => {})
}

const deleteAccount = async () => {

    if(auth){
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
}




const ProfileScreen = ({navigation}) => {


    const [currentUser, setCurrentUser] = useState(JSON.stringify(auth.currentUser));
    const ownerTenantState = useSelector((state) => state.settings.ownerTenantState)
    const dispatch = useDispatch()

    navigation.addListener('focus', async () => {
        auth.currentUser.reload().then(() => {
            setCurrentUser(JSON.stringify(auth.currentUser))
        });
    });

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
                    <View style={{display:"flex", flexDirection:"column", width:"100%"}}>
                        <View style={styles.choices}>
                            <TouchableOpacity onPress={() => ownerTenantMode() }>
                                <Text style={[styles.choices.choiceItem(ownerTenantState), styles.choices.choiceItemTrue(ownerTenantState)]}>Propriétaire</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => ownerTenantMode() }>
                                <Text style={[styles.choices.choiceItem(ownerTenantState), styles.choices.choiceItemFalse(ownerTenantState)]}>Locataire</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.contactSupport}>
                    <Text style={styles.contactSupport.title}>Contacter le support</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("ContactSupport") }} style={styles.contactSupport.contactSupportBtn}><Text style={styles.contactSupport.contactSupportText}>Contacter le support</Text></TouchableOpacity>
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
    choices:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:40,
        choiceItem:(state)=> ({
            height:80,
            display:"flex",
            paddingHorizontal: 20,
            textAlign:"center",
            lineHeight:80,
            fontWeight:"bold",
            fontSize:20,
            width:200,
        }),
        choiceItemTrue:(state)=> ({
            backgroundColor: state === true ? "#ffffff" : "#48B781",
            color: state === false ? "#ffffff" : "#000",
        }),
        choiceItemFalse:(state)=> ({
            backgroundColor: state === false ? "#ffffff" : "#48B781",
            color: state === true ? "#FFF" : "#000",
        }),
    },
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
    contactSupport:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:150,
        marginVertical:10,
        title:{
            color:"#000000",
            fontSize:30,
            fontWeight:"bold",
            marginVertical:10
        },
        contactSupportBtn:{
            width:"80%",
            height:60,
            backgroundColor:"#48B781",
            marginTop:30,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:15,
        },
        contactSupportText:{
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