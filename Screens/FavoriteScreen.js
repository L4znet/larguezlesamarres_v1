import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {auth, db, query} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";

const FavoriteScreen = ({navigation}) => {

    const [favorites, setFavoriteData] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const createJson = (data) => {

        let favorites = []

        for (const property in data) {

            let json = {
                key:data[property].key,
                offerId:data[property].offerId,
                price:data[property].price,
                pricePer:data[property].pricePer,
                title:data[property].title,
                thumbnail:data[property].thumbnail,
            }
            favorites.push(json)
        }

        return favorites

    }


    useEffect(() => {

        const unsubscribe = onSnapshot(doc(db, "favorites", auth.currentUser.uid), (doc) => {
            setFavoriteData(createJson(doc.data()))
        });
        return () => {
            unsubscribe()
        }
    }, [])


    const FavoriteItem = (item) => {

        return (
            <TouchableOpacity style={styles.recentlyItem} onPress={() => {
                navigation.navigate("ShowPost", {
                    id: item.item.offerId,
                });
            }}>
                <Image source={{uri: item.item.thumbnail}} style={styles.recentlyItem.itemPhoto} resizeMode="cover"/>
                <View style={styles.recentlyItem.itemCaption}><Text style={styles.recentlyItem.itemCaptionText}>{item.item.title}</Text></View>
                <View style={styles.recentlyItem.itemCaption}><Text style={styles.recentlyItem.itemCaptionText}>{item.item.price} € par {item.item.pricePer}</Text></View>
            </TouchableOpacity>
        )
    }



    const FlatList_Header = () => {
        return (
            <Text style={{
                fontWeight: '800',
                fontSize: 25,
                color: '#000',
                marginVertical:40,
                marginLeft:15,
            }}>Vos favoris</Text>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.recentlyItemContainer}
                data={favorites}
                renderItem={({ item }) => <FavoriteItem item={item} />}
                keyExtractor={item => item.key}
                ListHeaderComponent={FlatList_Header}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshing={isRefreshing}
            />
        </View>

    );
};


const styles = StyleSheet.create({


    recentlyItem: {
        marginRight:15,
        marginBottom:30,
        borderRadius:20,
        backgroundColor: "#FFF",
        height:360,
        width:345,
        marginLeft:15,
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


export default FavoriteScreen;