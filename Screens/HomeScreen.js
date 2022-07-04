import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView
} from 'react-native';

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
                        <Text style={styles.sectionHeader}>fsdsfdqsfdq</Text>
                        <FlatList
                            data={SECTIONS}
                            renderItem={({ item }) => <SearchItem item={item} />}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text style={styles.sectionHeader}>fsdfdssfdqfd</Text>
                        <FlatList
                            data={RECENTLY}
                            renderItem={({ item }) => <RecentlyItem item={item} />}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom:50
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 35,
        color: '#000',
        marginVertical:40
    },
    searchItem: {
        margin: 10,
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

    recentlyItem: {
        margin: 10,
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



});


export default HomeScreen;