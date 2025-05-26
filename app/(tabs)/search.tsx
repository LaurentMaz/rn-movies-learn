import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/userFetch';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useFocusEffect(
    useCallback(() => {
      // Quand l'écran devient actif
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => {
        // Quand l'écran est quitté
        setSearchQuery('');
      };
    }, []),
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
        if (movies?.length > 0 && movies?.[0])
          await updateSearchCount(searchQuery, movies[0]);
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                ref={inputRef}
                placeholder="Rechercher"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Erreur : {error.message}
              </Text>
            )}
            <View className="h-10">
              {!loading &&
                !error &&
                searchQuery.trim() &&
                movies?.length > 0 && (
                  <Text className="text-xl text-white font-bold">
                    Résulats pour :{' '}
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                )}
            </View>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? 'Aucun film trouvé'
                  : 'Recherchez un film'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
export default Search;
