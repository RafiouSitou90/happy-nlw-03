import { AppLoading } from 'expo'
import React from 'react'
import {
	Dimensions,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather as Icon } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import {
	Nunito_600SemiBold,
	Nunito_700Bold,
	Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito'

import mapMarker from './src/assets/images/map-marker.png'

const { width, height } = Dimensions.get('window')

export default function App() {
	const [fontsLoaded] = useFonts({
		Nunito_600SemiBold,
		Nunito_700Bold,
		Nunito_800ExtraBold,
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				initialRegion={{
					latitude: -15.868693,
					longitude: -47.9669243,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008,
				}}
			>
				<Marker
					icon={mapMarker}
					coordinate={{
						latitude: -15.868693,
						longitude: -47.9669243,
					}}
					calloutAnchor={{ x: 2.7, y: 0.8 }}
				>
					<Callout tooltip onPress={() => true}>
						<View style={styles.calloutContainer}>
							<Text style={styles.calloutText}>Child House</Text>
						</View>
					</Callout>
				</Marker>
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>02 orphanages found</Text>
				<TouchableOpacity
					style={styles.createOrphanageButton}
					onPress={() => true}
				>
					<Icon name={'plus'} size={20} color={'#FFF'} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	map: {
		width: width,
		height: height,
	},

	calloutContainer: {
		width: 160,
		height: 46,
		paddingHorizontal: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		borderRadius: 16,
		justifyContent: 'center',
	},

	calloutText: {
		color: '#0089A5',
		fontSize: 14,
		fontFamily: 'Nunito_700Bold',
	},

	footer: {
		position: 'absolute',
		left: 24,
		right: 24,
		bottom: 32,

		backgroundColor: '#FFF',
		borderRadius: 20,
		height: 56,
		paddingLeft: 24,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		elevation: 3,
	},

	footerText: {
		fontFamily: 'Nunito_700Bold',
		color: '#8FA7B3',
	},

	createOrphanageButton: {
		width: 56,
		height: 56,
		backgroundColor: '#15C3D6',
		borderRadius: 20,

		justifyContent: 'center',
		alignItems: 'center',
	},
})
