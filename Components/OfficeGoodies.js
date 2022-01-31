import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import GoodiesCard from "./GoodiesCard";

const OfficeGoodies = (props) => {
    return (
        <View style={styles.main}>
            <Text style={styles.officeName}>{props.name}</Text>
            <FlatList
                data={props.goodiesList}
                keyExtractor={(item) => item.key}
				numColumns={2}
                renderItem={({ item }) => (
					<View style={styles.rowcol}>
						<GoodiesCard
							name={item.name}
							price={item.price}
							src={item.image}
						/>
					</View>
				)}
            >

            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        marginTop: 20,
        width: "100%"
    },
    rowcol: {
		width: "50%",
		marginTop: 20,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},
    officeName: {
        marginLeft: 10,
        fontFamily: 'bold',
        fontSize: 20
    }
});

export default OfficeGoodies;