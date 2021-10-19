
import { colors } from '@utils'
import { StyleSheet } from 'react-native'

 const styles = StyleSheet.create({
     container: {
         paddingHorizontal: 30,
         paddingVertical:130,
     },
     choice: {
         backgroundColor: colors.lightGreen,
         padding: 10,
         margin: 5
     },
     choices: {
         flexDirection: 'row',
         flexWrap: 'wrap',
         marginTop: 15,
         marginHorizontal: -5
     },
     choiceText: {
         color: colors.darkPurple
     },
     label: {
         color: colors.lightGreen,
         fontSize: 18
     },
     field: {
         marginBottom: 30
     },
     switchField: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center'
     }

})

export default styles
