import React, { FC, Component, ReactElement, ComponentElement, ReactComponentElement, PropsWithChildren, FunctionComponent } from "react";
import { View, StyleProp, ViewStyle, ViewBase } from "react-native";
import { getHeight, getWidth } from "../util";
interface Tab extends PropsWithChildren {
    style?: StyleProp<ViewStyle>
}
const Tab: FC<Tab> = function (props: Tab) {
    const style: StyleProp<ViewStyle> = {
        zIndex: 20,marginLeft:getWidth(42),marginRight:getWidth(40),borderRadius:getWidth(24),minHeight:getHeight(351),marginTop:getHeight(39)
    };

    const TabView = <View style={Object.assign(style, props.style)}>
        {props.children}
    </View>

    return TabView;
}
export { Tab }