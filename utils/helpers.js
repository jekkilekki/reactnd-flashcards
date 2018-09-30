import React from 'react'
import { Badge } from 'native-base'
import { Text, StyleSheet } from 'react-native'
import { blue300, green300, lightblue300, amber300, purple300, teal300, teal500, tealA700 } from './colors'


export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function splitSubsets(givenArray, size) {
  let results = []
  for (var i = 0; i < givenArray.length; i += size) {
    results.push(Object.assign({}, givenArray.slice(i, i+size)))
  }
  return results
}

export function getDailyStudyReminder () {
  return {
    today: "👋 Don't forget to study today!"
  }
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function getPartOfSpeech (pos) {
  switch (pos) {
    case '명':
      return <Badge style={[styles.badge, {backgroundColor: purple300}]}><Text style={styles.badgeText}>{pos}</Text></Badge>
    case '동':
      return <Badge style={[styles.badge, {backgroundColor: teal500}]}><Text style={styles.badgeText}>{pos}</Text></Badge>
    case '형':
      return <Badge style={[styles.badge, {backgroundColor: blue300}]}><Text style={styles.badgeText}>{pos}</Text></Badge>
    case '부':
      return <Badge style={[styles.badge, {backgroundColor: amber300}]}><Text style={styles.badgeText}>{pos}</Text></Badge>
    default:
      return <Badge style={[styles.badge, {backgroundColor: teal300}]}><Text style={styles.badgeText}>{pos}</Text></Badge>
  }
}

const styles = StyleSheet.create({
  badge: {
    marginLeft: -10,
    marginRight: 5,
    marginTop: -2,
    height: 22,
    width: 22
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    paddingTop: 2,
    paddingLeft: 0,
    textAlign: 'center'
  }
})