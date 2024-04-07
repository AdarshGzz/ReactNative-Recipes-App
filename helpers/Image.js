import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { useState, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';

export const CachedImage = (props) =>{
    const [cachedSource,setCachedSource] = useState(null);
    const {uri} = props;

    useEffect(()=>{
        const getCachedImage = async()=>{
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if(cachedImageData){
                    setCachedSource({uri:cachedImageData})
                }else{
                    const response = await fetch(uri)
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve)=>{
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob); 
                        reader.onload=()=>{
                            resolve(reader.result);
                        }
                    })

                    await AsyncStorage.setItem(uri,base64Data);
                    setCachedSource({uri:base64Data})
                    // const base6
                }
            } catch (error) {
                console.log('error', error)
            }
        }

        getCachedImage();
    },[])

    return (<Image source={cachedSource} {...props} />)
}

// https://expo.dev/artifacts/eas/unDxF8Cf2tVSnG3ScU19uM.apk