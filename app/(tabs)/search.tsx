import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchPopularMovies } from '@/services/api';
import useFetch from '@/services/userFetch';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchPopularMovies({ query: '' }), false);

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
      />
    </View>
  );
};
export default Search;
