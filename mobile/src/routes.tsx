import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { OrphanageDetails, OrphanagesMap } from './pages'

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
			</Navigator>
		</NavigationContainer>
	)
}

export default Routes
