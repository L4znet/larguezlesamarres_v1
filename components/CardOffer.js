

import React, {useState } from "react";
import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";


const CardOffer = ({item, navigation}) => {


    console.log(item.pricePer)


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
    )
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
})

export default CardOffer