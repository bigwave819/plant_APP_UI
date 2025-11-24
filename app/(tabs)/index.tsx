import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Alert, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState<any[]>([]);

  const fetchPlant = async () => {
    try {
      const response = await fetch("https://plant-api-0yg7.onrender.com/api/plants");

      if (!response.ok) {
        Alert.alert("Failed to fetch the plants");
        return;
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Failed due: ", error);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View className="bg-white rounded-2xl p-3 mb-4 flex-1 mr-3 shadow-lg">
        <Image
          source={{
            uri:
              item.imageUrl ||
              "https://t3.ftcdn.net/jpg/15/34/03/58/360_F_1534035806_6gn57ou4V0dVZY6l30h6nEB5gWQRAP6v.jpg",
          }}
          className="w-full h-40 rounded-xl mb-3"
          style={{ resizeMode: "cover" }}
        />
        <Text className="text-lg font-bold text-gray-800 mb-1 text-center">{item.title || "Unknown Plant"}</Text>
        {/* <View className="flex-row justify-between items-center">
          <Text className="text-green-700 font-semibold text-base">{item.price} Frw</Text>
          <TouchableOpacity className="bg-green-700 w-12 h-12 rounded-full justify-center items-center shadow-md">
            <Text className="text-white text-lg font-bold text-center">+</Text>
          </TouchableOpacity>
        </View> */}
        <View className="mt-1 mb-1 w-full">
          <TouchableOpacity className="bg-green-600 p-3 rounded-xl">
            <Text className="text-center text-white">View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-white">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id || `item-${Math.random()}`}
        numColumns={2}
        columnWrapperClassName="justify-between"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        ListHeaderComponent={() => (
          <View className="px-4 mb-6 pt-4">
            {/** Welcome Text */}
            <View className="flex-row items-center">
              <View className="w-20 h-20 rounded-full overflow-hidden mb-3 shadow-md">
                <Image
                  source={{
                    uri: "https://t3.ftcdn.net/jpg/15/34/03/58/360_F_1534035806_6gn57ou4V0dVZY6l30h6nEB5gWQRAP6v.jpg",
                  }}
                  className="w-full h-full"
                  style={{ resizeMode: "cover" }}
                />
              </View>
              <View className="ml-3">
                <Text className="text-xl font-bold text-gray-700 mb-1 text-start">
                  Welcome {user?.name?.toUpperCase()}
                </Text>
                <Text className="text-gray-400 text-base mb-6 text-start">
                  Kicukiro, kigali
                </Text>
              </View>
              <View>
                {/* <Ionicons name="notifications-outlined" /> */}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Index;
