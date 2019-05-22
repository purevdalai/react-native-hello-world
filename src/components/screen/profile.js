import React from 'react';
import { Text, View, TextInput, Button, Picker, StyleSheet } from 'react-native';
import * as coinService from '../services/coin';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Loader from '../components/loader';

export default class WithdrawScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      coin: null, 
      address: '', 
      amount: 0,
      myCoins: [],
      loading: true,
      toast: null
    };
  }
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    coinService.getOwnCoins().then((resp) => resp.json())
    .then((response => {
      console.log('fetch data response: ', response);
      this.setState({
        myCoins: response,
        loading: false
      });
    }))
  }

  tranfer() {
    console.log('transfer bro!');
    console.log('coin => ', this.state.coin);
    console.log('address => ', this.state.address);
    console.log('amount => ', this.state.amount);
    this.setState({loading: true});
    const params = {
      tid: this.state.coin.tokenId,
      // to: this.state.address,
      to: 'UT6ef9ebda5c9680e169eaff7e1fb4e69ad715e5404a6e789db16df15ebf0639680',
      amount: Number(this.state.amount)
    };
    coinService.transfer(params).then(response => {
      // console.log('transfer coin result: ', response);
      // alert('We received your transaction request');
      this.setState({ loading: false });
    }, err => {
      console.log('error transfer: ', err);
    });
  }

  render() {
    if ( this.state.loading ) {
      return (
        <Loader></Loader>
      )
    }
    return (
      <View style={styles.container}>
        {/* <Toast ref="toast"/> */}
        <SearchableDropdown
          onItemSelect={item => this.setState({ coin: item })}
          containerStyle={{ padding: 5 }}
          textInputStyle={styles.dropdown}
          itemStyle={styles.dropdownItem}
          itemTextStyle={{ color: '#222' }}
          itemsContainerStyle={{ maxHeight: 140 }}
          items={this.state.myCoins}
          placeholder="Select coin"
          resetValue={false}
          underlineColorAndroid="transparent"
        />

        <TextInput
          placeholder='Address' 
          onChangeText={text => this.setState({ address: text })}
        />

        <TextInput 
          placeholder='Amount' 
          keyboardType={'numeric'}
          onChangeText={text => this.setState({ amount: text })}
        />
        <Button
          onPress={() => this.tranfer()}
          title={'Send'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },

    dropdown: {
      borderColor: '#ccc',
    },

    dropdownItem: {
      padding: 10,
      marginTop: 2,
      backgroundColor: '#ddd',
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 5
    }
});