import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Catagories from '../components/Catagories';
import axios from 'axios'
import Recipies from '../components/Recipies';

const HomeScreen = () => {

  const[activeCategory,setActiveCategory] = useState('Beef')
  const[categories,setCategories] = useState([])
  const[meals,setMeals] = useState([])

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory=(category)=>{
    getRecipes(category)
    setActiveCategory(category)
    setMeals([]);
  }

  const getCategories = async() =>{
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      // console.log(response.data)
      if(response && response.data){
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log("error ",err.message)
    }
  }
  const getRecipes = async(category="Beef") =>{
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      // console.log(response.data)
      if(response && response.data){
       setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("error ",err.message)
    }
  }

  return (
     <View className="flex-1 bg-white">
      <StatusBar style="dark"/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../assets/images/avtar.png')} style={{height:hp(5),width:hp(5.5)}}/>
          <BellIcon size={hp(4)} color={'gray'}/>
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize:hp(1.7)}} className={'text-neutral-600'}>Hello, Adarsh!</Text>
          <View>
            <Text style={{fontSize:hp(3.8)}} className={'font-semibold text-neutral-600'}>Make your own food,</Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className={'font-semibold text-neutral-600'}>Stay at <Text className=" text-amber-400">home</Text> </Text>
        </View>

        <View className={' mx-4 flex-row items-center rounded-full bg-black bg-black/5 p-[6px]'}>
          <TextInput
             placeholder='Search for Recipe'
             placeholderTextColor={'gray'}
             style={{fontSize:hp(1.7)}}
             className='flex-1 text-base mb-1 pl-3 tracking-wider'
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'}/>
          </View>
        </View>
        {/* categories */}
       { categories.length>0 && <Catagories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}

       {/* recipies */}
      { meals.length>0 && <Recipies categories={categories} meals={meals}/>}
      </ScrollView>
     </View>
  )
}

export default HomeScreen

