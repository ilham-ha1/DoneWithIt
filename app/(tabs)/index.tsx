import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, View, StyleSheet } from "react-native";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.background} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image source={icons.logo} style={styles.logo} />
        <View style={styles.searchView}>
          <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
