import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert} from "react-native";
import CardOffer from "../components/CardOffer";
import axios from "axios";
import {useEffect, useState} from "react";
import {auth} from "../firebase";

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
                        axios.delete('https://apilarguezlesamarres.vercel.app/api/posts/' + id)
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
        axios.get('https://apilarguezlesamarres.vercel.app/api/posts/' + auth.currentUser.uid + '/posts').then((response) => {
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
                marginVertical:40,
                marginLeft:15,
            }}>Vos offres</Text>
        );
    }

    const RecentlyItem = ({ item }) => {

        return (
            <>
                <CardOffer item={item} navigation={navigation}/>
                <TouchableOpacity style={styles.bookingButton} onPress={() => {
                    navigation.navigate("OfferBooking", {
                        authorId: item.authorId,
                        offerId:item.key
                    });
                }}>
                    <Text style={styles.label}>Consulter les réservations</Text>
                </TouchableOpacity>
                <View style={{display:"flex", flexDirection:"row", width:"95%", marginBottom:60, justifyContent:"space-between", marginLeft:15}}>
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
    button:{
        width:"45%",
        height:70,
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginRight:15,
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
    },
    bookingButton:{
        width:"92%",
        height:70,
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:15,
        marginBottom:15,
        backgroundColor:"#48B781"
    }
})

export default ManageOffers;