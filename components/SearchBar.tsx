import { icons } from '@/constants/icons';
import React, { RefObject } from 'react';
import { Image, TextInput, View } from 'react-native';

interface SearchBarProps {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  ref?: RefObject<TextInput | null>;
}

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
  ref,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        ref={ref}
        onPress={onPress}
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white text-xl"
      />
    </View>
  );
};

export default SearchBar;
