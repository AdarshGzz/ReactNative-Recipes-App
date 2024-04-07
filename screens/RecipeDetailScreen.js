import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { CachedImage } from '../helpers/Image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square2StackIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline'
import { HeartIcon, UsersIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loding from '../components/Loding';
import YoutubeIframe from 'react-native-youtube-iframe'
import Animated, { useSharedValue, withSpring, useAnimatedStyle,FadeIn } from 'react-native-reanimated';


export const RecipeDetailScreen = ({route}) => {

  let item = route.params?.data;
  const[isFavourite,setIsFavourite] = useState(false)
  const[meal,setMeal]= useState(null)
  const[loading,setLoading] = useState(true)

  const navigation = useNavigation();

  useEffect(()=>{
      getMealData(item.idMeal);
  },[])

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            // console.log(response.data)
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (error) {
            console.log("error ", error.message)
        }
    }

    const ingredientIndexes = (meal)=>{
        if(!meal){
            return[]
        }
        let indexes = [];
        for(let i=1;i<=20;i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        return indexes;

    }

    const getYoutubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    };

  return (
    <ScrollView
        className = "bg-white flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:30}}
    >
        <StatusBar style='light'/>
        {/* Recipe Image */}
        <View className={" flex flex-row justify-center"}>
              <CachedImage uri={item.strMealThumb} sharedTransitionTag={item.strMeal} style={{ width: wp(98), height: hp(50), borderRadius: wp(9), borderBottomLeftRadius: 40, borderBottomRightRadius: 40,marginTop:4 }}/>
        </View>
        {/* back button */}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
            <TouchableOpacity onPress={()=>navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={'#fbbf24'}/>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite?"red":"gray"}/>
            </TouchableOpacity>
        </Animated.View>
        {
              loading ? (<Loding size={'Large'} className="mt-16" />) :(
                  <View className="px-4 flex justify-between space-y-4 pt-8">
                      <View className="space-y-2">
                          <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutal-700">
                              {meal?.strMeal}
                          </Text>
                          <Text style={{ fontSize: hp(2) }} className=" font-medium  flex-1 text-neutal-500">
                              {meal?.strArea}
                          </Text>
                      </View>
                      <View className="flex flex-row justify-around">
                          <View className="flex rounded-full bg-amber-300 p-2">
                              <View
                                  style={{ height: hp(6.5), width: hp(6.5) }}
                                  className="bg-white rounded-full flex items-center justify-center"
                              >
                                  <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />

                              </View>
                              <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                    35
                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                    Mins
                                </Text>
                              </View>
                          </View>
                          <View className="flex rounded-full bg-amber-300 p-2">
                              <View
                                  style={{ height: hp(6.5), width: hp(6.5) }}
                                  className="bg-white rounded-full flex items-center justify-center"
                              >
                                  <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />

                              </View>
                              <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                    03
                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                    serving
                                </Text>
                              </View>
                          </View>
                          <View className="flex rounded-full bg-amber-300 p-2">
                              <View
                                  style={{ height: hp(6.5), width: hp(6.5) }}
                                  className="bg-white rounded-full flex items-center justify-center"
                              >
                                  <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />

                              </View>
                              <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                    203
                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                    cal
                                </Text>
                              </View>
                          </View>
                          <View className="flex rounded-full bg-amber-300 p-2">
                              <View
                                  style={{ height: hp(6.5), width: hp(6.5) }}
                                  className="bg-white rounded-full flex items-center justify-center"
                              >
                                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />

                              </View>
                              <View className="flex items-center py-2 space-y-1">
                                <Text style={{fontSize:hp(2)}} className="font-bold text-neutral-700">
                                
                                </Text>
                                <Text style={{fontSize:hp(1.3)}} className="font-bold text-neutral-700">
                                    Easy
                                </Text>
                              </View>
                          </View>
                      </View>
                      {/* ingredients */}
                      <View className="space-y-4">
                          <Text style={{ fontSize:hp(1.5) }} className="font-bold flex-1 text-neutral-700">
                              Ingredients
                          </Text>
                          <View className="space-y-2 ml-3">
                            {
                                  ingredientIndexes(meal).map(i=>{
                                    return(
                                        <View key={i} className=" flex flex-row space-x-4">
                                            <View style={{height:hp(1.5),width:hp(1.5)}} className=" bg-amber-300 rounded-full" /> 
                                            <Text style={{fontSize:hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
                                            <Text style={{fontSize:hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
                                        </View>
                                    )
                                  })
                            }
                          </View>
                      </View>
                      {/* instructions */}
                      <View className="space-y-4">
                          <Text style={{ fontSize: hp(1.5) }} className="font-bold flex-1 text-neutral-700">
                              Instructions
                          </Text>
                          <Text style={{fontSize:hp(1.6)}} className={'text-neutral-700'}>
                            {meal?.strInstructions}
                          </Text>
                      </View>
                      {/* recipe video */}
                      {
                        meal.strYoutube &&(
                            <View className={'space-y-4'}>
                                  <Text style={{ fontSize: hp(1.5) }} className="font-bold flex-1 text-neutral-700">
                                      Recipe Video
                                  </Text>
                                  <View>
                                        <YoutubeIframe
                                            videoId={getYoutubeVideoId(meal.strYoutube)}
                                            height={hp(30)}
                                        />
                                  </View>
                            </View>
                        )
                      }
                  </View>
              )
        }
        {/* misc */}
        
    </ScrollView>
  )
}
