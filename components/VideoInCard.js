import React, { useState } from 'react'
import { Video } from 'expo-av'
import { TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Block, Text, Card, Button, Icon } from 'galio-framework';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { nowTheme as theme } from '../constants/';



class VideoInCard extends React.Component {
    node = null
    state = {
        shouldPlay: false,
        pause: false,
        posterSource: null
    }

    componentDidMount() {
        this.generateThumbnail()
    }

    generateThumbnail = async () => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(this.props.source.uri);
            this.setState({ posterSource: uri });
        } catch (e) {
            console.warn(e);
        }
    };
    onPress = () => {

        if (!this.state.shouldPlay) {
            this.setState({ shouldPlay: true, pause: false })
        } else {
            this.state.pause ? this.onPlay() : this.onPause()
            this.setState({ pause: !this.state.pause })
        }


    }

    onPause = () => {
        this.node.pauseAsync()
    }

    onPlay = () => {
        this.node.playAsync()
    }
    
    _onPlaybackStatusUpdate = status => {
        console.log(status)
    }

    render() {

        const { posterSource, pause, shouldPlay } = this.state;

        return <>
            <Video
                ref={(el) => this.node = el}
                {...this.props}
                posterSource={posterSource}
                usePoster
                isLooping
                resizeMode="cover"
                shouldPlay={this.state.shouldPlay}
                // onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                useNativeControls
            />
           

        </>
    }
}

const styles = StyleSheet.create({

    controlBar: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "transparent",
    },
    optionsButton: {
        width: 'auto',
        height: 34,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    fullImage: {
        height: 60,
    },

});
export default VideoInCard