import { Feather as Icon } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { api } from '../services'

import mapMarker from '../assets/images/map-marker.png'

const { width, height } = Dimensions.get('window')

interface Orphanage {
	id: number
	latitude: number
	longitude: number
	name: string
}

const OrphanagesMap = () => {
	const navigation = useNavigation()

	const [orphanages, setOrphanages] = useState<Orphanage[]>([])

	function handleNavigateToOrphanageDetail(id: number) {
		navigation.navigate('OrphanageDetails', { id })
	}

	function handleNavigateToCreateOrphanage() {
		navigation.navigate('SelectMapPosition')
	}

	useEffect(() => {
		api.get('orphanages').then((response) => {
			setOrphanages(response.data)
		})
	}, [])

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
				{orphanages.map(({ id, name, latitude, longitude }) => {
					return (
						<Marker
							key={id}
							icon={mapMarker}
							coordinate={{
								latitude,
								longitude,
							}}
							calloutAnchor={{ x: 2.7, y: 0.8 }}
						>
							<Callout
								tooltip
								onPress={() =>
									handleNavigateToOrphanageDetail(id)
								}
							>
								<View style={styles.calloutContainer}>
									<Text style={styles.calloutText}>
										{name}
									</Text>
								</View>
							</Callout>
						</Marker>
					)
				})}
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>
					{orphanages.length} orphanages found
				</Text>
				<RectButton
					style={styles.createOrphanageButton}
					onPress={handleNavigateToCreateOrphanage}
				>
					<Icon name={'plus'} size={20} color={'#FFF'} />
				</RectButton>
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

export default OrphanagesMap
