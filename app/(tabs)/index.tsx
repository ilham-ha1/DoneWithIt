import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(()=> fetchMovies( {query : ''}))

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.background} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image source={icons.logo} style={styles.logo} />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.activityIndicator}
          />) : moviesError ? (
            <Text className="text-lg text-white font-bold mt-5 mb-3">Error: ${moviesError?.message}</Text>
        ) : (
            <View style={styles.searchView}>
              <SearchBar
                  placeholder="Search for a movie"
                  onPress={() => router.push("/search")}
                  onChangeText={text => ''}
                  value=''
                />
                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                <FlatList
                  data={movies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <MovieCard {...item} />}
                  numColumns={3}
                  columnWrapperStyle={styles.row}
                  className="mt-2 pb-3"
                  scrollEnabled={false}
                />
            </View>

        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 10,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#030014",
  },
  background: {
    position: "absolute",
    width: "100%",
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  scrollContent: {
    minHeight: "100%",
    paddingBottom: 10,
  },
  logo: {
    width: 48,
    height: 40,
    marginTop: 80,
    marginBottom: 20,
    alignSelf: "center",
  },
  searchView:{
    flex: 1,
    marginTop: 5,
  },
  row: {
    justifyContent: 'flex-start',
    gap: 20,
    paddingRight: 5,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  }
});
