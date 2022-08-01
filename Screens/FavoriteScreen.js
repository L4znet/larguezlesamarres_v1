import {Text, View, Button, TouchableHighlight, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import {useState, useEffect} from "react";
import axios from "axios";
import {auth} from "../firebase";
import CardOffer from "../components/CardOffer";
import {toggleFavoriteAdded} from "../store/statesLoadSlice";
import {useDispatch, useSelector} from "react-redux";
import useFetch from "react-fetch-hook";
import Toast from "react-native-toast-message";

const FavoriteScreen = ({ navigation }) => {

    const [favorites, setFavorites] = useState("");
    const dispatch = useDispatch()
    const favoriteAdded = useSelector((state) => state.statesLoad.favoriteAdded)



    const getFavorite = () => {
        axios.get('http://192.168.1.24:3000/api/favorite/' + auth.currentUser.uid +'/liked').then((response) => {
            setFavorites(response.data)
        })
    }

    const messageToast = (type, title, message) => {
        Toast.show({
            type: type,
            text1: title,
            text2: message,
        });

    }

    if(favoriteAdded){
        getFavorite()
        dispatch(toggleFavoriteAdded())
    }
    const { isLoading, data, error } = useFetch(
        "http://192.168.1.24:3000/api/favorite/" + auth.currentUser.uid +"/liked"
    );
    useEffect(() => {
        setFavorites(data)
    }, [data])

    const FlatList_Header = () => {
        return (
            <Text style={{
                fontWeight: '800',
                fontSize: 25,
                color: '#000',
                marginVertical:40
            }}>Vos favoris</Text>
        );
    }

    const RecentlyItem = ({ item }) => {


        const unlikePost = () => {
            axios.post('http://192.168.1.24:3000/api/favorite/unlike', {
                userId:auth.currentUser.uid,
                offerId:item.key
            })
            dispatch(toggleFavoriteAdded())
            messageToast("success", "C'est fait !", "Cette offre a bien été retirée de vos favoris")
            getFavorite()
        }



        return (
           <View style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
               <CardOffer item={item} navigation={navigation}/>
               <TouchableOpacity style={styles.unlikeButton} onPress={() => unlikePost()}>
                   <Text style={styles.unlikeButtonLabel}>Retirer de mes favoris</Text>
               </TouchableOpacity>
           </View>
        );
    };


    return (
        <View>
            <FlatList
                style={styles.recentlyItemContainer}
                data={favorites}
                ListHeaderComponent={FlatList_Header}
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
    },
    unlikeButton:{
        width:250,
        height:60,
        backgroundColor:"#d53b3b",
        marginBottom:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        marginRight:15,
    },
    unlikeButtonLabel:{
        color:"#FFF",
        fontSize:20,
    }
})

export default FavoriteScreen;