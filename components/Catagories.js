import React from 'react'
import { View ,Text, ScrollView, TouchableOpacity,Image} from 'react-native'
// import { categoryData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated ,{ FadeInDown } from 'react-native-reanimated';



const Catagories = ({ activeCategory, handleChangeCategory, categories }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4 pt-2"
        contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            categories.map((cat,index)=>{
                let isActive = cat.strCategory ==activeCategory
                let activeButtonClass = isActive?" bg-amber-400":' bg-black/10'

                return(
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleChangeCategory(cat.strCategory)}
                        className="flex items-center space-y-1"
                    >
                        <View className={"rounded-full p-[6px] overflow-hidden" + activeButtonClass}>
                            <Image
                                source={{ uri: cat.strCategoryThumb }}
                                style={{width:hp(6),height:hp(6)}}
                                className="rounded-full"
                            />
                        </View>
                        <Text
                            className="text-neutral-600"
                            style={{fontSize:hp(1.6)}}
                        >
                            {cat.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
  )
}

export default Catagories
