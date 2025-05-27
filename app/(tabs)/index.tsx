import MovieCard from '@/components/MovieCard';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';
import useFetch from '@/services/userFetch';
import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

export default function Index() {
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: '' }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const isLoading = loading || trendingLoading;
  const hasError = error || trendingError;

  const renderHeader = () => (
    <View className="px-5 pb-4">
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <Link href="/(tabs)/search">
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-6">
          <Image
            source={icons.search}
            className="size-5"
            resizeMode="contain"
            tintColor="#ab8bff"
          />
          <Text className="text-[#ab8bff] flex-1 ml-2 text-xl">Rechercher</Text>
        </View>
      </Link>

      {trendingMovies && (
        <View className="mt-10">
          <Text className="text-2xl font-bold mt-5 mb-3 text-white">
            À l'affiche
          </Text>
          <FlatList
            data={trendingMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.movie_id.toString()}
            ItemSeparatorComponent={() => <View className="w-4" />}
            renderItem={({ item, index }) => (
              <TrendingCard movie={item} index={index} />
            )}
          />
        </View>
      )}

      <Text className="text-2xl font-bold mt-10 mb-3 text-white">
        Les plus récents
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#ab8bff" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white">
          Erreur : {error?.message || trendingError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{ paddingBottom: 80 }}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          marginBottom: 10,
          gap: 20,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => <MovieCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
