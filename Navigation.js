import React, {useState, useEffect } from "react";
import NavigationLeft from "./components/NavigationLeft";
import {View} from "react-native";
import NavigationRight from "./components/NavigationRight";
import {onAuthStateChanged} from "@firebase/auth";
import {auth, db} from "./firebase";
import {doc, getDoc} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {toggleLeftHandMode} from "./store/settingsSlice";

const Navigation = ({navigation}) => {
    const dispatch = useDispatch()
    const [isUserLogged, setUserLogged] = useState(false);
    const ownerTenantState = useSelector((state) => state.settings.ownerTenantState)
    const leftHandModeState = useSelector((state) => state.settings.leftHandMode)


    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUserLogged(true)
        } else {
            setUserLogged(false)
        }
    });

    return (
        <>
            {leftHandModeState === false &&
                <NavigationRight navigation={navigation} isUserLogged={isUserLogged}/>
            }
            {leftHandModeState === true &&
                <NavigationLeft navigation={navigation} isUserLogged={isUserLogged}/>
            }

        </>
    )
};


export default Navigation