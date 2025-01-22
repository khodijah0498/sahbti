import {  ScrollView
 } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import MoodCard from '../components/MoodCard'
import DailyGoal from '../components/DailyGoal'
import GoalList from '../components/GoalList'
import MicrophoneButton from '../components/MicrophoneButton'


const dashboard = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <MoodCard />
      <DailyGoal />
      <GoalList />
      <MicrophoneButton />
    </ScrollView>
  );
}

export default dashboard