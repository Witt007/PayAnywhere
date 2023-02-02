import React, { type PropsWithChildren, useState, Component, PureComponent, useMemo, useRef, useCallback, lazy, LazyExoticComponent, FunctionComponent, ReactNode, ReactElement, SyntheticEvent, useEffect } from 'react';
import {
    NavigatorIOSProps,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet, AppState,
    Text,
    useColorScheme, useWindowDimensions,
    View, NavigatorIOS, Image, ScaledSize, NativeScrollEvent, NativeSyntheticEvent, NativeScrollPoint, ImageSourcePropType, ImageLoadEventData, AppStateStatus, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Animated
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getHeight, getWidth } from "../util";

import { Tab } from './tab';
const backIcon = require('../assets/iconback.png');
const moreIcon = require('../assets/moreIcon.png');
const headLeftIcon = require('../assets/headLeftIcon.png');
const moneyManagerIcon = require('../assets/moneyManager.png');
const investHeadicon = require('../assets/investHead.png');
const investHeadicon_ = require('../assets/investhead_.png');
const investContenticon = require('../assets/investContent.png');
const part3_icon = require('../assets/part3.png');
const redpacket = require('../assets/redPacket.png');
const testscore = require('../assets/testscore.png');
const arrowleft = require('../assets/arrowleft.png');
const moneyname = require('../assets/moneyname.png');
const paybackname = require('../assets/paybackname.png');
const paybackfuli = require('../assets/fuli.png');
const button = require('../assets/button.png');
const moreTabIcon = require('../assets/moreTab.png');
const amountUrls: { [key: string]: ImageSourcePropType } = {
    0: require(`../assets/yebnums/0.png`),
    1: require(`../assets/yebnums/1.png`),
    2: require(`../assets/yebnums/2.png`),
    3: require(`../assets/yebnums/3.png`),
    4: require(`../assets/yebnums/4.png`),
    5: require(`../assets/yebnums/5.png`),
    6: require(`../assets/yebnums/6.png`),
    7: require(`../assets/yebnums/7.png`),
    8: require(`../assets/yebnums/8.png`),
    9: require(`../assets/yebnums/9.png`),
    ".": require(`../assets/yebnums/_.png`),
    ",": require(`../assets/yebnums/,.png`),

    "s0": require(`../assets/yebnums/s0.png`),
    "s1": require(`../assets/yebnums/s1.png`),
    "s2": require(`../assets/yebnums/s2.png`),
    "s3": require(`../assets/yebnums/s3.png`),
    "s4": require(`../assets/yebnums/s4.png`),
    "s5": require(`../assets/yebnums/s5.png`),
    "s6": require(`../assets/yebnums/s6.png`),
    "s7": require(`../assets/yebnums/s7.png`),
    "s8": require(`../assets/yebnums/s8.png`),
    "s9": require(`../assets/yebnums/s9.png`),
    "s.": require(`../assets/yebnums/s_.png`),
    "s,": require(`../assets/yebnums/s,.png`),

    "sr0": require(`../assets/yebnums/sr0.png`),
    "sr1": require(`../assets/yebnums/sr1.png`),
    "sr2": require(`../assets/yebnums/sr2.png`),
    "sr3": require(`../assets/yebnums/sr3.png`),
    "sr4": require(`../assets/yebnums/sr4.png`),
    "sr5": require(`../assets/yebnums/sr5.png`),
    "sr6": require(`../assets/yebnums/sr6.png`),
    "sr7": require(`../assets/yebnums/sr7.png`),
    "sr8": require(`../assets/yebnums/sr8.png`),
    "sr9": require(`../assets/yebnums/sr9.png`),
    "sr.": require(`../assets/yebnums/sr_.png`),

    "sb0": require(`../assets/yebnums/sb0.png`),
    "sb1": require(`../assets/yebnums/sb1.png`),
    "sb2": require(`../assets/yebnums/sb2.png`),
    "sb3": require(`../assets/yebnums/sb3.png`),
    "sb4": require(`../assets/yebnums/sb4.png`),
    "sb5": require(`../assets/yebnums/sb5.png`),
    "sb6": require(`../assets/yebnums/sb6.png`),
    "sb7": require(`../assets/yebnums/sb7.png`),
    "sb8": require(`../assets/yebnums/sb8.png`),
    "sb9": require(`../assets/yebnums/sb9.png`),
    "sb.": require(`../assets/yebnums/sb_.png`),
    "sba": require(`../assets/yebnums/add.png`),
    "sbd": require(`../assets/yebnums/yuan.png`),
    "sbp": require(`../assets/yebnums/percent.png`),
}
const data: {
    asset: number
    totalIncome: number
    lastIncomeEachTenK: number
    yeasterdayIncome: number
    accumulatedIncome: number
    incomeRecords: { [key: string]: string } //key is 
    qirinianhua: string

    investPayback: number
    investPercent: number
} = {
    asset: 261030.91 + 15.94 + 0 + 16.07 - 30.91 + 10000 + 15.62+15.68*3+0,//总数据库记录的资产
    accumulatedIncome: 3075.32 + 15.94 + 16.07+ 15.62+15.68*3 + 0,

    totalIncome: 261000 + 15.94 + 0 + 16.07+ 15.62+15.68*2 + 0,//已确认的份额=asset+incomeRecords到期已确认的份额。比asset少，说明最近转入了钱，比asset多说明最近有大收益，而且也没再入账。
    lastIncomeEachTenK: 0.6004,

    yeasterdayIncome: +15.68,
    qirinianhua: "2.2410",

    incomeRecords: { ['1672475870499']: '10000' },

    investPayback: 81.13+2,
    investPercent: 140
}

type props = {
    changeBarStyle: (isDarkBarStyle: boolean) => void
}
let test = { borderWidth: 1, borderColor: "red" };
function loopNumstr(nums: string | number, callback: (picName: string) => ReactNode): ReactNode[] {
    const numstr: string = String(nums);
    return numstr.split('').map(function (picName: string) {
        return callback(picName);
    })
}
function transferOut(num: number) {
    let result: number = 0;
    for (const datestr in data.incomeRecords) {
        if (Object.prototype.hasOwnProperty.call(data.incomeRecords, datestr)) {
            if (result < num) {
                const money = Number(data.incomeRecords[datestr]);

                const makeUp = num - result;//差多少；
                if (makeUp >= money)
                    result += money;
                else result += makeUp

                const rest = money - makeUp; //money还剩多少，取完了没
                if (rest > 0)
                    data.incomeRecords[datestr] = String(rest);
                else delete data.incomeRecords[datestr];
            } else break;
        }
    }
}
//计入收入,非利润
function transferIn(Income: number, updateStateCallback: () => void) {
    //收入变动更新
    data.asset += Income;

    //记录收入
    const date = new Date();
    switch (date.getDay()) {
        case 1:
        case 2:
        case 3:
            if (date.getHours() < 15) {
                date.setDate(date.getDate() + 1);
            } else {
                date.setDate(date.getDate() + 2);
            }
            break;

        case 4:
            if (date.getHours() < 15) {
                date.setDate(date.getDate() + 1);
            } else {
                date.setDate(date.getDate() + 4);
            }
            break;
        case 5:
            if (date.getHours() < 15) {
                date.setDate(date.getDate() + 3);
            } else {
                date.setDate(date.getDate() + 4);
            }
            break;
        case 6: date.setDate(date.getDate() + 3);
            break;
        case 7:
            date.setDate(date.getDate() + 2);
            break;

        default:
            break;
    }

    date.setHours(6);

    data.incomeRecords[Date.parse(String(date))] = String(Income);
    updateStateCallback();
}
//计算出昨日利润,每天下午三点前确认
function addPayback(): {
    then: (callback?: () => void) => void
} {
    //计入昨日收益yeasterdayIncome和accumulatedIncome和asset
    {
        const profit = data.totalIncome * data.lastIncomeEachTenK / 10000;
        data.yeasterdayIncome = toFixed2Number(profit);
        //也是隔一天入账收益
        data.accumulatedIncome = toFixed2Number(data.accumulatedIncome + data.yeasterdayIncome);
        //接下来需要把收入加入asset addincome
    }

    //确认今天的份额totalIncome,以便明日计算今天的收益
    const timeNum = Object.keys(data.incomeRecords);
    timeNum.forEach(time => {
        if (Number(time) >= Date.now()) {
            data.totalIncome += Number(data.incomeRecords[time]);
            delete data.incomeRecords[time];
        }
    });

    return {
        then(callback?: () => void) {
            callback?.();
        }
    }
}
function formatAmount(num: number, isSplit: boolean = false): string {

    const arr = String(num).split('');
    const dotPos = arr.lastIndexOf('.');
    if (dotPos == -1) arr.push('.', '0', '0'); else if (!arr[dotPos + 2]) arr.push('0');
    if (isSplit)
        for (let i = dotPos - 3; i > 1; i -= 3) {
            arr.splice(i, 0, ',');
        }
    return arr.join('');
}
function toFixed2Number(num: number): number {
    return Number(num.toFixed(2))
}
const YuEB: React.FC<props> = function (props: props) {
    const [isScrolled, setisScrolled] = useState(false);
    const [assetsNum, setAssetsNum] = useState(data.asset);
    const [IncomeNum, setIncomeNum] = useState(data.yeasterdayIncome);
    //const [totalIncome, setTotalIncome] = useState(data.totalIncome);
    const [accumulatedIncome, setAccumulatedIncome] = useState(data.accumulatedIncome);
    const [qirinianhua, setQirinianhua] = useState(data.qirinianhua);
    const [investPercent, setInvestPercent] = useState(data.investPercent);
    const [investPayback, setInvestPayback] = useState(data.investPayback);
    const [investContentHeight, setInvestContentHeight] = useState(0);
    const [showMoreTab, setShowMoreTab] = useState(false);
    const [MoreTabHeight, setMoreTabHeight] = useState(new Animated.Value(0));
    const onscroll = useCallback(function (evt: NativeSyntheticEvent<NativeScrollEvent>) {
        const offset = evt.nativeEvent.contentOffset;
        // console.log(Math.round(Math.random()*100),offset);

        if (offset.y <= 0) {
            setisScrolled(false);
            props.changeBarStyle(false)

        }
        else {
            setisScrolled(true)
            props.changeBarStyle(true)
        }

    }, [])



    const { headStyle, scrollView: scrollViewStyle } = createStyles();

    console.log("render times", Math.round(Math.random() * 100));
    useEffect(function () {
        console.log("life circle", Math.round(Math.random() * 100));

        PushNotificationIOS.setApplicationIconBadgeNumber(56 + 7+14);
        PushNotificationIOS.requestPermissions().then(function (p) {
            console.log(p, 'dafddg');

        })
        PushNotificationIOS.addEventListener('notification',function (res) {
            console.log(res,'nitif');
            
        })
        const fireDate=new Date();fireDate.setMinutes(1);
        PushNotificationIOS.addNotificationRequest({badge:1,id:'sadiaz1233',title:"TIME SENSITIVE",
        subtitle:"基金买入确认通知",body:"你于2022年12月30日买入10.00元山西证券超短债债券E基金已确认成功，确认金额10.00元，手续费0.00元",fireDate})

        AppState.addEventListener("change", (state: AppStateStatus) => {
            if (state == "active") {
                setTimeout(() => {
                    setInvestContentHeight(getHeight(528));
                }, 2000);
            } else if (state == "background") {
                setInvestContentHeight(0);
            }
        })



        const now = new Date();
        //收益计算，一天只能执行一次
        addPayback().then(() => {
            setIncomeNum(data.yeasterdayIncome);
            setAccumulatedIncome(data.accumulatedIncome);

            setAssetsNum(toFixed2Number(data.asset += data.yeasterdayIncome));
            data.totalIncome += data.yeasterdayIncome;
            data.totalIncome = toFixed2Number(data.totalIncome);
        })

        return function () {
        }
    }, [])
    const trigerAddIncome = useCallback(() => {
        return;
        // AddIncome(1, setAssetsNum)
    }, []);

    const trippleBtnCb = useCallback(() => {

        Animated.timing(MoreTabHeight, { toValue: getHeight(1113), useNativeDriver: false, duration: 300 }).start(() => {
            setMoreTabHeight(MoreTabHeight);
        })
        setShowMoreTab(true);

        // AddIncome(1, setAssetsNum)
    }, []);
    const closeMoreTab = useCallback(() => {
        Animated.timing(MoreTabHeight, { toValue: 0, useNativeDriver: false, duration: 300 }).start((res) => {
            setMoreTabHeight(MoreTabHeight);
            if (res.finished) {
                setShowMoreTab(false);
            }
        })

        // requestAnimationFrame(fk);
        // AddIncome(1, setAssetsNum)
    }, []);
    trigerAddIncome();
    const GenRMB = useMemo(() => {
        return loopNumstr(formatAmount(assetsNum, true), function (picName) {
            const { height, width } = Image.resolveAssetSource(amountUrls[picName]);
            return <Image key={picName + "asset" + Math.random()} progressiveRenderingEnabled={true} resizeMode={"contain"} style={{ width: getWidth(width), height: getHeight(height), marginLeft: getWidth(7), marginRight: getWidth(7) }} source={amountUrls[picName]}></Image>
        })
    }, [assetsNum])
    const yesterdayNumNode = useMemo(() => {
        return loopNumstr(formatAmount(IncomeNum), function (picName) {
            picName = "sr" + picName;
            const { height, width } = Image.resolveAssetSource(amountUrls[picName]);
            return <Image key={picName + Math.random()} progressiveRenderingEnabled={true} resizeMode={"contain"} style={{ width: getWidth(width), height: getHeight(height), marginRight: getWidth(7) }} source={amountUrls[picName]}></Image>
        })
    }, [IncomeNum])
    const accumulatedIncomeNode = useMemo(() => {
        return loopNumstr(formatAmount(accumulatedIncome), function (picName) {
            picName = "s" + picName;
            const { height, width } = Image.resolveAssetSource(amountUrls[picName]);
            return <Image key={picName + 'red' + Math.random()} progressiveRenderingEnabled={true} resizeMode={"contain"} style={{ width: getWidth(width), height: getHeight(height), marginRight: getWidth(7) }} source={amountUrls[picName]}></Image>
        })
    }, [accumulatedIncome])
    const investPaybackNode = useMemo(() => {
        return loopNumstr(formatAmount(investPayback) + 'd', function (picName) {
            picName = "sb" + picName;
            const { height, width } = Image.resolveAssetSource(amountUrls[picName]);
            return <Image key={picName + Math.random()} progressiveRenderingEnabled={true} resizeMode={"contain"} style={{ width: getWidth(width + 5), height: getHeight(height + 5), marginRight: getWidth(7) }} source={amountUrls[picName]}></Image>
        })
    }, [investPayback])
    const investPercentNode = useMemo(() => {
        return loopNumstr('a' + String(investPercent) + 'p', function (picName) {
            picName = "sb" + picName;
            const { height, width } = Image.resolveAssetSource(amountUrls[picName]);
            return <Image key={picName + Math.random()} progressiveRenderingEnabled={true} resizeMode={"contain"} style={{ width: getWidth(width + 5), height: getHeight(height + 5), marginRight: getWidth(7) }} source={amountUrls[picName]}></Image>
        })
    }, [investPercent])

    return (
        <View>
            <View nativeID='under layer' style={{ ...headStyle.underLayer, ...{ backgroundColor: isScrolled ? "#fefefe" : "#ff7542" } }}></View>

            <View style={{ ...headStyle.wrapper, ...{ backgroundColor: isScrolled ? "#fefefe" : "#ff7542" } }}>
                <Image style={{ ...headStyle.backIcon, ...(isScrolled ? {} : { tintColor: "white" }) }} resizeMode='cover' source={backIcon}></Image>
                <View style={headStyle.gfdz}>
                    <Text style={{ ...headStyle.text, ...{ color: isScrolled ? "black" : "white" } }}>余额宝</Text>
                    <View style={{ ...headStyle.gfdzwrapper, ...{ backgroundColor: isScrolled ? "#f7f7f7" : "#ff8457" } }}>
                        <Text style={{ ...headStyle.gfdzwrappertext, ...{ color: isScrolled ? "#999999" : "#fefefe" } }}>广发钱袋子货币A 七日年化<Text>{qirinianhua}</Text>% </Text>
                        <Image style={{ ...headStyle.gfdzwrapperIcon, ...(isScrolled ? {} : { tintColor: "#f4d2c5" }) }} source={headLeftIcon}></Image>
                    </View>
                </View>
                <TouchableOpacity onPress={trippleBtnCb}>
                    <Image style={{ ...headStyle.moreIcon, ...(isScrolled ? {} : { tintColor: "white" }) }} source={moreIcon}></Image>
                </TouchableOpacity>

            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic"
                style={scrollViewStyle.wrapper} onScroll={onscroll} onScrollBeginDrag={onscroll} onScrollEndDrag={onscroll}
            >
                {/* <View style={{ ...scrollViewStyle.bg, ...{ backgroundColor: isAlmostTop ? "#fefefe" : "#ff7542" } }}></View> */}
                {/* <LinearGradient nativeID='4' style={scrollViewStyle.gradient} locations={[0.3, 1]} colors={["#ff7542", "#ff7847"]}></LinearGradient> */}
               {/* <View nativeID='bgLayerColor' style={{width:"100%",height:"100%",backgroundColor:"#f5f5f5",position:"absolute",...test}}></View> */}
                <Image style={scrollViewStyle.redpacket}  source={redpacket}></Image>
                
                <View nativeID='mask-layer' style={{backgroundColor:"#ff7847"}}>
                    <LinearGradient nativeID='40' style={scrollViewStyle.tab1Gradient} locations={[0.65, 0.9]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={["#f5f5f5", "#ff7847"]}></LinearGradient>

                    <Tab style={{ backgroundColor: "white", height: getHeight(1112) }}>
                        <View style={{ margin: getWidth(69), marginBottom: 0, marginTop: getHeight(59) }}>
                            <View nativeID='name'><Image source={moneyname} style={scrollViewStyle.moneyName}></Image></View>
                            <View nativeID='rmb' style={scrollViewStyle.amount}>
                                <View style={scrollViewStyle.amount_text}>
                                    {GenRMB
                                    }
                                </View>
                                <Image source={arrowleft} style={{ marginLeft: getWidth(20), width: getWidth(32), height: getHeight(49), marginBottom: getHeight(9 + 2) }}></Image>
                            </View>
                            <View nativeID='payback'>
                                <Image source={paybackname} style={scrollViewStyle.paybackname}></Image>
                                <View style={scrollViewStyle.paubacknum}>
                                    {/*  <Text style={scrollViewStyle.paubacknum_text}>0.2</Text>
                                    <Text style={{ ...scrollViewStyle.paubacknum_text, ...{ marginLeft: getHeight(58) } }}>839</Text> */}
                                    <View style={{ ...scrollViewStyle.amount_text, ...{ width: getWidth(428), alignItems: "flex-end" } }}>
                                        {yesterdayNumNode
                                        }
                                    </View>
                                    <View style={{ ...scrollViewStyle.amount_text, ...{ width: getWidth(392) } }}>
                                        {
                                            accumulatedIncomeNode
                                        }
                                    </View>
                                    <Image source={paybackfuli} style={scrollViewStyle.paybackfuli}></Image>
                                </View>
                            </View>
                            <View nativeID='button'>
                                <Image style={{ width: getWidth(1064), height: getHeight(271) }} source={button}></Image>
                            </View>
                        </View>
                        <Image source={testscore} style={{ height: getHeight(135), width: "100%" }}></Image>
                    </Tab>
                    <View nativeID='mask-layer13' >
                        {/*  <Video   paused={false} source={{uri:"http://vjs.zencdn.net/v/oceans.mp4"}} style={{width:300,height:200,zIndex:100,position:"absolute",top:0,left:0}}>
                            
                        </Video> */}
                        <Tab style={{ height: getHeight(753 - 39 - 20) }}></Tab>
                    </View>
                    
                    <Tab >
                        {/* <LinearGradient style={{position:"absolute",width:"100%",height:"100%"}} start={{x:0,y:1}} end={{x:0,y:0}} locations={[0,1]} colors={["#fefefe","#e4effd"]}></LinearGradient> */}
                        <Image style={{ width: "100%", height: getHeight(179), ...(investContentHeight == 0 ? { display: "none" } : {}) }} source={investHeadicon}></Image>
                        <Image style={{ width: "100%", height: getHeight(179), ...(investContentHeight != 0 ? { display: "none" } : {}) }} source={investHeadicon_}></Image>
                        <View style={{ height: investContentHeight }}>
                            <View style={{ ...scrollViewStyle.amount_text, ...{ alignItems: "flex-end", marginLeft: getWidth(38), marginTop: getHeight(65), position: "absolute", zIndex: 200 } }}>
                                {investPaybackNode
                                }
                            </View>
                            <View style={{ ...scrollViewStyle.amount_text, ...{ alignItems: "flex-end", marginLeft: getWidth(282), marginTop: getHeight(65), position: "absolute", zIndex: 200 } }}>
                                {investPercentNode
                                }
                            </View>
                            <Image style={{ width: "100%", height: getHeight(528) }} source={investContenticon}></Image>
                        </View>
                        <Image style={{ width: "100%", height: getHeight(181) }} source={moneyManagerIcon}></Image>
                    </Tab>
                </View>
                
                <View>
                    <Image source={part3_icon} style={scrollViewStyle.part3_icon}></Image>
                    <View style={{ height: getHeight(220), backgroundColor: "#f5f5f5", width: "100%", top: 0 }}></View>
                </View>
            </ScrollView>

            {
                showMoreTab ? <View style={{ width: getWidth(1284), height: getHeight(2778), position: "absolute", top: 0, left: 0, zIndex: 1000, display: "flex", alignItems: "flex-end", flexDirection: "row" }}>
                    <TouchableNativeFeedback onPress={closeMoreTab}>
                        <View style={{ opacity: 0.5/*  */, width: "100%", height: "100%", backgroundColor: "black", position: "absolute" }}></View>
                    </TouchableNativeFeedback>
                    <Animated.View style={{ height: MoreTabHeight, width: "100%" }}>
                        <Image resizeMode='contain' source={moreTabIcon} style={{ height: getHeight(1113), width:'100%',position:"absolute" }}></Image>
                    </Animated.View>

                </View> : ""
            }
        </View>

    );
}

function createStyles() {


    return {
        headStyle: StyleSheet.create({

            wrapper: {//backgroundColor:"#ff7847",
                position: "absolute", width: "100%", zIndex: 12,
                display: 'flex', flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "flex-start",
                paddingLeft: getWidth(63), paddingRight: getWidth(37), height: getHeight(197), marginTop: getHeight(141),
            },
            moreIcon: {
                width: getWidth(59), height: getHeight(15), marginTop: getHeight(57)
            },
            text: {
                fontSize: getWidth(62), color: "white",
                marginTop: getHeight(26 - 9), fontWeight: "bold"
            },
            gfdz: {
                display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "flex-start"
            },
            gfdzwrapper: {
                width: getWidth(774), height: getHeight(77),
                marginTop: getHeight(21 - 9), borderRadius: getWidth(38), display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"
            },

            gfdzwrapperIcon: { width: getWidth(34), height: getHeight(46), marginLeft: getWidth(12) },
            gfdzwrappertext: { textAlign: "center", fontSize: getWidth(41) },
            backIcon: {
                width: getWidth(34), height: getHeight(56), marginTop: getHeight(38)
            },
            underLayer: { height: getHeight(179), width: "100%", zIndex: 12 }
        }),
        scrollView: StyleSheet.create({
            wrapper: {
                backgroundColor: '#f5f5f5',//"#ff7847",
                width: "100%", overflow: "scroll", zIndex: 10, height: "100%", paddingTop: getHeight(184 - 39)
            },
            bg: { position: "absolute",/* backgroundColor:"#ff7847", */width: "100%", height: getHeight(14) },
            maskLayer: {
                //display: "flex", alignItems: "flex-end", flexDirection: "row"
                // backgroundColor: "blue"
            },
            gradient: {
                position: "absolute", top: 0, left: 0, width: "100%", height: getHeight(1112) + 39, display: "none"
            },
            tab1Gradient: {
                position: "absolute", width: "100%", height:"100%"// getHeight(1112+39+753)
                ,zIndex:10,opacity:0
            },
            redpacket: {
                height: getHeight(753), width: "100%", position: "absolute", top: getHeight(1136), left: 0
            },
            part2_icon: {
                height: getHeight(926), width: "100%",
            },
            part3_icon: {
                height: getHeight(1512), width: "100%",
            },
            moneyName: {
                width: getWidth(1064), height: getHeight(141)
            },
            amount: {
                display: "flex", alignItems: "center", flexDirection: "row" /* height: getHeight(131) */
                , marginTop: getHeight(9)
            },
            amount_text: {
                // fontSize: getWidth(113 + 12)//,letterSpacing:getWidth(10)
                // , fontWeight: "900"
                display: "flex", alignItems: "flex-start", flexDirection: "row"
            },
            paybackname: {
                width: getWidth(1064), height: getHeight(235)
            },
            paubacknum: {
                /* height: getHeight(76), */ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-end",// justifyContent: "space-between",
                marginTop: getHeight(29), marginBottom: getHeight(45)
            },
            paybackfuli: {
                width: getWidth(216), height: getHeight(66), marginRight: getWidth(0), marginBottom: getHeight(10),
            },
            paubacknum_text: {
                fontSize: getHeight(47 + 12)//,letterSpacing:getWidth(1)
                , fontWeight: "900"
            }
        })
    }
}


export { YuEB };