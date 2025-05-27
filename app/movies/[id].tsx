import MovieInfo from '@/components/MovieInfo';
import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/userFetch';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));
  return (
    <>
      <StatusBar hidden={true} />
      <View className="bg-primary flex-1">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
          }}
        >
          <View>
            <Image
              className="w-full h-[550px]"
              resizeMode="stretch"
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
            />
          </View>
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {movie?.release_date?.split('-')[0]}
              </Text>
              <Text className="text-light-200 text-sm">
                {movie?.runtime}min
              </Text>
            </View>
            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold text-sm">
                {Math.round(movie?.vote_average ?? 0) / 10}
              </Text>
              <Text className="text-light-200 text-sm">
                ({movie?.vote_count} votes)
              </Text>
            </View>
            <MovieInfo label="Résumé" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={
                movie?.genres.map((genre) => genre.name).join('-') || 'N/A'
              }
            />
            <View className="flex flex-row w-1/2 justify-between">
              <MovieInfo
                label="Budget"
                value={
                  movie?.budget
                    ? `$${movie?.budget / 1000000} millions`
                    : 'Non renseigné'
                }
              />
              <MovieInfo
                label="Revenus"
                value={
                  movie?.revenue
                    ? `${Math.round(movie?.revenue) / 1000000}$`
                    : 'Non renseigné'
                }
              />
            </View>
            <MovieInfo
              label="Compagnie de production"
              value={
                movie?.production_companies.map((c) => c.name).join('-') ||
                'N/A'
              }
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
          onPress={router.back}
        >
          <Image
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor="#fff"
            source={icons.arrow}
          />
          <Text className="text-white font-semibold text-base">Retour</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default MovieDetails;
