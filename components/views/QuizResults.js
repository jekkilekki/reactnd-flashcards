import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Right, Left, Button, Icon, Content, H1, H2, H3 } from 'native-base'
import { ProgressCircle } from 'react-native-svg-charts' 
import { handleRecordSession } from '../../actions/decks'
import { teal500, tealA700, pink500, amber500, white } from '../../utils/colors'

class QuizResults extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   const { name } = navigation.state.params
  //   return {
  //     title: `Results ${name}`,
  //   }
  // }
  state = {
    timeElapsed: 0,
    totalScore: 0
  }

  componentDidMount() {
    const { navigation } = this.props
    const { id, time, view, know, dontKnow, reviewing, cards } = navigation.state.params

    const sessionType = view === 'quiz' ? 'quizResults' : 'studyResults'
    const timeEnded = Date.now()
    const totalTime = timeEnded - time
    const totalScore = ((know + reviewing / 2) / cards.length) * 100
    this.setState({
      timeElapsed: totalTime,
      totalScore: totalScore
    })

    // handleRecordSession(  studiedDeckId, sessionType, timeElapsed, dateTime, known, unknown, reviewing, score )
    this.props.dispatch( handleRecordSession( 
      id,                 // studiedDeckId
      sessionType,        // sessionType
      parseInt(totalTime),// timeElapsed
      timeEnded,          // dateTime
      know,               // known
      dontKnow,           // unknown
      reviewing,          // reviewing
      totalScore,         // score
    ))
  }

  _restart = () => {
    const { navigation } = this.props
    const { id, name, set, cards, cardObj, view } = navigation.state.params
    // navigation.goBack()
    navigation.navigate('Quiz', { 
      id: id,
      name: name,
      set: set,
      cards: cardObj,
      view: view,
      refresh: true
    })
  }

  _backToHome = () => {
    const { navigation } = this.props
    navigation.navigate('DeckSingle', { name: navigation.state.params.name })
  }

  _getMessage = () => {
    const { navigation } = this.props
    const { know, cards } = navigation.state.params
    return (
      <View>
        <Text>You said you knew {know} cards out of {cards.length}.</Text>
        <Text>Good job! That means you scored { know / cards.length * 100 }%!</Text>
      </View>
    )
  }

  render() {
    console.log( "QuizResults" )

    const { timeElapsed, totalScore } = this.state
    const { navigation, deck } = this.props
    const { set, name, view, cards, cardObj, know, dontKnow, reviewing, time, id } = navigation.state.params
    console.log( "Card Obj in Results: ", cardObj )

    const title = view === 'quiz' ? 'Quiz' : 'Study Session'

    return (
      <Container>
        
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Title>{title}</Title>
          </Left>
          <Right>
            <Button transparent onPress={this._backToHome}>
              <Text>Finished</Text>
              <Icon name="close" style={{marginLeft: 5}}/>
            </Button>
          </Right>
        </Header>

        <Content>
          <View style={styles.padder}>
            <H3>Results</H3>

            <View style={{marginBottom: 15}}>
              <ProgressCircle
                style={{height: 160}}
                progress={totalScore / 100}
                progressColor={tealA700}
                // startAngle={-Math.PI * 0.8}
                // endAngle={Math.PI * 0.8}
              />
              <View style={styles.statsScore}>
                <H1 style={styles.totalScore}>{totalScore}%</H1>
              </View>
            </View>

            <View style={styles.statsBox}>
              <View style={[styles.thirds, {borderRightWidth: 1}]}>
                <H3 style={[styles.statHeader, {color: teal500}]}>Mastered</H3>
                <View>
                  <ProgressCircle
                    style={{height: 60}}
                    progress={know / cards.length}
                    progressColor={teal500}
                  />
                  <View style={styles.statsScore}>
                    <H3>{know}</H3>
                  </View>
                </View>
              </View>

              <View style={styles.thirds}>
                <H3 style={[styles.statHeader, {color: amber500}]}>Learning</H3>
                <View>
                  <ProgressCircle
                    style={{height: 60}}
                    progress={reviewing / cards.length}
                    progressColor={amber500}
                  />
                  <View style={styles.statsScore}>
                    <H3>{reviewing}</H3>
                  </View>
                </View>
              </View>

              <View style={[styles.thirds, {borderLeftWidth: 1}]}>
                <H3 style={[styles.statHeader, {color: pink500}]}>New</H3>
                <View>
                  <ProgressCircle
                    style={{height: 60}}
                    progress={dontKnow / cards.length}
                    progressColor={pink500}
                  />
                  <View style={styles.statsScore}>
                    <H3>{dontKnow}</H3>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.statsBox]}>
              <View style={[styles.doubles, {borderRightWidth: 1}]}>
                <H3 style={styles.statHeader}>Time Elapsed</H3>
                <H1 style={{textAlign: 'center'}}>{timeElapsed}ms</H1>
              </View>
              <View style={[styles.doubles]}>
                <H3 style={styles.statHeader}>Total Study Time</H3>
                <H1 style={{textAlign: 'center'}}>{timeElapsed}ms</H1>
              </View>
            </View>

            {/* {this._getMessage} */}

            <View>
              <Button block
                onPress={this._restart} 
                style={styles.button}
              >
                <Icon name="sync" style={{marginLeft: 0}}/>
                <Text style={styles.buttonText}>Restart {title}</Text>
              </Button>

              <Button block
                onPress={this._backToHome}
                style={styles.buttonOutline}
              >
                <Icon name="arrow-back" style={{color: tealA700, marginLeft: 0}}/>
                <Text style={styles.buttonOutlineText}>Back to Deck</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  padder: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  totalScore: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 20,
    marginTop: 10,
    marginBottom: 10
  },
  statsScore: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thirds: {
    width: '33%'
  },
  doubles: {
    width: '50%'
  },
  statHeader: {
    textAlign: 'center',
    fontSize: 14
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: tealA700,
  },
  buttonOutline: {
    backgroundColor: white,
    borderColor: tealA700,
    borderWidth: 2
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
  buttonOutlineText: {
    color: tealA700,
    fontSize: 18
  }
})

export default connect()(QuizResults)