import { images } from '@/constants/images';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';

type TabIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-[50px] overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="flex size-full justify-center items-center rounded-full overflow-hidden min-h-16 mt-4">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
};
export default TabIcon;
