import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

interface HeaderProps {
	title: string
	showCancel?: boolean
}

const Header = ({ title, showCancel = true }: HeaderProps) => {
	const navigation = useNavigation()

	function handleGoBackToHomepage() {
		navigation.navigate('OrphanagesMap')
	}

	return (
		<View style={styles.container}>
			<BorderlessButton onPress={navigation.goBack}>
				<Icon name={'arrow-left'} size={24} color='#15B6D6' />
			</BorderlessButton>

			<Text style={styles.title}>{title}</Text>

			{showCancel ? (
				<BorderlessButton onPress={handleGoBackToHomepage}>
					<Icon name={'x'} size={24} color='#FF669D' />
				</BorderlessButton>
			) : (
				<View />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		backgroundColor: '#F9FAFC',
		borderBottomWidth: 1,
		borderColor: '#DDE3F0',
		paddingTop: 44,

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	title: {
		fontFamily: 'Nunito_600SemiBold',
		color: '#8FA7B5',
		fontSize: 16,
	},
})

export default Header
