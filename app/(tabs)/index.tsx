import MovieCard from '@/components/MovieCard';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';
import useFetch from '@/services/userFetch';
import { Link, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function Index() {
  const router = useRouter();

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

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {loading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error || trendingError ? (
          <Text>Erreur : {error?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <Link href="/(tabs)/search">
              <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-6">
                <Image
                  source={icons.search}
                  className="size-5"
                  resizeMode="contain"
                  tintColor="#ab8bff"
                />
                <Text className="text-[#ab8bff] flex-1 ml-2 text-xl ">
                  Rechercher
                </Text>
              </View>
            </Link>
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-2xl font-bold mt-5 mb-3 text-white">
                  A l'affiche
                </Text>
                <FlatList
                  data={trendingMovies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </View>
            )}
            <>
              <Text className="text-2xl font-bold mt-5 mb-3 text-white">
                Les plus récents
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                  gap: 20,
                  paddingRight: 5,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
