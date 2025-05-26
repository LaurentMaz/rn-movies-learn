import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
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

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text>Erreur : {error?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Rechercher"             
            /> */}
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

            <>
              <Text className="text-lg font-bold mt-5 mb-3 text-white">
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
