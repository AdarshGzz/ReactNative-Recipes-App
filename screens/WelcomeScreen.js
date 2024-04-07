import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue,withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const navigation = useNavigation()

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;

        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300);

        setTimeout(()=> navigation.navigate('Home'),2500)
    }, []);

    // const ring1Style = useAnimatedStyle(() => {return{padding: withSpring(ring1padding.value)}});
    // const ring2Style = useAnimatedStyle(() => {return{padding: withSpring(ring2padding.value)}});


    return (
        <View className="flex-1 justify-center items-center bg-amber-500">
            <StatusBar className='light'/>
            <Animated.View className={`bg-white/20 rounded-full   `} style={{padding:ring1padding}}>
                <Animated.View className={` bg-white/20 rounded-full  `} style={{padding:ring1padding }}>
                    <Image style={{width:hp(20),height:hp(20)}} source={require('../assets/images/welcome.png')}/>
                </Animated.View>
            </Animated.View>

            <View className={`flex items-center space-y-2`}>
                <Text style={{fontSize:hp(7)}} className=" text-white font-semibold tracking-widest">
                    Foody
                </Text>
                <Text style={{fontSize:hp(2)}} className=" text-white font-medium tracking-widest">
                    Food is always right
                </Text>
            </View>
        </View>
    );
};

export default WelcomeScreen;
