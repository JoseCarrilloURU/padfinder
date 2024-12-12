import React, { useEffect, useState } from 'react';
import {
  Pressable,
  TextInput,
  View,
  Image,
  Text,
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
import { BASE_URL, BASE_AUTH_URL, WS_BASE_URL } from './constants';
import { fetchWrapper, FetchResponse } from './services/wrapper';
import { useAuth } from './context/auth/authContext';
import useConnectSocket from './customs/useConnectSocket';

interface LoginResponse {
  token: string;
  user: {
    __v: number;
    _id: string;
    person_id: {
      _id: string;
      name?: string;
      lastname?: string;
    };
    status: boolean;
    username: string;
  };
  msg: string;
}

interface ForgotResponse {
  token: string;
  msg: string;
}

SplashScreen.preventAutoHideAsync();

export default function Index() {
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 300);

  const { setToken, setUser, token, user } = useAuth();

  const [pressableDisabled, setPressableDisabled] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [registerEnabled, setRegisterEnabled] = useState(false);
  const [sendEnabled, setSendEnabled] = useState(false);
  const [verifyEnabled, setVerifyEnabled] = useState(false);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { width, height } = useWindowDimensions();
  const appHeight = height + 30;
  const color1 = '#87eaff'; // Light Blue
  const color2 = 'blue'; // Blue
  const color3 = 'lightgreen';
  const color4 = 'green';
  const color5 = '#fff';
  const color6 = '#bcf';
  const leftColor = useSharedValue(color2);
  const rightColor = useSharedValue(color1);

  const colors = useDerivedValue(() => {
    return [rightColor.value, leftColor.value];
  }, []);

  const handlePress = () => {
    console.log('Tap to Begin Pressed');
    // setTimeout(async () => {
    //   await playSound(require("@/assets/sound/BallHit.mp3"));
    // }, 20);
    router.push('/first');
    setPressableDisabled(true);
    setLoginEnabled(true);
  };

  const handleLoginPressed = async () => {
    console.log('Login pressed');
    const response: FetchResponse<LoginResponse> = await fetchWrapper(
      `${BASE_AUTH_URL}login`,
      {
        method: 'POST',
        body: JSON.stringify({ user: email, password }),
      },
    );
    if (response.error) {
      console.error(response.error);
    } else {
      console.log(response.data);
      setToken(response.data?.token ?? null);
      setUser({
        id: response.data?.user._id,
        person_id: response.data?.user.person_id._id,
        name: response.data?.user.username,
      });

      if(!response.data?.user.person_id.name){
        router.push('/first');
      }else {
        router.push('/(tabs)/discover');
      }
      useConnectSocket(WS_BASE_URL, response.data?.user._id ?? '');
    }
    setEmail('');
    setPassword('');
  };
  const handleGoToRegister = () => {
    console.log('Go to Register Pressed');
    leftColor.value = withTiming(color4, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    rightColor.value = withTiming(color3, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    setLoginEnabled(false);
    setRegisterEnabled(true);
  };
  const handleGoToForgot = () => {
    console.log('Go to Forgot Pressed');
    leftColor.value = withTiming(color6, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    rightColor.value = withTiming(color5, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    setCardOpacity(false);
    setLoginEnabled(false);
    setSendEnabled(true);
  };

  const handleRegisterPressed = async () => {
    const response = await fetchWrapper(`${BASE_AUTH_URL}register`, {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    });
    if (response.error) {
      console.error(response.error);
    } else {
      console.log(response.data);
    }
    setEmail('');
    setUsername('');
    setPassword('');
  };

  const handleSendPressed = async () => {
    console.log('Send Pressed');
    const response: FetchResponse<ForgotResponse> = await fetchWrapper(
      `${BASE_AUTH_URL}forgout`,
      {
        method: 'POST',
        body: JSON.stringify({ email }),
      },
    );
    if (response.error) {
      console.error(response.error);
    } else {
      setUser({
        tokenForgout: response.data?.token,
      });
    }

    setEmail('');
    setCardOpacity(true);
    setSendEnabled(false);
    setVerifyEnabled(true);
  };

  const handleVerifyPressed = async () => {
    console.log('Verify Pressed');

    const response: FetchResponse<ForgotResponse> = await fetchWrapper(
      `${BASE_AUTH_URL}forgot/code/${user?.tokenForgout}`,
      {
        method: 'POST',
        body: JSON.stringify({ code: verificationCode }),
      },
    );
    if (response.error) {
      console.error(response.error);
    } else {
      console.log(response.data);
      setUser({
        tokenChange: response.data?.token,
      });
    }

    setVerificationCode('');
    setVerifyEnabled(false);
    setConfirmEnabled(true);
  };

  const handleConfirmPressed = async () => {
    console.log('Confirm Pressed', user?.tokenChange);
    leftColor.value = withTiming(color2, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    rightColor.value = withTiming(color1, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });

    const response = await fetchWrapper(
      `${BASE_AUTH_URL}forgout/change/${user?.tokenChange}`,
      {
        method: 'POST',
        body: JSON.stringify({ password: newPassword }),
      },
    );

    if (response.error) {
      console.error(response.error);
    } else {
      console.log(response.data);
    }

    setNewPassword('');
    setConfirmPassword('');
    setConfirmEnabled(false);
    setLoginEnabled(true);
  };

  const handleBackToLogin = () => {
    console.log('Back to Login Pressed');
    leftColor.value = withTiming(color2, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    rightColor.value = withTiming(color1, {
      duration: 2500,
      easing: Easing.inOut(Easing.ease),
    });
    setRegisterEnabled(false);
    setConfirmEnabled(false);
    setSendEnabled(false);
    setVerifyEnabled(false);
    setLoginEnabled(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={pressableDisabled}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Canvas style={{ flex: 1 }}>
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
        <View style={styles.content}>
          <IconsBG />
        </View>
        <FooterWaves />
        <MotiImage
          animate={{
            translateY: pressableDisabled ? -270 : 0,
            transform: pressableDisabled ? [{ scale: 0.6 }] : [{ scale: 1 }],
          }}
          transition={{
            type: 'timing',
            duration: 2000,
          }}
          source={require('@/assets/images/index/LogoHDShade.png')}
          style={styles.logo}
        />
        <MotiImage
          from={{ transform: [{ scale: 1 }], opacity: 1 }}
          animate={{ transform: [{ scale: 0.85 }], opacity: 0 }}
          transition={{
            type: 'timing',
            duration: 1700,
            loop: pressableDisabled ? false : true,
          }}
          source={require('@/assets/images/index/TapToBegin.png')}
          style={styles.taptobegin}
        />

        <MotiImage
          animate={{
            translateX: pressableDisabled ? -100 : 0,
            opacity: pressableDisabled ? 0 : 1,
          }}
          transition={{
            type: 'timing',
            duration: 1000,
          }}
          source={require('@/assets/images/index/LLCLogoShade.png')}
          style={styles.llc}
        />
        <MotiImage
          animate={{
            translateX: pressableDisabled ? -100 : 0,
            opacity: pressableDisabled ? 0 : 1,
          }}
          transition={{
            type: 'timing',
            duration: 1000,
          }}
          source={require('@/assets/images/index/Rights.png')}
          style={styles.rights}
        />

        <MotiImage
          animate={{
            translateX: pressableDisabled ? 100 : 0,
            opacity: pressableDisabled ? 0 : 1,
          }}
          transition={{
            type: 'timing',
            duration: 750,
          }}
          source={require('@/assets/images/index/LogoHDShade.png')}
          style={[styles.llc, { left: 290, bottom: 7, width: 95, height: 55 }]}
        />

        {/* LOGIN */}

        <MotiView
          from={{ translateY: 100 }}
          animate={{ translateY: loginEnabled ? 0 : 100 }}
          transition={{
            type: 'timing',
            duration: 1600,
            easing: Easing.out(Easing.cubic),
          }}
        >
          <View style={{ transform: [{ rotate: '3deg' }] }}>
            <AnimatedButton
              onPress={handleGoToRegister}
              disabled={false}
              source={require('@/assets/images/index/ToRegister.png')}
              style={styles.toregister}
            />
          </View>
          <View style={{ transform: [{ rotate: '-2.8deg' }] }}>
            <AnimatedButton
              onPress={handleGoToForgot}
              disabled={false}
              source={require('@/assets/images/index/ToForgot.png')}
              style={styles.toforgot}
            />
          </View>
        </MotiView>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: loginEnabled ? 1 : 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 1000 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <MotiImage
            source={require('@/assets/images/index/LoginTitle.png')}
            style={styles.logintitle}
          />
        </MotiView>
        <MotiView
          from={{
            translateX: 400,
          }}
          animate={
            loginEnabled
              ? {
                  translateX: 0,
                }
              : registerEnabled
              ? {
                  translateX: -400,
                }
              : {}
          }
          transition={{ type: 'timing', duration: 1000, delay: 500 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <BlurView
            intensity={55}
            tint="light"
            style={styles.blur}
          >
            <Text style={styles.texttitle}>Nombre de Usuario o Correo</Text>
            <View style={styles.textinputcontainer}>
              <Ionicons
                name="person"
                size={25}
                style={styles.textinputicon}
                color="#999"
              />
              <TextInput
                placeholder="usuario / ejemplo@email.com"
                placeholderTextColor="#999"
                style={styles.textinput}
                keyboardType="email-address"
                multiline={false}
                scrollEnabled={false}
                numberOfLines={1}
                maxLength={50}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </BlurView>
        </MotiView>
        <MotiView
          from={{
            translateX: 400,
          }}
          animate={
            loginEnabled
              ? {
                  translateX: 0,
                }
              : registerEnabled
              ? {
                  translateX: -400,
                }
              : {}
          }
          transition={{ type: 'timing', duration: 1000, delay: 1000 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <BlurView
            intensity={55}
            tint="light"
            style={[styles.blur, { top: 450 }]}
          >
            <Text style={styles.texttitle}>Contraseña</Text>
            <View style={styles.textinputcontainer}>
              <Ionicons
                name="lock-closed"
                size={25}
                style={styles.textinputicon}
                color="#999"
              />
              <TextInput
                placeholder="Ejemplo123*"
                placeholderTextColor="#999"
                style={styles.textinput}
                keyboardType="email-address"
                multiline={false}
                scrollEnabled={false}
                numberOfLines={1}
                maxLength={50}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </BlurView>
        </MotiView>
        <MotiView
          from={{
            translateX: 400,
          }}
          animate={
            loginEnabled
              ? {
                  translateX: 0,
                }
              : registerEnabled
              ? {
                  translateX: -400,
                }
              : {}
          }
          transition={{ type: 'timing', duration: 1000, delay: 1500 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <AnimatedButton
            onPress={handleLoginPressed}
            disabled={false}
            source={require('@/assets/images/index/LoginButton.png')}
            style={styles.mainbutton}
          />
        </MotiView>

        {/* REGISTER */}

        <MotiView
          from={{ translateY: 100 }}
          animate={{
            translateY: pressableDisabled ? (!loginEnabled ? 0 : 100) : 100,
          }}
          transition={{
            type: 'timing',
            duration: 1600,
            easing: Easing.out(Easing.cubic),
          }}
        >
          <AnimatedButton
            onPress={handleBackToLogin}
            disabled={false}
            source={require('@/assets/images/index/ToLogin.png')}
            style={styles.tologin}
          />
        </MotiView>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: registerEnabled ? 1 : 0 }}
          transition={{ type: 'timing', duration: 1000, delay: 1000 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <MotiImage
            source={require('@/assets/images/index/RegisterTitle.png')}
            style={[
              styles.logintitle,
              { top: 166, left: 118, width: 150, height: 50 },
            ]}
          />
        </MotiView>
        <MotiView
          from={{
            translateX: 400,
          }}
          animate={{ translateX: registerEnabled ? 0 : 400 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: loginEnabled ? 0 : 1000,
          }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <BlurView
            intensity={55}
            tint="light"
            style={[styles.blur, { top: 225 }]}
          >
            <Text style={styles.texttitle}>Correo Electrónico</Text>
            <View style={styles.textinputcontainer}>
              <Ionicons
                name="mail"
                size={25}
                style={styles.textinputicon}
                color="#999"
              />
              <TextInput
                placeholder="ejemplo@email.com"
                placeholderTextColor="#999"
                style={styles.textinput}
                keyboardType="email-address"
                multiline={false}
                scrollEnabled={false}
                numberOfLines={1}
                maxLength={50}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </BlurView>
        </MotiView>
        <MotiView
          from={{
            translateX: 400,
          }}
          animate={{ translateX: registerEnabled ? 0 : 400 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: loginEnabled ? 500 : 1500,
          }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <BlurView
            intensity={55}
            tint="light"
            style={[styles.blur, { top: 368 }]}
          >
            <Text style={styles.texttitle}>Nombre de Usuario</Text>
            <View style={styles.textinputcontainer}>
              <Ionicons
                name="person"
                size={25}
                style={styles.textinputicon}
                color="#999"
              />
              <TextInput
                placeholder="usuario"
                placeholderTextColor="#999"
                style={styles.textinput}
                keyboardType="email-address"
                multiline={false}
                scrollEnabled={false}
                numberOfLines={1}
                maxLength={50}
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </BlurView>
        </MotiView>
        <MotiView
          from={{
            translateX: 400,
          }}
          animate={{ translateX: registerEnabled ? 0 : 400 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: loginEnabled ? 1000 : 2000,
          }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <BlurView
            intensity={55}
            tint="light"
            style={[styles.blur, { top: 512 }]}
          >
            <Text style={styles.texttitle}>Contraseña</Text>
            <View style={styles.textinputcontainer}>
              <Ionicons
                name="lock-closed"
                size={25}
                style={styles.textinputicon}
                color="#999"
              />
              <TextInput
                placeholder="Ejemplo123*"
                placeholderTextColor="#999"
                style={styles.textinput}
                keyboardType="email-address"
                multiline={false}
                scrollEnabled={false}
                numberOfLines={1}
                maxLength={50}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </BlurView>
        </MotiView>
        <MotiView
          from={{
            translateX: 400,
          }}
          animate={{ translateX: registerEnabled ? 0 : 400 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: loginEnabled || confirmEnabled ? 1500 : 2500,
          }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <AnimatedButton
            onPress={handleRegisterPressed}
            disabled={false}
            source={require('@/assets/images/index/RegisterButton.png')}
            style={[
              styles.mainbutton,
              { top: 655, left: 70, width: 250, height: 50 },
            ]}
          />
        </MotiView>

        {/* FORGOT PASSWORD: SEND & VERIFY */}

        <MotiView
          from={{ opacity: 0 }}
          animate={{
            opacity: sendEnabled
              ? 1
              : verifyEnabled
              ? 1
              : confirmEnabled
              ? 1
              : 0,
          }}
          transition={{ type: 'timing', duration: 1000, delay: 1200 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <MotiImage
            source={require('@/assets/images/index/ForgotTitle.png')}
            style={[styles.logintitle, { top: 192, left: 66 }]}
          />
        </MotiView>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            opacity: loginEnabled && cardOpacity ? 0 : 1,
          }}
        >
          <MotiView
            from={{
              translateX: -400,
            }}
            animate={{
              translateX:
                sendEnabled || verifyEnabled ? 0 : confirmEnabled ? 400 : -400,
            }}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: loginEnabled || confirmEnabled ? 0 : 750,
            }}
            style={{ position: 'absolute', flex: 1 }}
          >
            <BlurView
              intensity={75}
              tint="light"
              style={[styles.blur, { top: 275 }]}
            >
              <Text style={styles.texttitle}>Tu Correo Electrónico</Text>
              <View style={styles.textinputcontainer}>
                <Ionicons
                  name="send"
                  size={25}
                  style={styles.textinputicon}
                  color="#999"
                />
                <TextInput
                  placeholder="ejemplo@email.com"
                  placeholderTextColor="#999"
                  style={styles.textinput}
                  keyboardType="email-address"
                  multiline={false}
                  scrollEnabled={false}
                  numberOfLines={1}
                  maxLength={50}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </BlurView>
          </MotiView>
          <MotiView
            from={{
              translateX: -400,
            }}
            animate={{
              translateX:
                sendEnabled || verifyEnabled ? 0 : confirmEnabled ? 400 : -400,
            }}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: loginEnabled || confirmEnabled ? 500 : 1250,
            }}
            style={{ position: 'absolute', flex: 1 }}
          >
            <BlurView
              intensity={75}
              tint="light"
              style={[styles.blur, { top: 490 }]}
            >
              <Text style={styles.texttitle}>Código de Verificación</Text>
              <View style={styles.textinputcontainer}>
                <Ionicons
                  name="mail-open"
                  size={25}
                  style={styles.textinputicon}
                  color="#999"
                />
                <TextInput
                  placeholder="123456"
                  placeholderTextColor="#999"
                  style={styles.textinput}
                  keyboardType="number-pad"
                  multiline={false}
                  scrollEnabled={false}
                  numberOfLines={1}
                  maxLength={50}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                />
              </View>
            </BlurView>
          </MotiView>
          <MotiView
            from={{
              translateX: -400,
            }}
            animate={{
              translateX:
                sendEnabled || verifyEnabled ? 0 : confirmEnabled ? 400 : -400,
            }}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: loginEnabled || confirmEnabled ? 250 : 1000,
            }}
            style={{ position: 'absolute', flex: 1 }}
          >
            <AnimatedButton
              onPress={handleSendPressed}
              disabled={false}
              source={require('@/assets/images/index/SendButton.png')}
              style={[
                styles.mainbutton,
                { top: 420, left: 105, width: 170, height: 62 },
              ]}
            />
          </MotiView>
          <MotiView
            from={{
              translateX: -400,
            }}
            animate={{
              translateX:
                sendEnabled || verifyEnabled ? 0 : confirmEnabled ? 400 : -400,
            }}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: loginEnabled || confirmEnabled ? 750 : 1500,
            }}
            style={{ position: 'absolute', flex: 1 }}
          >
            <AnimatedButton
              onPress={handleVerifyPressed}
              disabled={verifyEnabled ? false : true}
              source={require('@/assets/images/index/VerifyButton.png')}
              style={[
                styles.mainbutton,
                { top: 635, left: 90, width: 200, height: 62 },
              ]}
            />
          </MotiView>
        </View>

        {/* FORGOT PASSWORD: CONFIRM NEW PASSWORD */}

        <MotiView
          from={{
            translateX: -400,
          }}
          animate={
            confirmEnabled
              ? {
                  translateX: 0,
                }
              : {}
          }
          transition={{ type: 'timing', duration: 1000, delay: 500 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <BlurView
            intensity={75}
            tint="light"
            style={styles.blur}
          >
            <Text style={styles.texttitle}>Tu Nueva Contraseña</Text>
            <View style={styles.textinputcontainer}>
              <Ionicons
                name="lock-open"
                size={25}
                style={styles.textinputicon}
                color="#999"
              />
              <TextInput
                placeholder="Ejemplo123*"
                placeholderTextColor="#999"
                style={styles.textinput}
                keyboardType="email-address"
                multiline={false}
                scrollEnabled={false}
                numberOfLines={1}
                maxLength={50}
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
          </BlurView>
        </MotiView>
        <MotiView
          from={{
            translateX: -400,
          }}
          animate={
            confirmEnabled
              ? {
                  translateX: 0,
                }
              : {}
          }
          transition={{ type: 'timing', duration: 1000, delay: 1000 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <BlurView
            intensity={75}
            tint="light"
            style={[styles.blur, { top: 450 }]}
          >
            <Text style={styles.texttitle}>Confirma tu Nueva Contraseña</Text>
            <View style={styles.textinputcontainer}>
              <Ionicons
                name="lock-closed"
                size={25}
                style={styles.textinputicon}
                color="#999"
              />
              <TextInput
                placeholder="Ejemplo123* (debe coincidir)"
                placeholderTextColor="#999"
                style={styles.textinput}
                keyboardType="email-address"
                multiline={false}
                scrollEnabled={false}
                numberOfLines={1}
                maxLength={50}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </BlurView>
        </MotiView>
        <MotiView
          from={{
            translateX: -400,
          }}
          animate={
            confirmEnabled
              ? {
                  translateX: 0,
                }
              : {}
          }
          transition={{ type: 'timing', duration: 1000, delay: 1500 }}
          style={{ position: 'absolute', flex: 1 }}
        >
          <AnimatedButton
            onPress={handleConfirmPressed}
            disabled={false}
            source={require('@/assets/images/index/ConfirmButton.png')}
            style={[
              styles.mainbutton,
              { top: 618, left: 55, width: 280, height: 65 },
            ]}
          />
        </MotiView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainbutton: {
    position: 'absolute',
    top: 603,
    left: 95,
    width: 190,
    height: 75,
    zIndex: 5,
  },
  blur: {
    position: 'absolute',
    width: 335,
    height: 132,
    zIndex: 5,
    top: 295,
    left: 28,
    overflow: 'hidden',
    borderRadius: 40,
    // borderWidth: 5,
    // borderColor: "white",
    boxShadow: '2 2 15px rgba(0,0,0,0.3)',
  },
  texttitle: {
    position: 'absolute',
    fontFamily: 'BlackFont',
    color: '#222',
    fontSize: 19,
    top: 18,
    left: 24,
    width: 400,
    height: 30,
    zIndex: 5,
    textShadowRadius: 2,
  },
  textinputcontainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: 300,
    height: 50,
    top: 55,
    left: 16,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: 'transparent',
    backgroundColor: 'white',
    boxShadow: '2 2 15px rgba(0,0,0,0.5)',
  },
  textinputicon: {
    position: 'absolute',
    left: 12,
    top: 9,
  },
  textinput: {
    position: 'absolute',
    fontFamily: 'BoldFont',
    fontSize: 17,
    top: -2.5,
    left: 43,
    width: 250,
    height: 50,
    zIndex: 5,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  logintitle: {
    position: 'absolute',
    top: 190,
    left: 63,
    width: 260,
    height: 45,
    zIndex: 5,
  },
  toforgot: {
    position: 'absolute',
    top: -53,
    left: 17,
    width: 190,
    height: 34,
    zIndex: 4,
  },
  tologin: {
    position: 'absolute',
    top: -59,
    left: 90,
    width: 210,
    height: 42,
    zIndex: 4,
  },
  toregister: {
    position: 'absolute',
    top: -59,
    left: 217,
    width: 156,
    height: 42,
    zIndex: 4,
  },
  rights: {
    position: 'absolute',
    bottom: 2.5,
    left: 8,
    width: 85,
    height: 14,
    zIndex: 4,
  },
  llc: {
    position: 'absolute',
    bottom: 17,
    left: 20,
    width: 70,
    height: 52,
    zIndex: 4,
  },
  ball: {
    position: 'absolute',
    top: 300,
    left: 150,
    width: 80,
    height: 80,
    transform: [{ rotate: '-90deg' }],
  },
  logo: {
    position: 'absolute',
    top: 260,
    left: 14,
    width: 375,
    height: 215,
  },
  taptobegin: {
    position: 'absolute',
    top: 500,
    left: 37,
    width: 315,
    height: 52,
  },
  container: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    top: 120,
  },
});
