import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useMovieStore } from '@/store/useMovieStore';
import { icons } from '@/constants/icons';

const SavedMovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string;
}) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <View className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          contentFit="cover"
        />

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </View>
    </Link>
  );
};

const Saved = () => {
    const { savedMovies } = useMovieStore();

    if (savedMovies.length === 0) {
        return (
            <View className="flex-1 bg-primary flex items-center justify-center">
                <Image
                    source={icons.save}
                    className="w-16 h-16 mb-4"
                    tintColor="#A8B5DB"
                />
                <Text className="text-light-300 text-base">
                    No saved movies yet
                </Text>
                <Text className="text-light-400 text-sm mt-2">
                    Tap save icon to add movies here
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-primary">
            <View className="px-5 pt-5 pb-3">
                <Text className="text-white text-2xl font-bold">Saved Movies</Text>
                <Text className="text-light-300 text-sm mt-1">
                    {savedMovies.length} {savedMovies.length === 1 ? 'movie' : 'movies'} saved
                </Text>
            </View>

            <FlatList
                data={savedMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <SavedMovieCard
                    id={item.id}
                    poster_path={item.poster_path}
                    title={item.title}
                    vote_average={item.vote_average}
                    release_date={item.release_date}
                  />
                )}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 16,
                    marginHorizontal: 20,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
}

export default Saved
