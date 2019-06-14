import React from 'react';
import Modal from 'react-modal';
import { Header, Form, Input, ActionHolder, SuccessBanner, ErrorBanner } from './style';
import { Button } from '../Button';

interface Props {
  isOpen: boolean;
  onSubmit: any;
  closeModal: any;
}

interface State {
  to: string;
  from: string;
  amount: number;
  submitted: boolean;
  error: boolean;
  errorMessage: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    boxSizing: 'border-box',
    borderRadius: '6px',
    boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.75)',
    border: 'none',
  },
};

export default class TransferModal extends React.Component<Props, State> {
  public state: State = {
    to: '',
    from: '',
    amount: 0,
    submitted: false,
    error: false,
    errorMessage: ''
  }

  public change = (e: any) => {
    let value = e.target.value;
    const id = e.target.id;
    if(id === 'amount') {
      value = parseFloat(value);
    }
    const newState: any = {};
    newState[id] = value;
    this.setState(newState);
  }

  public onSubmit = () => {
    const { to, from, amount } = this.state;
    if(to && from && amount > 0) {
      this.setState({
        to: '',
        from: '',
        amount: 0,
        submitted: true
      }, () => {
        this.props.onSubmit(to, from, amount);
      })
    } else {
      this.setState({
        error: true,
        errorMessage: 'Invalid Options, Check again.'
      })
    }
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if(this.state.error) {
      setTimeout(() => this.setState({ error: false }), 5000);
    }

    if(this.state.submitted) {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    }
  } 

  public render() {
    const { to, from, amount , submitted, errorMessage, error} = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Transfer ETH"
      >
        <Header>Transfer ETH</Header>
        <Form>
          {submitted && <SuccessBanner>Transfer Complete! <a onClick={this.props.closeModal}>Close Modal</a></SuccessBanner>}
          {error && <ErrorBanner>{errorMessage}</ErrorBanner>}
          <Input id="to" placeholder={'To Address'} value={to} onChange={this.change} />
          <Input id="from" placeholder={'From Address'} value={from} onChange={this.change} />
          <Input type="number" step="0.00000001" id="amount" placeholder={'Amount'} value={amount} onChange={this.change} />
          <ActionHolder>
            <Button onClick={this.onSubmit}>Transfer</Button>
          </ActionHolder>
        </Form>
      </Modal>
    );
  }
}
