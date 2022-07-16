import React, {useState } from "react";
import NavigationLeft from "./components/NavigationLeft";
import {useSelector} from "react-redux";
import {View} from "react-native";
import NavigationRight from "./components/NavigationRight";

const Navigation = ({navigation}) => {
    const leftHandMode = useSelector((state) => state.settings.leftHandMode)
    return (
     <>
         {leftHandMode === true &&
             <NavigationLeft navigation={navigation}/>
         }
         {leftHandMode === false &&
             <NavigationRight navigation={navigation}/>
         }
     </>
    )
};


export default Navigation