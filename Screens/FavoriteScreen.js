import {Text, View, Button, TouchableHighlight, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import {useState} from "react";
import axios from "axios";
import {auth} from "../firebase";
import CardOffer from "../components/CardOffer";
import {toggleFavoriteAdded} from "../store/statesLoadSlice";
import {useDispatch, useSelector} from "react-redux";

const FavoriteScreen = ({ navigation }) => {

    const [favorites, setFavorites] = useState("");
    const dispatch = useDispatch()
    const favoriteAdded = useSelector((state) => state.statesLoad.favoriteAdded)

    if(favoriteAdded){
        axios.get('http://192.168.1.24:3000/api/favorite/' + auth.currentUser.uid +'/liked').then((response) => {
            setFavorites(response.data)
        })
        dispatch(toggleFavoriteAdded())
    }

    const RecentlyItem = ({ item }) => {
        return (
           <>
               <CardOffer item={item} navigation={navigation}/>
               <TouchableOpacity onPress={() => {}}>
                   <Text>Supprimer de mes favoris</Text>
               </TouchableOpacity>
           </>
        );
    };


    return (
        <View>
            <FlatList
                style={styles.recentlyItemContainer}
                data={favorites}
                renderItem={({ item }) => <RecentlyItem item={item} />}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    recentlyItemContainer:{
        marginLeft:15,
        marginTop:20
    },
})

export default FavoriteScreen;