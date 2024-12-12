import React, { useEffect, useState, useRef } from 'react';
import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  FlatList,
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
import { MotiView, MotiImage, MotiText } from 'moti';
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
import { backdropImageMap } from '@/components/imageMaps';
import { useChat } from './context/chat/chatContext';
import { useAuth } from './context/auth/authContext';
import { WS_BASE_URL, BASE_URL } from './constants';
import useConnectSocket from './customs/useConnectSocket';
import { fetchWrapper } from './services/wrapper';
import * as ImagePicker from 'expo-image-picker';

interface Message {
  id: number;
  sender: number;
  type: string;
  message: string;
  url: string | undefined;
}

let cont = 0;

export default function Chat() {
  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = '#fff';
  const color2 = '#bcf';
  const color3 = '#fcb'; // Cambiar por rosa

  const colors = useDerivedValue(() => {
    return [color1, color2];
  }, []);

  const [inputHeight, setInputHeight] = useState(50);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isTextInputFocused, setTextInputFocused] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const { token, user } = useAuth();
  const { chatId } = useChat();
  const socket = useConnectSocket(WS_BASE_URL, user?.id ?? '');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetchWrapper(
        `${BASE_URL}message?chat_id=${chatId}`,
        {
          method: 'GET',
          token: token ?? '',
        },
      );
      const fetchedMessages = (response.data as any[]).map((msg: any) => ({
        id: cont++,
        sender: msg.sender_user._id === user?.id ? 1 : 2,
        type: msg.type_message,
        message: msg.description,
        url: msg.file_id
          ? `${BASE_URL}${msg.url.replace('/api/', '')}`
          : undefined,
      }));
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [chatId, token, user?.id]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinChat', { chatId });

      socket.on('chatMessage', (message) => {
        const newMessage = {
          id: cont++,
          sender: message.senderId === user?.id ? 1 : 2,
          type: message.file?.type?.split('/')[0] || 'text',
          message: message.description,
          url: message?.file?.id
            ? `${BASE_URL}${message.file.url.replace('/api/', '')}`
            : undefined,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('chatMessage');
      };
    }
  }, [socket, chatId, user?.id]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [messages]);

  const handleImgButton = async () => {
    if (!chatId || !user?.id)
      return console.log('Error, es requerido el chatId y el userId');

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permiso requerido para acceder a la camara');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      const fileUri = selectedImage.uri;
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: selectedImage.fileName ?? 'photo',
        type: selectedImage.mimeType ?? 'image/jpeg',
      } as any);
      formData.append('description', '');
      formData.append('chatId', chatId);
      formData.append('senderId', user.id);
      try {
        await fetchWrapper(`${BASE_URL}message`, {
          method: 'POST',
          token: token ?? '',
          isFormData: true,
          body: formData,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleTextInputChange = (text: string) => {
    setTextInputValue(text);
    setTextInputFocused(text.trim().length > 0);
  };

  const handleSendButton = async () => {
    if (!chatId || !user?.id)
      return console.log('Error, es requerido el chatId y el userId');

    const formData = new FormData();
    formData.append('description', textInputValue);
    formData.append('chatId', chatId);
    formData.append('senderId', user.id);

    try {
      await fetchWrapper(`${BASE_URL}message`, {
        method: 'POST',
        token: token ?? '',
        isFormData: true,
        body: formData,
      });
      setTextInputValue('');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const getHeaders = () => {
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const Message: React.FC<Message> = ({ sender, type, message, url }) => (
    <View
      style={[
        chatstyles.itemContainer,
        sender === 1 ? { right: -160 } : { right: 0 },
      ]}
    >
      <View style={chatstyles.messagecontainer}>
        {!url ? (
          <Text style={chatstyles.message}>{message}</Text>
        ) : (
          <Image
            source={{ uri: url, headers: getHeaders() }}
            style={chatstyles.messageImage}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={backdropImageMap[3]}
        style={{
          position: 'absolute',
          width: 44,
          height: 44,
          top: 33.5,
          left: 174,
          zIndex: 106,
          borderRadius: 50,
          boxShadow: '0 0 6px rgba(0,0,0,0.2)', // Da error pero funciona igual
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          position: 'absolute',
          fontFamily: 'BlackFont',
          textAlign: 'center',
          borderWidth: 0,
          width: 150,
          left: 120,
          top: 80,
          zIndex: 106,
        }}
      >
        Mariooo
      </Text>
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
      <Header originTab={1} />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 90, marginBottom: 88 }}
      >
        <View style={chatstyles.listcontainer}>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Message
                id={item.id}
                sender={item.sender}
                type={item.type}
                url={item.url}
                message={item.message}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <AnimatedButton
        onPress={handleImgButton}
        disabled={false}
        source={require('@/assets/images/app/ImgButton.png')}
        style={chatstyles.imgbutton}
      />
      <ScrollView
        style={[chatstyles.textinputcontainer, { height: inputHeight }]}
        contentContainerStyle={{ paddingBottom: 22 }}
        onContentSizeChange={(contentHeight) => {
          setScrollOffset(contentHeight);
        }}
      >
        <TextInput
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#999"
          style={[chatstyles.textinput, { height: inputHeight - 6 }]}
          keyboardType="url"
          multiline={true}
          scrollEnabled={true}
          numberOfLines={10}
          maxLength={500}
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height + 10);
          }}
          onChangeText={handleTextInputChange}
          value={textInputValue}
        />
      </ScrollView>
      <AnimatedButton
        onPress={handleSendButton}
        disabled={false}
        source={require('@/assets/images/app/SendButtonShade.png')}
        style={chatstyles.sendbutton}
      />
    </View>
  );
}

const chatstyles = StyleSheet.create({
  message: {
    fontFamily: 'BaseFont',
    fontSize: 17,
    color: '#000',
    padding: 10,
  },
  messagecontainer: {
    maxWidth: '50%',
    borderRadius: 15,
    backgroundColor: 'white',
    marginVertical: 0,
    boxShadow: '4 4 15px rgba(0,0,0,0.2)',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  itemContainer: {
    width: 400,
    marginLeft: 12,
    marginTop: 5,
    marginBottom: 12,
  },
  listcontainer: {
    marginTop: 20,
  },
  imgbutton: {
    position: 'absolute',
    top: 756,
    left: 257,
    width: 45,
    height: 45,
  },
  sendbutton: {
    position: 'absolute',
    top: 745,
    left: 315,
    width: 70,
    height: 70,
  },
  textinput: {
    position: 'absolute',
    fontFamily: 'BoldFont',
    fontSize: 17,
    left: 5,
    top: 1,
    width: 240,
    height: 'auto',
    zIndex: 5,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  textinputcontainer: {
    position: 'absolute',
    width: 295,
    bottom: 22,
    left: 12,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: 'transparent',
    backgroundColor: 'white',
    boxShadow: '2 2 15px rgba(0,0,0,0.5)',
  },
});
