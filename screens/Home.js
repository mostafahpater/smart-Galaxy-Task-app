import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/FontAwesome5";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Logs } from "expo";

function Home() {
  Logs.enableExpoCliLogging();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setData(res.data.products));
  }, []);
  console.log("data")
  const [theme,setTheme]=useState('light')
  const ExploreData = ({ item, index }) => {
    return (
      <View key={index} style={[theme==='light'?styles.itemExpLight:styles.itemExpDark, { marginHorizontal:10 }]}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Image source={{ uri: item?.thumbnail }} style={styles.itemImg} />

          <MaterialCommunityIcons
            name="heart-circle"
            style={[theme === "light" ? styles.heartExpLight : styles.heartExpDark]}
            size={35}
          />
        </View>
        <Text
          style={[theme==='light'?styles.brandTxtLight:styles.brandTxtDark]}
        >
          {item?.brand}
        </Text>
        <Text
           style={[theme==='light'?styles.descriptionTxtLight:styles.descriptionTxtDark]}
         
          numberOfLines={1}
        >
          {item?.description}
        </Text>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <Text
             style={[theme==='light'?styles.priceTxtLight:styles.priceTxtDark]}
          >
            ${item?.price}
          </Text>
          <MaterialIcons name="add-circle"
           style={[theme==='light'?null:{backgroundColor:'#FFF',borderRadius:50}]}
          size={33} color="black" />
        </View>
      </View>
    );
  };
  const BestSellingData = ({ item, index }) => {
    return (
      <View
      key={index}
        style={[
          theme==='light'?styles.itemExpLight:styles.itemExpDark,
          {
            flexDirection: "row-reverse",
            width: Dimensions.get("window").width - 40,
            marginHorizontal: 15,
          },
        ]}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            source={{ uri: item?.thumbnail }}
            style={{ height: 80, width: 80, borderRadius: 10 }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text
           style={[theme==='light'?styles.brandTxtLight:styles.brandTxtDark]}
          >
            {item?.brand}
          </Text>
          <Text
                style={[theme==='light'?styles.descriptionTxtLight:styles.descriptionTxtDark]}
            numberOfLines={1}
          >
            {item?.description}
          </Text>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 10,
            }}
          >
            <Text
             style={[theme==='light'?styles.priceTxtLight:styles.priceTxtDark]}
            >
              ${item?.price}
            </Text>
            <MaterialCommunityIcons
               style={[theme==='light'?styles.arrowsellingLight:styles.arrowsellingDark]}
              name="arrow-right"
              size={25}
              color="#FFF"
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={[theme==='light'?styles.containerLight:styles.containerDark]}>
      <StatusBar animated={true} />
      <View style={styles.nav}>
        <Ionicons
          name="user-alt"
          style={[theme==='light'?styles.userIconLight:styles.userIconDark]}
          size={16}
        />
    {theme==='light'?<Ionicons name="toggle-on"
    onPress={()=>setTheme('dark')}
    style={{paddingTop:5}}
    size={30} color="black" />:
    <Ionicons name="toggle-off"
    onPress={()=>setTheme('light')}
    style={{backgroundColor:'#222233',borderRadius:10,paddingTop:5}} size={30} color="#FFF" />}
          <Ionicons
          name="bars"
          style={[theme==='light'?styles.barsIconLight:styles.barsIconDark]}
          size={25}
        />
      </View>
      <View style={styles.searchRow}>
        <Ionicons
          name="shopping-cart"
          style={[theme==='light'?styles.cartIconLight:styles.cartIconDark]}
          size={25}
          color="#000"
        />
        <Searchbar
          placeholder="Search"
          iconColor={theme==='light'?'black':'#b2b2b2'} 
         
          style={[theme==='dark'?styles.searchBarDark:styles.searchBarLight]}
          placeholderTextColor="#b2b2b2"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={theme==='light'?styles.itemHeadLight:styles.itemHeadDark}>Explore</Text>
       
          <FlatList data={data} renderItem={ExploreData} horizontal={true} />
       

        <View>
          <Text style={theme==='light'?styles.itemHeadLight:styles.itemHeadDark}>Best Selling</Text>
          
            <FlatList
              data={data.slice(1).slice(-5)}
              renderItem={BestSellingData}
              horizontal={true}
            />
      
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  /////// Light Mode
  containerLight: {
    backgroundColor: '#F5F6FA',
    padding: 15,
    height:Dimensions.get('window').height
  },
  nav: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userIconLight:{
    color:'#FFF',
    backgroundColor: "#000",
    padding: 13,
    borderRadius: 7 
  },
  barsIconLight:{
    color:'#000',
    paddingTop: 8 
  },
  searchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartIconLight:{
    color:'#000',
    paddingLeft: 10,
    paddingTop: 10 
  },
  searchBarLight:{ 
    width: "85%",
    backgroundColor: "#fff"
  },
  itemHeadLight: {
    color:'#000',
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 1,
  },
  itemExpLight: {
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 20,
    borderRadius: 20,
    elevation: 12,
  },
  itemImg: {
    height: 180,
    width: 180,
    borderWidth: 1,
    borderRadius: 13,
  },
  heartExpLight: {
    position: "absolute",
    top: 8,
    left: 30,
    backgroundColor: "#FFF",
    borderRadius: 100,
    color: "#f63c41",
  },
  brandTxtLight:{
    fontSize: 18,
    color:'#000',
    fontWeight: "800",
    marginTop: 10,
    marginRight: 20,
  },
  descriptionTxtLight:{
    fontSize: 15,
    fontWeight: "500",
    color: "#b2b2b2",
    width: 200,
    marginRight: 20,
  },
  priceTxtLight:{
    fontSize:18,
    color:'#000'
  },
  arrowsellingLight:{
    backgroundColor: "#000", 
    padding: 4,
    borderRadius: 6
  },
  //////// Dark Mode
  containerDark:{
    backgroundColor: '#201A2D',
    padding: 15,
    height:Dimensions.get('window').height
  },
  userIconDark:{
    color:'#d6d6d6',
    backgroundColor: "#222233",
    padding: 13,
    borderRadius: 7 
  },
  barsIconDark:{
    color:'#d6d6d6',
     paddingTop: 8
     },
  cartIconDark:{
     color:'#d6d6d6',
  paddingLeft: 10,
   paddingTop: 10 
  },
   searchBarDark:{
     width: "85%",
    backgroundColor: "#000" ,
  },
  itemHeadDark:{
    color:'#d6d6d6',
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 1,
  },
  itemExpDark:{
    backgroundColor: "#222233",
    padding: 20,
    marginVertical: 20,
    borderRadius: 20,
    elevation: 12,
  },
  heartExpDark: {
    position: "absolute",
    top: 8,
    left: 30,
    backgroundColor: "#000",
    borderRadius: 100,
    color: "#fff",
  },
  brandTxtDark:{
    fontSize: 18,
    color:'#FFF',
    fontWeight: "800",
    marginTop: 10,
    marginRight: 20,
  },
  descriptionTxtDark:{
    fontSize: 15,
    fontWeight: "500",
    color: "#d6d6d6",
    width: 200,
    marginRight: 20,
  },
  priceTxtDark:{
    fontSize:18,
    color:'#d6d6d6'
  },
  arrowsellingDark:{
  backgroundColor: "#222233", 
  padding: 4,
   borderRadius: 6
  },
});
export default Home;
