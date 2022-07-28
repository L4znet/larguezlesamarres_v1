import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useSelector} from "react-redux";
import {onAuthStateChanged} from "@firebase/auth";
import {auth, collection, query} from "../firebase";
import axios from "axios";

const FeedScreen = ({navigation}) => {

    const leftHandMode = useSelector((state) => state.settings.leftHandMode)
    const [offers, setOffers] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [isUserLogged, setUserLogged] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserLogged(true)
        } else {
            setUserLogged(false)
        }
    });

    const getRefresh = () => {
        setIsRefreshing(true)
        axios.get("http://192.168.1.24:3000/api/posts").then(r => {
            setOffers(r.data)
            setIsRefreshing(false)
        })
    }

    const getOffer = () => {
        axios.get("http://192.168.1.24:3000/api/posts").then(r => setOffers(r.data))
    }


    useEffect(() => {
        return navigation.addListener('change', () =>  getOffer());
    }, [navigation])

    useEffect(() => {
        getOffer()
    }, [])

    const RecentlyItem = ({ item }) => {
        switch (item.pricePer) {
            case 'week':
                item.pricePer = "semaine"
                break;
            case 'month':
                item.pricePer = "mois"
                break;
            case 'day':
                item.pricePer = "jour"
                break;
            case 'hour':
                item.pricePer = "heure"
                break;
        }



        return (
            <TouchableOpacity style={styles.recentlyItem} onPress={() => {
                navigation.navigate("ShowPost", {
                    id: item.key,
                });
            }}>
                <Image source={{uri: item.thumbnail}} style={styles.recentlyItem.itemPhoto} resizeMode="cover"/>
                <View style={styles.recentlyItem.itemCaption}><Text style={styles.recentlyItem.itemCaptionText}>{item.title}</Text></View>
                <View style={styles.recentlyItem.itemCaption}><Text style={styles.recentlyItem.itemCaptionText}>{item.price} € par {item.pricePer}</Text></View>
            </TouchableOpacity>
        );
    };


    const FlatList_Header = () => {
        return (
            <Text style={{
                fontWeight: '800',
                fontSize: 25,
                color: '#000',
                marginVertical:40
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
            {isUserLogged === true &&
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
    recentlyItemContainer:{
        marginLeft:15
    },
    recentlyItem: {
        marginRight:15,
        marginBottom:30,
        borderRadius:20,
        backgroundColor: "#FFF",
        height:360,
        width:345,
        itemPhoto: {
            width: 345,
            height: 250,
            borderTopLeftRadius:20,
            borderTopRightRadius:20
        },
        itemCaption: {
            color: '#000',
            width:"100%",
            fontWeight: "bold",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:50,
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20
        },
        itemCaptionText: {
            fontSize:20,
            fontWeight:"bold"
        },
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