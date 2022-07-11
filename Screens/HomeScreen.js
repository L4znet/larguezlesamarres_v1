import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';



const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.smallText}>Bienvenue sur</Text>
                <Text style={styles.title}>Larguez les amarres !</Text>
                <Text style={styles.smallText}>Pour commencer</Text>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.push('Register'); }}>
                    <Text style={styles.button.buttonText}>Inscrivez-vous</Text>
                </TouchableOpacity>
                <Text style={styles.smallText}>...ou sinon</Text>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.push('Login'); }}>
                    <Text style={styles.button.buttonText}>Connectez-vous</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.navigate('Tabs'); }}>
                <Text style={styles.button.buttonText}>Retour au feed</Text>
            </TouchableOpacity>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    smallText:{
        fontSize:25,
        paddingHorizontal:20,
        width:"100%",
        textAlign:"center",
        marginTop:30
    },
    title:{
        fontSize:30,
        paddingHorizontal:20,
        width:"100%",
        textAlign:"center",
        fontWeight:"bold"
    },
    button:{
        width:"90%",
        height:60,
        backgroundColor:"#48B781",
        marginLeft:20,
        marginTop:30,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        buttonText:{
    fontSize:23,
            color:"#FFF"
        }
    },
    backButton:{
        width:"90%",
        height:60,
        backgroundColor:"#bababa",
        marginLeft:20,
        marginBottom:40,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        buttonText:{
            fontSize:23,
            color:"#FFF"
        }
    },
});


export default HomeScreen;