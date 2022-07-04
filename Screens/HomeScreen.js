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
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
    },
    {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
    },
    {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
    },
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

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <SafeAreaView>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Text style={styles.sectionHeader}>Vous cherchez ?</Text>
                        <FlatList
                            style={styles.searchItemContainer}
                            data={SECTIONS}
                            renderItem={({ item }) => <SearchItem item={item} />}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text style={styles.sectionHeader}>Publié récemment</Text>
                        <FlatList
                            style={styles.recentlyItemContainer}
                            data={RECENTLY}
                            renderItem={({ item }) => <RecentlyItem item={item} />}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </ScrollView>

                </SafeAreaView>
                <View style={styles.countrySection}>
                    <Text style={styles.countrySectionHeader}>Quelques destinations de rêves</Text>
                    <View style={styles.countryGrid}>
                        <TouchableOpacity style={styles.countryGrid.countryItem}>
                            <View style={styles.countryItemContent}>
                                <View style={styles.countryItemContent.countryItemLabel}>
                                    <Text style={styles.countryItemContent.countryItemLabelText}>
                                        Guadeloupe
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
                                        Guadeloupe
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
                                        Guadeloupe
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
            </ScrollView>

        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 25,
        color: '#000',
        marginVertical:40,
        marginLeft:30
    },
    searchItemContainer:{
        marginLeft:30
    },
    searchItem: {
        marginRight:30,
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


export default HomeScreen;