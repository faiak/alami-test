import * as React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native'
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabViewProps,
} from 'react-native-tab-view'
import { HFlatList, HScrollView } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
  return `#${randomColor}`
}

const FirstRoute = () => (
  <HScrollView index={0} showsVerticalScrollIndicator={false}>
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
  </HScrollView>
)

const SecondRoute = () => {
  const [loading, setLoading] = React.useState(false)
  return (
    <HFlatList
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
        console.log('flatlist refresh')
      }}
      isRefreshing={loading}
      refreshing={loading}
      renderRefreshControl={() => (
        <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
      )}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000)
          }}
        />
      }
      index={1}
      showsVerticalScrollIndicator={false}
      data={[
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]}
      renderItem={({ index }) => {
        return (
          <View style={{ margin: 10, backgroundColor: generateColor() }}>
            <Text style={{ padding: 20 }}>{index}</Text>
          </View>
        )
      }}
    />
  )
}

const TRoute = () => (
  <HScrollView index={2} showsVerticalScrollIndicator={false}>
    <View style={[styles.scene, { backgroundColor: 'pink' }]} />
  </HScrollView>
)

const initialLayout = { width: Dimensions.get('window').width }

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 't', title: 'Third' },
  ])

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    t: TRoute,
  })

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>
    },
  ) => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'green',
            margin: 20,
            borderRadius: 99,
          }}
        >
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={`tabItem_${i}`}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  margin: 8,
                  backgroundColor: i === index ? 'white' : 'transparent',
                  borderRadius: 99,
                }}
                onPress={() => setIndex(i)}
              >
                <Text>{route.title}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  const [loading, setLoading] = React.useState(false)

  return (
    <CollapsibleHeaderTabView
      isRefreshing={loading}
      refreshHeight={100}
      onStartRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
        console.log('asdsadasd')
      }}
      enableSnap={true}
      renderScrollHeader={() => (
        <View style={{ height: 200, backgroundColor: 'red' }} />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      scrollEnabled
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
})
