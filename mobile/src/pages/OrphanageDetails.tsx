import { AppLoading } from 'expo'
import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	ScrollView,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Linking,
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { api } from '../services'

import mapMarkerImg from '../assets/images/map-marker.png'

const { width } = Dimensions.get('window')

interface OrphanageDetailsRouteParams {
	id: number
}

interface Orphanage {
	name: string
	about: string
	latitude: number
	longitude: number
	instructions: string
	opening_hours: string
	open_on_weekends: boolean
	images: Array<{ id: number; url: string }>
}

const OrphanageDetails = () => {
	const route = useRoute()

	const [orphanage, setOrphanage] = useState<Orphanage>()

	const { id } = route.params as OrphanageDetailsRouteParams

	useEffect(() => {
		api.get(`orphanages/${id}`).then((response) => {
			setOrphanage(response.data)
		})
	}, [id])

	if (!orphanage) {
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: 'space-between', alignItems: 'center' },
				]}
			>
				<Text>Loading...</Text>
				<AppLoading />
			</View>
		)
	}

	const {
		name,
		about,
		latitude,
		longitude,
		instructions,
		opening_hours,
		open_on_weekends,
		images,
	} = orphanage

	function handleOpenGoogleMapRoutes() {
		Linking.openURL(
			`https://www.google.com/maps/dir/.api=1&destination=${latitude},${longitude}`
		).then((_) => null)
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.imagesContainer}>
				<ScrollView horizontal pagingEnabled>
					{images.map(({ id, url }) => {
						return (
							<Image
								key={id}
								style={styles.image}
								source={{
									uri: url,
								}}
							/>
						)
					})}
				</ScrollView>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.title}>{name}</Text>
				<Text style={styles.description}>{about}</Text>

				<View style={styles.mapContainer}>
					<MapView
						provider={PROVIDER_GOOGLE}
						initialRegion={{
							latitude,
							longitude,
							latitudeDelta: 0.008,
							longitudeDelta: 0.008,
						}}
						zoomEnabled={false}
						pitchEnabled={false}
						scrollEnabled={false}
						rotateEnabled={false}
						style={styles.mapStyle}
					>
						<Marker
							icon={mapMarkerImg}
							coordinate={{
								latitude,
								longitude,
							}}
						/>
					</MapView>

					<TouchableOpacity
						style={styles.routesContainer}
						onPress={handleOpenGoogleMapRoutes}
					>
						<Text style={styles.routesText}>
							View directions on Google Maps
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.separator} />

				<Text style={styles.title}>Visiting instructions</Text>
				<Text style={styles.description}>{instructions}</Text>

				<View style={styles.scheduleContainer}>
					<View
						style={[styles.scheduleItem, styles.scheduleItemBlue]}
					>
						<Feather name='clock' size={40} color='#2AB5D1' />
						<Text
							style={[
								styles.scheduleText,
								styles.scheduleTextBlue,
							]}
						>
							{opening_hours}
						</Text>
					</View>
					{open_on_weekends ? (
						<View
							style={[
								styles.scheduleItem,
								styles.scheduleItemGreen,
							]}
						>
							<Feather name='info' size={40} color='#39CC83' />
							<Text
								style={[
									styles.scheduleText,
									styles.scheduleTextGreen,
								]}
							>
								We serve{'\n'}on weekend
							</Text>
						</View>
					) : (
						<View
							style={[
								styles.scheduleItem,
								styles.scheduleItemRed,
							]}
						>
							<Feather name='info' size={40} color='#FF669D' />
							<Text
								style={[
									styles.scheduleText,
									styles.scheduleTextRed,
								]}
							>
								We don't serve{'\n'}on weekend
							</Text>
						</View>
					)}
				</View>

				<RectButton style={styles.contactButton} onPress={() => {}}>
					<FontAwesome name='whatsapp' size={24} color='#FFF' />
					<Text style={styles.contactButtonText}>Get in touch</Text>
				</RectButton>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	imagesContainer: {
		height: 240,
	},

	image: {
		width: width,
		height: 240,
		resizeMode: 'cover',
	},

	detailsContainer: {
		padding: 24,
	},

	title: {
		color: '#4D6F80',
		fontSize: 30,
		fontFamily: 'Nunito_700Bold',
	},

	description: {
		fontFamily: 'Nunito_600SemiBold',
		color: '#5c8599',
		lineHeight: 24,
		marginTop: 16,
	},

	mapContainer: {
		borderRadius: 20,
		overflow: 'hidden',
		borderWidth: 1.2,
		borderColor: '#B3DAE2',
		marginTop: 40,
		backgroundColor: '#E6F7FB',
	},

	mapStyle: {
		width: '100%',
		height: 150,
	},

	routesContainer: {
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},

	routesText: {
		fontFamily: 'Nunito_700Bold',
		color: '#0089a5',
	},

	separator: {
		height: 0.8,
		width: '100%',
		backgroundColor: '#D3E2E6',
		marginVertical: 40,
	},

	scheduleContainer: {
		marginTop: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	scheduleItem: {
		width: '48%',
		padding: 20,
	},

	scheduleItemBlue: {
		backgroundColor: '#E6F7FB',
		borderWidth: 1,
		borderColor: '#B3DAE2',
		borderRadius: 20,
	},

	scheduleItemGreen: {
		backgroundColor: '#EDFFF6',
		borderWidth: 1,
		borderColor: '#A1E9C5',
		borderRadius: 20,
	},

	scheduleItemRed: {
		backgroundColor: '#FEF6F9',
		borderWidth: 1,
		borderColor: '#FFBCD4',
		borderRadius: 20,
	},

	scheduleText: {
		fontFamily: 'Nunito_600SemiBold',
		fontSize: 16,
		lineHeight: 24,
		marginTop: 20,
	},

	scheduleTextBlue: {
		color: '#5C8599',
	},

	scheduleTextGreen: {
		color: '#37C77F',
	},

	scheduleTextRed: {
		color: '#FF669D',
	},

	contactButton: {
		backgroundColor: '#3CDC8C',
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		marginTop: 40,
	},

	contactButtonText: {
		fontFamily: 'Nunito_800ExtraBold',
		color: '#FFF',
		fontSize: 16,
		marginLeft: 16,
	},
})

export default OrphanageDetails
