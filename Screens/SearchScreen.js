import React, {useRef, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SectionList,
    VirtualizedList, Modal
} from 'react-native';
import axios from "axios";
import SearchableDropdown from 'react-native-searchable-dropdown';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from "react-native-picker-select";
import GestureRecognizer from "react-native-swipe-gestures";
import AutoCompleteInput from "react-native-tomtom-autocomplete";
import MapView from 'react-native-maps';



const FilterItem = ({ item, onPress, backgroundColor, textColor, isTypeItem }) => {
    if(isTypeItem){
        return (
            (
                <TouchableOpacity  onPress={onPress} style={[styles.typeItem, backgroundColor]}>
                    <Image
                        source={item.thumbnail}
                        style={styles.typeItem.itemPhoto}
                        resizeMode="cover"
                    />
                    <View style={styles.typeItem.itemCaption}><Text style={[styles.typeItem.itemCaptionText, textColor]}>{item.name}</Text></View>
                </TouchableOpacity>
            )
        )
    } else {
        return (
            (
                <TouchableOpacity  onPress={onPress} style={[styles.wishItem, backgroundColor]}>
                    <View style={styles.wishItem.itemCaption}><Text style={[styles.wishItem.itemCaptionText, textColor]}>{item.name}</Text></View>
                </TouchableOpacity>
            )
        )
    }
}

const SearchScreen = ({ navigation }) => {

    const [searchQuery, setQuery] = useState("");
    const [modalState, setModalState] = useState(false);
    const [region, setRegion] = useState({latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421});
    const mapRef = useRef(null);
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const [selectedWishId, setSelectedWishId] = useState(null);
    const [selectWishName, setSelectedWishName] = useState("");
    const [selectedTypeName, setSelectedTypeName] = useState("");
    const [filterLocalization, setFilterLocalization] = useState("");
    const [localization, setLocalization] = useState("En attente du lieu de location...");

    const vehicules = [
        {
            key: '1',
            name: 'Catamarans',
            slug: 'catamarans',
            thumbnail: require('../assets/catamarans.jpg'),
            selected:false,
        },
        {
            key: '2',
            name: 'Yacht',
            slug: 'yacht',
            thumbnail: require('../assets/yacht.jpeg'),
            selected:false,
        },

        {
            key: '3',
            name: 'Voilier',
            slug: 'voilier',
            thumbnail: require('../assets/voilier.jpg'),
            selected:false,
        },
        {
            key: '4',
            name: 'Bateau de plaisance',
            slug: 'plaisance',
            thumbnail: require('../assets/plaisance.jpg'),
            selected:false,
        },
        {
            key: '5',
            name: 'Jet-Ski',
            slug: 'jetski',
            thumbnail: require('../assets/jetski.jpg'),
            selected:false,
        },
        {
            key: '6',
            name: 'Semi-Rigide',
            slug: 'semirigide',
            thumbnail: require('../assets/semirigide.png'),
            selected:false,
        },
    ]
    const wishs = [
        {
            key: '1',
            name: 'Proposer des balades en mer',
            selected:false,
        },
        {
            key: '2',
            name: 'Faire découvrir mon lieu de vie',
            selected:false,
        },

        {
            key: '3',
            name: 'Proposer des vacances, avec équipages',
            selected:false,
        },
        {
            key: '4',
            name: 'Partager mon savoir',
            selected:false,
        }
    ]

    const renderTypeItem = ({ item }) => {
        const backgroundColor = item.key === selectedTypeId ? "#48B781" : "#ffffff";
        const color = item.key === selectedTypeId ? 'white' : 'black';

        return (
            <FilterItem
                item={item}
                isTypeItem={true}
                onPress={() => {
                    setSelectedTypeId(item.key)
                    setSelectedTypeName(item.slug)
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const renderWishItem = ({ item }) => {
        const backgroundColor = item.key === selectedWishId ? "#48B781" : "#ffffff";
        const color = item.key === selectedWishId ? 'white' : 'black';

        return (
            <FilterItem
                item={item}
                isTypeItem={false}
                onPress={() => {
                    setSelectedWishId(item.key)
                    setSelectedWishName(item.name)
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };


    const searchResult = () => {
        axios.post("https://apilarguezlesamarres.vercel.app/api/search", {
            query: searchQuery,
            localizationFilter:filterLocalization,
            typeFilter:selectedTypeName,
            wishFilter:selectWishName,
        }).then(response => {
            navigation.navigate('Results', {
                results:response.data,
            });
        })
    }


    const getRegion = (item) => {
        if(item.address.streetName !== undefined){
            setFilterLocalization(item.address.freeformAddress)
        } else if(item.address.municipality !== undefined) {
            setFilterLocalization(item.address.municipality)
        } else if(item.address.country !== undefined){
            setFilterLocalization(item.address.country)
        } else {
            console.log("Error")
        }

        const ASPECT_RATIO = 500 / 700;

        const lat = parseFloat(item.position.lat);
        const lng = parseFloat(item.position.lon);

        let southEast;
        let northWest;

        if(item.boundingBox !== undefined){
            southEast = parseFloat(item.boundingBox.btmRightPoint.lat);
            northWest = parseFloat(item.boundingBox.topLeftPoint.lat);
        } else {
            southEast = parseFloat(item.viewport.btmRightPoint.lat);
            northWest = parseFloat(item.viewport.topLeftPoint.lat);
        }

        const latDelta = northWest - southEast;
        const lngDelta = latDelta * ASPECT_RATIO;

        setRegion({latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta})

    }

    return (
        <View style={styles.container}>

            <KeyboardAwareScrollView>
                <View style={styles.search}>
                    <TextInput style={styles.search.searchbar} onChangeText={(query) => setQuery(query)} placeholderTextColor="#9e9e9e" placeholder={"Nom de bateau, capacités à bord..."}/>

                    <TouchableOpacity style={styles.search.searchButton} onPress={() => {searchResult()}}>
                        <Text style={styles.search.searchButtonText}>Lancer la recherche</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeader}>Par destinations</Text>
                <Modal
                    animationType="slide"
                    visible={modalState}
                    transparent={true}
                    onRequestClose={() => { setModalState(!modalState); }}>
                    <View style={styles.modalBooking}>
                        <AutoCompleteInput
                            inputProps={{
                                placeholder: "Un pays, une ville, une adresse...",
                                placeholderTextColor: '#aeaeae',
                                fontSize:25,
                                display:"flex",
                                paddingLeft:10,
                                justifyContent:"center",
                                alignItems:"center",
                                height:80
                            }}
                            onPress={(item) => {
                                getRegion(item)
                            }}
                            inputContainerStyle={{
                                width:"100%",
                                height:80,
                                color:"#000",
                                fontSize:30,
                            }}
                            listItemsContainerStyle={{
                                padding: 0,
                                marginHorizontal: 10,
                                height:"100%"
                            }}
                            tomtomOptions={{ key: "PIFKrwjNy0lZNmUGGaD6J8dWXWTxzrSi" }}
                        />
                        <MapView
                            pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
                            ref={mapRef}
                            style={{width: 700, height: 700}}
                            initialRegion={region}
                            region={region}
                            onRegionChange={(coordinate) => setRegion(coordinate)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setModalState(false)} style={styles.button}>
                        <Text style={styles.button.buttonText}>Fermer la carte</Text>
                    </TouchableOpacity>
                </Modal>

                <View style={styles.localizationDisplay} placeholderTextColor="#9e9e9e"><Text style={styles.localizationDisplay.text}>{filterLocalization ? filterLocalization : 'En attente du lieu de location...'}</Text></View>
                <TouchableOpacity onPress={() => setModalState(true)} style={styles.button}>
                    <Text style={styles.button.buttonText}>Sélectionnez le lieu de location</Text>
                </TouchableOpacity>


                <SafeAreaView style={styles.types}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <Text style={styles.sectionHeader}>Par types de véhicules</Text>
                        <FlatList
                            style={styles.searchItemContainer}
                            data={vehicules}
                            extraData={selectedTypeId}
                            renderItem={renderTypeItem}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>
                </SafeAreaView>

                <SafeAreaView style={styles.wishs}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <Text style={styles.sectionHeader}>Par envies</Text>
                        <FlatList
                            style={styles.searchItemContainer}
                            data={wishs}
                            extraData={selectedWishId}
                            renderItem={renderWishItem}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>
                </SafeAreaView>

            </KeyboardAwareScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    localizationDisplay:{
        backgroundColor:"#ffffff",
        marginLeft:20,
        marginTop:30,
        paddingLeft:20,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        fontSize:16,
        height:70,
        display:"flex",
        justifyContent:"center",
        width:"90%",
        text:{
            color:"#000000",
            fontSize:20
        }
    },
    button:{
        width:"90%",
        height:60,
        backgroundColor:"#48B781",
        marginLeft:20,
        marginBottom: 50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        buttonText:{
            color:"#FFF",
            fontSize:20
        }
    },
    modalBooking:{
        width:"100%",
        height:700,
        backgroundColor:"#efefef",
        paddingVertical:100,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
        display:"flex",
        alignItems:"center"
    },
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
        marginBottom:10
    },
    wishs:{
        marginBottom:70,
        display:"flex",
        flexDirection:"column"
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 25,
        color: '#000',
        marginTop:40,
        marginLeft:15,
        marginBottom:30
    },
    subHeaderText: {
        fontWeight: '800',
        fontSize: 20,
        color: '#000',
        marginLeft:15,
        marginVertical:20,
    },
    searchItemContainer:{
        marginLeft:15,
    },
    typeItem: {
        marginRight:15,
        borderRadius:20,
        backgroundColor: "#FFF",
        height:200,
        width:250,
        position:"relative",
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
    wishItem: {
        marginRight:15,
        borderRadius:20,
        backgroundColor: "#FFF",
        height:50,
        width:"auto",
        paddingHorizontal:20,
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
    }
});

const selector = StyleSheet.create({
    inputIOS: {
        width:"90%",
        height:70,
        backgroundColor:"#FFF",
        borderRadius: 10,
        paddingLeft:10,
        fontSize:20,
        marginLeft:15
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor:"#FFF"
    },
});


export default SearchScreen;