import { Component } from "react";

type LoginState = {
  loginer: string
}
export class Login extends Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loginer: ''
    };
  }

  change = (e: any) => {
    this.setState({
      loginer: e.target.value
    });
  }

  signUp = () => {
    alert(`Welcome aboard ${this.state.loginer}`);
  }

  render() {
    return (
      <div className="Login">
        <Dialog title="Login app" message="How should we refer to you?">
          <input type="text" value={this.state.loginer} onChange={this.change} />
          <button onClick={this.signUp}>Sign Me Up!</button>
        </Dialog>
      </div>
    )
  }
}

type FancyBorderProps = {
  color: string
  children: any
}
function FancyBorder(props: FancyBorderProps) {
  return (
    <div className={"FancyBorder FancyBorder-"+props.color}>
      {props.children}
    </div>
  );
}

type DialogProps = {
  title: string
  message: string
  children: any
}
function Dialog(props: DialogProps) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}