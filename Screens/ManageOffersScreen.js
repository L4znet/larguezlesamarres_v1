import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import CardOffer from "../components/CardOffer";
import axios from "axios";
import useFetch from "react-fetch-hook";
import {useEffect, useState} from "react";
import {auth} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import {toggleMyOffersLoaded, toggleOfferSent} from "../store/statesLoadSlice";

const ManageOffers = ({ navigation }) => {
    const [offers, setOffers] = useState([]);

    const deleteOffer = (id) => {
        return Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir supprimer cette offre ? Cette opération est irréversible.",
            [
                {
                    text: "Supprimer",
                    onPress: () => {
                        axios.delete('http://192.168.1.24:3000/api/posts/' + id)
                        navigation.replace('Tabs', { screen: 'Feed' });
                    },
                },
                {
                    text: "Annuler",
                },
            ]
        );
    }



    const getMyOffers = () => {
        axios.get('http://192.168.1.24:3000/api/posts/' + auth.currentUser.uid + '/posts').then((response) => {
            setOffers(response.data)
        })
    }

    useEffect(() => {
        getMyOffers()

        return () => {
            setOffers([]);
        };
    }, [])

    const FlatList_Header = () => {
        return (
            <Text style={{
                fontWeight: '800',
                fontSize: 25,
                color: '#000',
                marginVertical:40
            }}>Vos offres</Text>
        );
    }

    const RecentlyItem = ({ item }) => {

        return (
            <>
                <CardOffer item={item} navigation={navigation}/>
                <View style={{display:"flex", flexDirection:"row", width:"95%", marginBottom:60, justifyContent:"space-between"}}>
                    <TouchableOpacity style={[styles.button, styles.delete]} onPress={() => {
                        deleteOffer(item.key)
                    }}>
                        <Text style={styles.label}>Supprimer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.edit]} onPress={() => {
                        navigation.navigate("EditPost", {
                            item: item,
                        });
                    }}>
                        <Text style={styles.label}>Modifier</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.recentlyItemContainer}
                data={offers}
                renderItem={({ item }) => <RecentlyItem item={item} />}
                keyExtractor={item => item.key}
                ListHeaderComponent={FlatList_Header}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>

    );
}


const styles = StyleSheet.create({
    recentlyItemContainer:{
        marginLeft:15
    },
    button:{
        width:"45%",
        height:70,
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    delete:{
        backgroundColor:"#d34141"
    },
    edit:{
        backgroundColor:"#2a94de"
    },
    label:{
        color:"#FFF",
        fontSize:20,
    }
})

export default ManageOffers;