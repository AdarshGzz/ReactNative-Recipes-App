import React from 'react'
import { View,Text, Pressable, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
// import { mealData } from '../constants'
import Animated, { FadeInDown} from 'react-native-reanimated';
import Loding from './Loding';
import { CachedImage } from '../helpers/Image';
import { useNavigation } from '@react-navigation/native';

const Recipies = ({ categories, meals }) => {
    const navigation = useNavigation();    // console.log(mealData)
  return (
    <View className="mx-4 pt-3 space-y-3">
        <Text style={{fontSize:hp(3)}} className="font-semibold text-neutral-600">Recipes</Text>
            <View>{
                categories.length==0 || meals.length==0?(
                   <Loding size='large' className="mt-20"/>
                ):(
                  <MasonryList
                      data={meals}
                      keyExtractor={(item) => item.name}
                      numColumns={2}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item,i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                      onEndReachedThreshold={0.1}
                    //   refreshing={isLoadingNext}
                    //   onRefresh={() => refetch({ first: ITEM_CNT })}
                    //   onEndReached={() => loadNext(ITEM_CNT)}
                  />)}
            </View>    
    </View>
  )
}


const RecipeCard = ({item,index,navigation}) =>{
    let isEven = index%2==0;

    // console.log(item)

    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(20)}>
           <Pressable
                style={{ width: "100%", paddingLeft: isEven? 0:8,paddingRight: isEven?8:0 }}
                className={'flex justify-center mb-4 space-y-1'}
                onPress={()=>navigation.navigate('RecipeDetail',{data : item})}
           >
              {/* <Image source={{uri:item.strMealThumb}} style={{width:'100%',height:index%3==0?hp(25):hp(35),borderRadius:35}} className=" bg-black/5"/> */}
              <CachedImage 
                uri={item.strMealThumb} 
                style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }} 
                className=" bg-black/5" 
                sharedTransitionTag={item.strMeal}
              />
              <Text style={{fontSize:hp(1.5)}} className={' font-semibold ml-2 text-neutral-600'}>
                {
                    item.strMeal.length>20? item.strMeal.slice(0,20)+'...' :item.strMeal
                }
              </Text>
           </Pressable>
        </Animated.View>
    )
}


export default Recipies
