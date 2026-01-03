import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average?: number;
}

const MovieCard = ({ id, title, poster_path, vote_average }: MovieCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/movies/${id}`)}
    >
      <Image
        source={{
          uri: poster_path
            ? "https://image.tmdb.org/t/p/w500" + poster_path
            : "https://via.placeholder.com/500x750?text=No+Image",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      {vote_average && (
        <Text style={styles.rating}>⭐ {vote_average.toFixed(1)}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    marginRight: 10,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
  },
  rating: {
    color: "#ffd700",
    fontSize: 11,
    marginTop: 2,
  },
});

export default MovieCard;
