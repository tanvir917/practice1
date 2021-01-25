import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
 import { useSelector } from 'react-redux';

 const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const isAdmin = props.navigation.getParam('isAdmin');
  const selectedProduct = useSelector(state => 
      state.products.availableProducts.find(prod => prod.id === productId)
  );
  const {subscriberId} = selectedProduct;
  const userId = useSelector(state => state.auth.userId);
  function checkValue(arr) {
    //console.log(arr);
    return arr === userId;
  }
  // console.log('===============selectedproduct=====================');
  // console.log(subscriberId);
  // console.log(subscriberId.some(checkValue));
  // console.log('====================================');

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [
    playerState, setPlayerState
  ] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);
     return (
        <View style={{flex: 1}}>
        {isAdmin || subscriberId && subscriberId.some(checkValue)
        ? (
          <View style={{flex: 1}}>
            <Video
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              onProgress={onProgress}
              paused={paused}
              ref={videoPlayer}
              resizeMode={screenType}
              onFullScreen={isFullScreen}
              source={{
                uri:
                  selectedProduct.videoUrl
              }}
              style={styles.mediaPlayer}
              volume={10}
            />
            <MediaControls
              duration={duration}
              isLoading={isLoading}
              mainColor="#333"
              onFullScreen={onFullScreen}
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              progress={currentTime}
              toolbar={renderToolbar()}
            />
          </View>
        ) : (
          <Text style={styles.text}>Not Subscribed</Text>
        )}
        
        </View>
     );
 };


 const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'red'
      },
      toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
      },
     image: {
         width: '100%',
         height: 300,
     },
     actions: {
        marginVertical: 10,
        alignItems: 'center'
     },
     price: {
         fontSize: 20,
         color: '#888',
         textAlign: 'center',
         marginVertical: 20,
         fontFamily: 'open-sans-bold'
     },
     description: {
         fontFamily: 'open-sans',
         fontSize: 14,
         textAlign: 'center',
         marginHorizontal: 20
     }
 })

 export default ProductDetailScreen;