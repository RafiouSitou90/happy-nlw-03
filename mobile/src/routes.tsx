import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name={'OrphanagesMap'} component={OrphanagesMap} />
				<Screen
					name={'OrphanageDetails'}
					component={OrphanageDetails}
				/>
				<Screen
					name={'SelectMapPosition'}
					component={SelectMapPosition}
				/>
				<Screen name={'OrphanageData'} component={OrphanageData} />
			</Navigator>
		</NavigationContainer>
	)
}

export default Routes
