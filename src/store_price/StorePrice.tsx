import { Component } from "react";

type StoreState = {
    store: StoreSize
}
export class Store extends Component<{}, StoreState> {
  constructor(props: any) {
    super(props);
    this.state = {
      store: new StoreSize(0)
    }
  }

  change = (store: StoreSize) => {
    this.setState({
      store
    });
  }

  render() {
    const {store} = this.state;
    return (
      <div className="Store">
        <StoreInput store={store} unit="Bit" change={this.change} />
        <StoreInput store={store} unit="Byte" change={this.change} />
        <StoreInput store={store} unit="Kb" change={this.change} />
        <StoreInput store={store} unit="MB" change={this.change} />
        <StoreInput store={store} unit="GB" change={this.change} />
        <StoreInput store={store} unit="TB" change={this.change} />
        <StorePrice store={store} />
      </div>
    );
  }
}

type StoreInputProps = {
  store: StoreSize
  unit: string
  change(store: StoreSize): void
}
class StoreInput extends Component<StoreInputProps, {}> {
  constructor(props: StoreInputProps) {
    super(props);
  }

  change = (e: any) => {
    let size = 0;
    if (e.target.value) {
      size = parseInt(e.target.value, 10)
    }
    const unit = this.props.unit;
    this.props.change(new StoreSize(size, unit));
  }

  render() {
    const {store, unit} = this.props;
    return (
      <div className="StoreInput">
        容量({unit}): {'\u00A0'}
        <input type="text" value={store.to(unit)} onChange={this.change}/>
        {unit}
      </div>
    );
  }
}

class StoreSize {
  private bit = 0;
  constructor(size: number, unit?: string) {
    unit = unit ? unit.toLowerCase() : 'bit';
    this.bit = (
      unit === 't' || unit === 'tb' ? size*8*1024*1024*1024*1024 :
      unit === 'g' || unit === 'gb' ? size*8*1024*1024*1024 :
      unit === 'm' || unit === 'mb' ? size*8*1024*1024 :
      unit === 'kb' ? size*8*1024 :
      unit === 'byte' || unit === 'b' ? size*8 : 
      unit === 'bit' ? size :
      -1
    );
  }

  to = (unit: string) => {
    unit = unit.toLowerCase();
    return Math.round((
      unit === 't' || unit === 'tb' ? this.bit/8/1024/1024/1024/1024 :
      unit === 'g' || unit === 'gb' ? this.bit/8/1024/1024/1024 :
      unit === 'm' || unit === 'mb' ? this.bit/8/1024/1024 :
      unit === 'kb' ? this.bit/8/1024 :
      unit === 'byte' || unit === 'b' ? this.bit/8 : 
      unit === 'bit' ? this.bit :
      -1
    ) * 1000) / 1000;
  }
}

function StorePrice(props: {store: StoreSize}) {
  const gb = props.store.to('g');
  const price = Math.round((
    gb > 1 ? 0.18*gb :
    gb > 0 && gb < 1 ? 0.18 :
    0
  ) * 100) / 100;
  return (
    <div className="StorePrice">
      <p> The store price is {price} RMB.</p>
    </div>
  );       
}