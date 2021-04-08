import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Animated,
    Text,
    View,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {removeToast} from "../helpers/actions";

// TODO: make it better I know you can do something about the onHide()// error if closed before onHide()
// the answer is to unsubscribe

const Message = (props) => {
    const opacity = useRef(new Animated.Value(0))
        .current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 900,
                useNativeDriver: true,
            }),
        ]).start(() => {
            props.onHide();
        });
    }, []);

    return (
        <Animated.View
            style={{
                opacity,
                transform: [
                    {
                        translateY: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                        }),
                    },
                ],
                margin: 10,
                marginBottom: 5,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 4,
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 5,
                elevation: 6,
            }}
        >
            <Text>{props.message}</Text>
        </Animated.View>
    );
};

export default () => {
    const [messages, setMessages] = useState([]);

    const messages2 = useSelector(state => state.toast)

    const dispatch = useDispatch();
    useEffect(() => {
        messages2.forEach(msg => {
            if (!msg.done) {
                setMessages([...messages, msg])
            }
        })
    }, [messages2])
    return (

        <>
            <View
                style={{
                    position: 'absolute',
                    top: 45, // different for each system
                    left: 0,
                    right: 0,
                }}
            >
                {messages.map((message) => (
                    <Message
                        key={message.key}
                        message={message.msg}

                        onHide={() => {
                            setMessages((messages) =>
                                messages.filter(
                                    (currentMessage) =>
                                        currentMessage !== message
                                )
                            );
                            dispatch(removeToast(message.key))
                        }}
                    />
                ))}
            </View>

            {/*<Button*/}
            {/*    title="Add message"*/}
            {/*    onPress={() => {*/}
            {/*        const message = getRandomMessage();*/}
            {/*        setMessages([...messages, message]);*/}
            {/*    }}*/}
            {/*/>*/}
        </>
    );
};
