import React from "react"
import { View } from "react-native"

const OfficesGoodies = (props) => {
	return (
		<View>
			<Text>{props.name}</Text>
			<FlatList
				data={props.goodies}
				renderItem={({ item }) => (
					<View style={styles.rowcol}>
						<GoodiesCard
							name={item.name}
							price={item.price}
							src={item.image}
						/>
					</View>
				)}
				keyExtractor={(item) => item.key}
				numColumns={2}
			/>
		</View>
	)
}

export default OfficesGoodies
