import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import MovieCard from "@/components/MovieCard";
import { useMovieStore } from "@/store/useMovieStore";

const Saved = () => {
    const insets = useSafeAreaInsets();
    const { savedMovies } = useMovieStore();

    return (
        <View className="flex-1 bg-primary pt-10">
            <View className="px-5 mb-5">
                <View className="flex-row items-center justify-center mb-10">
                    <Image source={icons.logo} className="w-12 h-10" />
                </View>
                <Text className="text-white text-2xl font-bold">
                    Saved Movies
                </Text>
                <Text className="text-light-200 text-base mt-2">
                    {savedMovies.length} {savedMovies.length === 1 ? 'movie' : 'movies'} saved
                </Text>
            </View>

            <FlatList
                data={savedMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 16,
                    marginVertical: 16,
                    paddingHorizontal: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
                ListEmptyComponent={
                    <View className="mt-10 px-5">
                        <Text className="text-center text-gray-500">
                            No saved movies yet
                        </Text>
                        <Text className="text-center text-gray-500 mt-2">
                            Save movies to watch later
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

export default Saved;
