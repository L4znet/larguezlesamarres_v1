import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput
} from 'react-native';
import CardOffer from "../components/CardOffer";

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

const ResultsScreen = ({ navigation, route }) => {
    const {results} = route.params;

    const FlatList_Header = () => {

        const plurialLabel = (value, label) => {



            if(parseInt(value) === 1) {
                return window[label] = label
            } else if(parseInt(value) > 1) {
                return window[label] = label + "s"
            }
        }

        let label = plurialLabel(results.estimatedTotalHits, "résultat")

        return (
            <View>
                <View style={styles.results.count}>
                    <Text style={styles.results.resultNumber}>{results.estimatedTotalHits} {label}</Text>
                    <Text style={styles.results.resultLabel}>pour votre recherche</Text>
                </View>
                <View style={styles.results}>
                    <TextInput style={styles.results.searchbar} value={results.query} placeholderTextColor="#9e9e9e" placeholder={"Nom de bateau, capacités à bord..."}/>
                    <Text style={styles.results.cancel} onPress={() => { navigation.replace('Tabs', { screen: 'Search' }) }}>Annuler</Text>
                </View>
            </View>
        )
    }

    const RecentlyItem = ({ item }) => {
        return (
            <>
                <CardOffer item={item} navigation={navigation}/>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={FlatList_Header()}
                style={styles.recentlyItemContainer}
                data={results.hits}
                renderItem={({ item }) => <RecentlyItem item={item} />}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    recentlyItemContainer:{
    },
    results: {
        flex:1,
        display:"flex",
        alignItems:"center",
        flexDirection: "column",
        marginLeft:15,
        count:{
            width:"100%",
            marginTop:30
        },
        resultNumber:{
            fontSize:40,
            fontWeight:"bold",
            textAlign:"center"
        },
        resultLabel:{
            fontSize:30,
            fontWeight:"300",
            textAlign:"center"
        },
        cancel:{
          fontSize:20,
            marginVertical:20
        },
        searchbar:{
            width:"95%",
            height:60,
            backgroundColor:"#FFF",
            marginTop:30,
            borderRadius:50,
            fontSize:20,
            paddingLeft:20,
            marginRight:15
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
            alignItems:"center",
            marginRight:15
        },
        searchButtonText:{
            color:"#FFF",
            fontSize:18
        }
    },
});


export default ResultsScreen;