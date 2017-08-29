import React, { Component } from 'react';
import styles from '../styles/transactions.css';
import Transaction from './components/Transaction.js';
import crypto from 'crypto';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      ctr: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.increment(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  increment() {
    const nextArr = this.state.arr.slice();
    let rand = Math.random().toString(36);
    let hash = crypto.createHash('md5').update(rand.toString(), 'utf8').digest('hex');
    nextArr.push({
      hash: hash,
      val: Math.round(Math.random().toString() * 100),
    });

    if(this.state.ctr < 8) { 
      this.setState(prevState => prevState.ctr++);
      this.setState({arr: nextArr});
    } else if (this.state.ctr > 18) {
      this.setState(prevState => { prevState.ctr = 0; });
      this.setState({arr: []});
    } else {
      this.setState(prevState => prevState.ctr++);
    }
  }

  render() {
    return (
      <div className={'col-xs-4'}>
        <div className={styles.ledger}>
          <div className={styles['transaction-container']}>
            {this.state.arr.map((item, index) => <Transaction key={index} hash={item.hash} val={item.val} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
