import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Header } from './components'
import {
	OrphanageData,
	OrphanageDetails,
	OrphanagesMap,
	SelectMapPosition,
} from './pages'

const { Navigator, Screen } = createStackNavigator()

const Routes = () => {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					headerShown: false,
					cardStyle: { backgroundColor: '#F2F3F5' },
				}}
			>
				<Screen name={'OrphanagesMap'} component={OrphanagesMap} />
				<Screen
					name={'OrphanageDetails'}
					component={OrphanageDetails}
					options={{
						headerShown: true,
						header: () => (
							<Header showCancel={false} title={'Orphanage'} />
						),
					}}
				/>
				<Screen
					name={'SelectMapPosition'}
					component={SelectMapPosition}
					options={{
						headerShown: true,
						header: () => <Header title={'Select Location'} />,
					}}
				/>
				<Screen
					name={'OrphanageData'}
					component={OrphanageData}
					options={{
						headerShown: true,
						header: () => <Header title={'Enter the data'} />,
					}}
				/>
			</Navigator>
		</NavigationContainer>
	)
}

export default Routes
