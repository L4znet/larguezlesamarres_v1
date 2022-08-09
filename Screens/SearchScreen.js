import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import axios from "axios";

const SECTIONS = [
    {
        key: '1',
        text: 'Catamarans',
        uri: 'https://picsum.photos/id/1/200',
    },
    {
        key: '2',
        text: 'Yacht',
        uri: 'https://picsum.photos/id/10/200',
    },

    {
        key: '3',
        text: 'Voilier',
        uri: 'https://picsum.photos/id/1002/200',
    },
    {
        key: '4',
        text: 'Bateau de plaisance',
        uri: 'https://picsum.photos/id/1006/200',
    }
];


const RECENTLY = [
    {
        key: '1',
        text: 'Yacht Imperator 44m',
        price: "300 €/semaine",
        uri: 'https://picsum.photos/id/1/200',
    },
    {
        key: '2',
        text: 'Yacht Imperator 44m',
        price: "300 €/semaine",
        uri: 'https://picsum.photos/id/10/200',
    },

    {
        key: '3',
        text: 'Yacht Imperator 44m',
        price: "300 €/semaine",
        uri: 'https://picsum.photos/id/1002/200',
    },
    {
        key: '4',
        text: 'Yacht Imperator 44m',
        price: "300 €/semaine",
        uri: 'https://picsum.photos/id/1006/200',
    },
    {
        key: '5',
        text: 'Yacht Imperator 44m',
        price: "300 €/semaine",
        uri: 'https://picsum.photos/id/1008/200',
    },
];


const SearchItem = ({ item }) => {
    return (
        <View style={styles.searchItem}>
            <Image
                source={{
                    uri: item.uri,
                }}
                style={styles.searchItem.itemPhoto}
                resizeMode="cover"
            />
            <View style={styles.searchItem.itemCaption}><Text style={styles.searchItem.itemCaptionText}>{item.text}</Text></View>
        </View>
    );
};
const RecentlyItem = ({ item }) => {
    return (
        <View style={styles.recentlyItem}>
            <Image
                source={{
                    uri: item.uri,
                }}
                style={styles.recentlyItem.itemPhoto}
                resizeMode="cover"
            />
            <View style={styles.recentlyItem.itemCaption}><Text style={styles.recentlyItem.itemCaptionText}>{item.text}</Text></View>
            <View style={styles.recentlyItem.itemCaption}><Text style={styles.recentlyItem.itemCaptionText}>{item.price}</Text></View>
        </View>
    );
};

const SearchScreen = ({ navigation }) => {

    const [searchQuery, setQuery] = useState("500");

    const searchResult = () => {


        axios.post("http://192.168.1.24:3000/api/search", {
            query: searchQuery
        }).then(response => {
            navigation.navigate('Results', {
                results:response.data,
            });
        })



    }

    return (
        <View style={styles.container}>

            <ScrollView contentInsetAdjustmentBehavior="automatic">

                <View style={styles.search}>
                    <TextInput style={styles.search.searchbar} onChangeText={(query) => setQuery(query)} placeholder={"Nom de bateau, capacités à bord..."}/>
                    <TouchableOpacity style={styles.search.searchButton} onPress={() => {searchResult()}}>
                        <Text style={styles.search.searchButtonText}>Lancer la recherche</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.countrySection}>
                    <Text style={styles.countrySectionHeader}>Par destinations</Text>
                    <View style={styles.countryGrid}>
                        <TouchableOpacity style={styles.countryGrid.countryItem}>
                            <View style={styles.countryItemContent}>
                                <View style={styles.countryItemContent.countryItemLabel}>
                                    <Text style={styles.countryItemContent.countryItemLabelText}>
                                        Côte d'Azur
                                    </Text>
                                </View>
                                <Image
                                    source={{
                                        uri: "https://picsum.photos/id/50/200",
                                    }}
                                    style={styles.countryItemContent.countryBackgroundImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.countryGrid.countryItem}>
                            <View style={styles.countryItemContent}>
                                <View style={styles.countryItemContent.countryItemLabel}>
                                    <Text style={styles.countryItemContent.countryItemLabelText}>
                                        Guadeloupe
                                    </Text>
                                </View>
                                <Image
                                    source={{
                                        uri: "https://picsum.photos/id/200/200",
                                    }}
                                    style={styles.countryItemContent.countryBackgroundImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.countryGrid.countryItem}>
                            <View style={styles.countryItemContent}>
                                <View style={styles.countryItemContent.countryItemLabel}>
                                    <Text style={styles.countryItemContent.countryItemLabelText}>
                                        Guyane
                                    </Text>
                                </View>
                                <Image
                                    source={{
                                        uri: "https://picsum.photos/id/20/200",
                                    }}
                                    style={styles.countryItemContent.countryBackgroundImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.countryGrid.countryItem}>
                            <View style={styles.countryItemContent}>
                                <View style={styles.countryItemContent.countryItemLabel}>
                                    <Text style={styles.countryItemContent.countryItemLabelText}>
                                        Martinique
                                    </Text>
                                </View>
                                <Image
                                    source={{
                                        uri: "https://picsum.photos/id/506/200",
                                    }}
                                    style={styles.countryItemContent.countryBackgroundImage}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <SafeAreaView style={styles.types}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <Text style={styles.sectionHeader}>Par types de véhicules</Text>
                        <FlatList
                            style={styles.searchItemContainer}
                            data={SECTIONS}
                            renderItem={({ item }) => <SearchItem item={item} />}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search:{
        flex:1,
        display:"flex",
        alignItems:"center",
        flexDirection: "column",
        searchbar:{
            width:"95%",
            height:60,
            backgroundColor:"#FFF",
            marginTop:30,
            borderRadius:50,
            fontSize:20,
            paddingLeft:20
        },
        searchButton:{
            width:"65%",
            height:60,
            backgroundColor:"#48B781",
            marginTop:20,
            borderRadius:50,
            fontSize:20,
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        },
        searchButtonText:{
            color:"#FFF",
            fontSize:18
        }
    },
    types:{
        marginBottom:70
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 25,
        color: '#000',
        marginVertical:40,
        marginLeft:15
    },
    searchItemContainer:{
        marginLeft:15,
    },
    searchItem: {
        marginRight:15,
        borderRadius:20,
        backgroundColor: "#FFF",
        height:200,
        width:250,
        itemPhoto: {
            width: 250,
            height: 150,
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
    recentlyItemContainer:{
        marginLeft:30
    },
    recentlyItem: {
        marginRight:30,
        marginBottom:30,
        borderRadius:20,
        backgroundColor: "#FFF",
        height:360,
        width:320,
        itemPhoto: {
            width: 320,
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
        marginVertical: 40,
        width:"100%",
        paddingLeft: 15
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
            width:170,
            height:170,
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
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            opacity:0.6,
            position:"absolute",
            zIndex:9998,
        },
        countryItemLabelText:{
            color:"#FFF",
            position:"absolute",
            fontSize:20,
            fontWeight:"bold"
        }
    }


});


export default SearchScreen;