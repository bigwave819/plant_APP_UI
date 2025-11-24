import { 
  Alert, 
  FlatList, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Image, 
  TouchableOpacity 
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Plant {
  _id: string;
  title: string;
  imageUrl: string;
}

interface FilterItem {
  id: number;
  title: string;
}

const Search = () => {

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [data, setData] = useState<Plant[]>([]);

  const sortingData: FilterItem[] = [
    { id: 1, title: 'Aloe' },
    { id: 2, title: 'Cactus' },
    { id: 3, title: 'Palm' },
  ];

  const fetchPlant = async () => {
    try {
      const response = await fetch("https://plant-api-0yg7.onrender.com/api/plants");

      if (!response.ok) {
        Alert.alert("Failed to fetch plants");
        return;
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Failed due:", error);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, []);

  return (
    <View className="bg-[#F8FAFC] w-full flex-1 pb-5 px-4">

      {/* 🔍 Search Bar */}
      <View className="mb-4 relative py-3 mt-7">
        <Ionicons
          name="search-outline"
          size={22}
          color="gray"
          style={{ position: 'absolute', top: 22, left: 14 }}
        />
        <TextInput
          className="bg-white border border-gray-300 rounded-2xl pl-12 py-3 shadow-sm"
          value={search}
          onChangeText={setSearch}
          placeholder="Search plants..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* 🔹 Filter Chips */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sortingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveFilter(item.id)}
            className={`
              mr-3 px-4 rounded-lg h-10 mb-3 fle-1 justify-center
              ${activeFilter === item.id 
                ? "bg-green-600" 
                : "bg-gray-100 border border-gray-300"
              }
            `}
          >
            <Text
              className={`
                font-medium  text-center items-center justify-center
                ${activeFilter === item.id ? "text-white" : "text-green-800"}
              `}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* 🌿 Plant Grid */}
      <FlatList
        className="mt-6"
        data={data}
        numColumns={2}
        columnWrapperClassName="justify-between"
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => (
          <View className="bg-white border border-gray-200 shadow-sm rounded-2xl mb-5 p-3 w-[48%]">
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-44 rounded-xl mb-3"
              style={{ resizeMode: "contain" }}
            />
            <Text className="font-semibold text-gray-800 text-lg">
              {item.title}
            </Text>
          </View>
        )}
      />

    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
