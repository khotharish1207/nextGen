import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyleSheet, Image, Button, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Block, Text, theme, Button as Btn, Icon } from "galio-framework";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addSocialPosts } from "../redux/actions/actions";
import { nowTheme } from "../constants/";
import {
    Input,
    Button as LButton,
    KeyboardAwareScrollView,
    LocationSelector,
    TextArea,
    Select,
    Picker,
    Video
} from "../components";


class AddNewFeed extends React.Component {
    state = {
        image: null,
        video: null,
        uri: null,
        mediaType: null,
        full: true,
        postType: "socialPost",
        jobPost: {},
        eventPost: {}
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }
    };

    pickMedia = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                // base64: true,
                videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality
            });
            if (!result.cancelled) {
                console.log("results", result)
                const { type, uri } = result
                this.setState({ mediaType: type, uri });
            }

        } catch (E) {
            // console.log(E);
        }
    };

    renderCards = () => {
        let { mediaType, uri } = this.state;
        return (
            <Block flex>
                <Block flex style={styles.imageContainer}>
                    {mediaType === "image" &&
                        <Image
                            source={{ uri }} style={styles.fullImage} />}
                    {mediaType === "video" &&
                        <Video
                            source={{ uri }}
                            rate={1.0}
                            volume={1.0}
                            style={styles.fullImage}
                        />}
                </Block>

                <LButton
                    round
                    onPress={this.pickMedia}
                >
                    Add Media
                </LButton>
            </Block>
        );
    };

    renderInputs = () => {
        return (
            <Block flex>
                {/* <Text size={16} style={styles.title}>
                    Title
        </Text> */}
                <Block>
                    <Input
                        placeholder="Title"
                        onChange={this.onChange("title")}
                        iconContent={<Block />}
                        shadowless
                    />
                </Block>

                <Block>
                    <Input
                        right
                        placeholder="Content"
                        onChange={this.onChange("content")}
                        iconContent={<Block />}
                        shadowless
                    />
                </Block>
            </Block>
        );
    };

    renderLocationSelector = () => {
        return (
            <Block flex>
                <Text size={16} style={styles.title}>
                    <Icon
                        name="location-arrow"
                        family="Font-Awesome"
                        size={16}
                        color={nowTheme.COLORS.PRIMARY}
                        style={{ marginRight: 10 }}
                    />
          &nbsp;Select City
        </Text>

                <LocationSelector style={{ color: nowTheme.COLORS.BLACK }} />
            </Block>
        );
    };

    renderPostTypeSelector = () => {
        const { postType } = this.state;
        const values = [
            { value: "socialPost", label: "Social" },
            { value: "eventPost", label: "Event" },
            { value: "jobPost", label: "Job" },
            { value: "advertisePost", label: "Advertise" }
        ]

        return < Block flex>
            <Text size={16} style={styles.title}>
                {"Post Type"}
            </Text>
            <Block>
                <Picker
                    mode={"dropdown"}
                    options={values}
                    value={postType}
                    onChange={this.onPostChange}
                    prompt="Select Post Type"
                />
            </Block>
        </Block>

    }

    onPostChange = (postType) => this.setState({ postType })

    onPostSubmit = () => {
        const { navigation } = this.props;
        const { title, content, url } = this.state
        this.props.addSocialPosts({ ...this.state }).then((res) => navigation.navigate('Home'))
    };

    onChange = (type) => (e) => {
        const value = e.nativeEvent.text;
        const [field, subField] = type.split(".")
        if (!subField) {
            this.setState({ [type]: value });
        }
        if (field && subField) {
            const ele = this.state[field];
            this.setState({ [field]: { ...ele, [subField]: value } })
        }
    }

    renderInputsAsPerPost = () => {
        const { postType, jobPost } = this.state;

        const jobPostInputs = ["companyName", "contactEmail", "contactNumber", "description", "qualification", "salary"]
        const eventPost = []
        if (postType === "jobPost") {
            return jobPostInputs.map(field => <Input
                key={`jobPost.${field}`}
                placeholder={field}
                onChange={this.onChange(`jobPost.${field}`)}
                iconContent={<Block />}
                shadowless
                value={jobPost[field]}
            />)
        }

        return null

    }

    render() {
        const { title, content, url, image } = this.state
        // console.log("!title || !content", !title || !content)

        // console.log("--------", this.props)
        return (
            <KeyboardAwareScrollView>
                <Block card style={styles.container}>
                    {this.renderInputs()}
                    {/* {this.renderPostTypeSelector()} */}
                    {this.renderInputsAsPerPost()}

                    {this.renderCards()}
                    {/* {this.renderLocationSelector()} */}

                    <Block flex center style={{ marginTop: 20 }}>
                        <LButton
                            round
                            color="primary"
                            size="small"
                            // disabled={!title || !content}
                            onPress={this.onPostSubmit}
                        >
                            {"Share"}
                        </LButton>
                    </Block>
                </Block>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: theme.SIZES.BASE,
    },
    title: {
        fontFamily: "montserrat-bold",
        paddingBottom: theme.SIZES.BASE,
        marginTop: 20,
        color: nowTheme.COLORS.PRIMARY,
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        overflow: "hidden",
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        height: 122,
        width: "auto",
    },
    fullImage: {
        height: 215,
    },
});

const mapState = (state) => state;
const mapDispatch = (dispatch) => bindActionCreators({ addSocialPosts }, dispatch);

// export default AddNewFeed;
export default connect(mapState, mapDispatch)(AddNewFeed);
