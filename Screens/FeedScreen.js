import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "@firebase/auth";
import {auth, collection, query} from "../firebase";
import axios from "axios";
import useFetch from "react-fetch-hook";
import {toggleOfferSent} from "../store/statesLoadSlice";
import CardOffer from "../components/CardOffer";

const FeedScreen = ({navigation}) => {

    const leftHandMode = useSelector((state) => state.settings.leftHandMode)
    const ownerTenantState = useSelector((state) => state.settings.ownerTenantState)
    const offerSent = useSelector((state) => state.statesLoad.offerSent)
    const [offers, setOffers] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch()

    const [isUserLogged, setUserLogged] = useState(false);
    /**
     * Permet de savoir si l'utilisateur est connecté ou non, et de détecter un éventuel changement d'état (déconnexion etc..)
     *
     */
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserLogged(true)
        } else {
            setUserLogged(false)
        }
    });

    /**
     * Method qui va load les données, on détecte via un paramètre si cette méthode est exécuté dans le cas d'un pull to refresh
     *
     * @param refreshingTriggered
     */
    const getOffer = (refreshingTriggered = false) => {
        if(refreshingTriggered){
            setIsRefreshing(true)
        }
        axios.get("http://192.168.1.24:3000/api/posts").then(r => {
            setOffers(r.data)
            if(refreshingTriggered){
                setIsRefreshing(false)
            }
        })
    }


    /**
     * Méthode lancée quand on pull to refresh
     */
    const getRefresh = () => {
        setIsRefreshing(true)
        getOffer(true)
    }


    useEffect(() => {
        getOffer()

        return () => {
            setOffers([]);
        };
    }, [])

    const RecentlyItem = ({ item }) => {

        return (
            <CardOffer item={item} navigation={navigation}/>
        );
    };


    const FlatList_Header = () => {
        return (
            <Text style={{
                fontWeight: '800',
                fontSize: 25,
                color: '#000',
                marginVertical:40,
                marginLeft:15,
            }}> Les derniers ajouts</Text>
        );
    }

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
                onRefresh={getRefresh}
                refreshing={isRefreshing}
            />
            {isUserLogged === true && ownerTenantState === false &&
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#5ee1a0"
                    onPress={() => navigation.navigate('AddPost')}
                    style={[styles.addButton, leftHandMode ? {right:20} : {left:20}]}>
                    <AntDesign name="plus" size={30} color="white" />
                </TouchableHighlight>
            }
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton:{
        width:80,
        height:80,
        backgroundColor:"#48B781",
        position:"absolute",
        bottom:20,
        borderRadius:100,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    header:{
        title:{
            fontFamily:"Syne_700Bold",
            color:"#FFF",
            fontSize:20,
        },
        profil:{
            width:60,
            height:60,
            backgroundColor:"#FFF",
            borderRadius:"50%",
            marginBottom:10,
            marginRight:10,
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        },
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 25,
        color: '#000',
        marginVertical:40,
        marginLeft:30
    },
    countrySectionHeader: {
        fontWeight: '800',
        fontSize: 25,
        color: '#000',
        marginVertical: 40
    },
    countrySection:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    countryGrid:{
        display:"flex",
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"center",
        countryItem:{
            width:180,
            height:180,
            backgroundColor:"#FFF"
        }
    },
    countryItemContent:{
        width:"100%",
        height:"100%",
        countryBackgroundImage:{
            width:"100%",
            height:"100%",
            position:"absolute",
            zIndex:9997,
        },
        countryItemLabel:{
            backgroundColor:"#000",
            width:"100%",
            height:"100%",
            opacity:0.4,
            position:"absolute",
            zIndex:9998,
            countryItemLabelText:{
                color:"#FFF",
                zIndex:9999,
                width:"100%",
                height:"100%",
            }
        }
    }


});


export default FeedScreen;