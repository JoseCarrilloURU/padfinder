import React, { useEffect, useState } from 'react';
import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  Canvas,
  Rect,
  RoundedRect,
  LinearGradient,
  RadialGradient,
  vec,
} from '@shopify/react-native-skia';
import IconsBG from '@/components/iconsBG';
import { MotiView, MotiImage, MotiText, ScrollView } from 'moti';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { router, SplashScreen } from 'expo-router';
import FooterWaves from '@/components/footerWaves';
import AnimatedButton from '@/components/AnimatedButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { playSound } from '@/components/soundUtils';
import { BlurView } from 'expo-blur';
import Header from '@/components/header';
import { fetchWrapper, FetchResponse } from '../services/wrapper';
import { BASE_URL } from '../constants';
import { useAuth } from '../context/auth/authContext';
import { useChat } from '../context/chat/chatContext';

interface Partner {
  id: number;
  chat_id: string;
  name: string;
  age: number;
  gender: string;
  lastMessage: string;
  imageUrl: string;
}

export interface User {
  _id: string;
  username: string;
  person_id: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    genre: {
      _id: string;
      description: string;
      __v: number;
    };
    age: number;
    experience: number;
    __v: number;
  };
  status: boolean;
  __v: number;
}

export interface ResponseChat {
  _id: string;
  users: User[];
  name: string;
  __v: number;
  lastMessage: {
    type_message: string;
    description?: string;
  };
}

export default function Socials() {
  const [chats, setChats] = useState<Partner[]>([]);
  const { user, token } = useAuth();
  const { setChatId, setChatInfo } = useChat();

  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = '#fff';
  const color2 = '#cfb';

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const handleChatPress = (chat_id: string, name: string, url: string) => {
    console.log('Chat Pressed', chat_id);
    console.log('Usuario actualmente Logueado', user?.id);

    setChatId(chat_id);
    setChatInfo({ name, url });
    router.push('/chat');
  };

  useEffect(() => {
    const fetchChats = async () => {
      const response: FetchResponse<ResponseChat[]> = await fetchWrapper(
        `${BASE_URL}chat?user_id=${user?.id}`,
        {
          token: token || '',
        },
      );
      if (response.error) {
        console.error(response.error);
      } else {
        const mappedChats =
          response.data?.map((chat, index) => ({
            id: index,
            chat_id: chat._id,
            name: chat.users[0].username,
            age: chat.users[0].person_id.age ?? 22,
            gender: chat.users[0].person_id.genre.description,
            lastMessage: chat.lastMessage.description || 'sin mensajes',
            imageUrl: `${BASE_URL}user/image?id=${chat.users[0]._id}`,
          })) || [];
        setChats(mappedChats);
      }
    };

    fetchChats();
  }, [user]);

  const getHeaders = () => {
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const Partner: React.FC<Partner> = ({
    id,
    chat_id,
    name,
    age,
    gender,
    lastMessage,
    imageUrl,
  }) => (
    <View style={socialstyles.itemContainer}>
      <Pressable onPress={() => handleChatPress(chat_id, name, imageUrl)}>
        <BlurView
          intensity={95}
          tint="prominent"
          style={socialstyles.blurcard}
        />
        <Image
          source={{ uri: imageUrl }}
          style={socialstyles.itemimage}
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={socialstyles.itemdata}
        >
          {name}, {age}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={socialstyles.itemmessage}
        >
          {lastMessage}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: appHeight,
        }}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={appHeight}
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, appHeight)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      <View style={{ position: 'absolute', top: 120 }}>
        <IconsBG />
      </View>
      <Header originTab={0} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('@/assets/images/app/chattitle.png')}
          style={socialstyles.chattitle}
        />
        <View style={socialstyles.listcontainer}>
          <FlatList
            data={chats}
            renderItem={({ item }) => (
              <Partner
                chat_id={item.chat_id}
                id={item.id}
                name={item.name}
                age={item.age}
                gender={item.gender}
                lastMessage={item.lastMessage}
                imageUrl={item.imageUrl}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const socialstyles = StyleSheet.create({
  chattitle: {
    position: 'relative',
    top: 117,
    left: 20,
    width: 200,
    height: 35,
  },
  itemdata: {
    position: 'absolute',
    fontFamily: 'BlackFont',
    textShadowRadius: 2,
    fontSize: 20,
    top: 20,
    left: 108,
    width: 240,
  },
  itemmessage: {
    position: 'absolute',
    fontFamily: 'BaseItalic',
    color: '#222',
    fontSize: 15,
    top: 52,
    left: 108,
    width: 240,
  },
  itemimage: {
    position: 'absolute',
    width: 75,
    height: 75,
    top: 9.5,
    left: 15,
    borderRadius: 40,
    borderColor: '#fff',
    borderWidth: 2,
    boxShadow: '3 3 12px rgba(0,0,0,0.3)',
  },
  blurcard: {
    width: 360,
    left: 4,
    height: 95,
    borderRadius: 30,
    overflow: 'hidden',
    boxShadow: '2 2 15px rgba(0,0,0,0.3)',
  },
  itemContainer: {
    width: 400,
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 12,
  },
  listcontainer: {
    marginTop: 120,
    height: 'auto',
    marginBottom: 75,
  },
});
