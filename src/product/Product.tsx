import { Component } from "react";

export function Product() {
  return <ProductPlane products={PRODUCTS} />;
}

type CategoryRowProps = {
  category: string
}

function CategoryRow(props: CategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>
        {props.category}
      </th>
    </tr>
  );
}

type ProductRowProps = {
  product: ProductType
}

function ProductRow(props: ProductRowProps) {
  const name = (props.product.stocked ?
    props.product.name :
    <span style={{color: "red"}}>
      {props.product.name}
    </span>
  );

  return (
    <tr>
      <td>{name}</td>
      {' '}
      <td>{props.product.price}</td>
    </tr>
  );
}

type ResultTableProps = {
  stocked: boolean
  name: string
  products: ProductType[]
}

function ResultTable(props: ResultTableProps) {
  const products: any[] = [];
  const {name, stocked} = props;
  let lastCategory: null | string = null;

  props.products.forEach((product) => {
    if (lastCategory !== product.category) {
      lastCategory = product.category;
      products.push(
        <CategoryRow category={product.category} />
      );
    }

    if (stocked && !product.stocked) {
      return;
    }
    if (product.name.indexOf(name) === -1) {
      return;
    }

    products.push(
      <ProductRow product={product} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products}
      </tbody>
    </table>
  );
}

type SearchBarProps = {
  stocked: boolean
  name: string
  changeName: any
  changeStocked: any
}

class SearchBar extends Component<SearchBarProps, {}> {
  constructor(props: SearchBarProps) {
    super(props);
  }

  changeName = (e: any) => {
    this.props.changeName(e.target.value);
  }

  changeStocked = (e: any) => {
    this.props.changeStocked(e.target.checked);
  }

  render() {
    const {name, stocked} = this.props;
    return (
      <div>
        <input type="text" value={name} onChange={this.changeName} placeholder="Name Search..." />
        <div>
          <input type="checkbox" checked={stocked} onChange={this.changeStocked} />
          Only show products in stock
        </div>
      </div>
    );
  }
}

type ProductPlaneProps = {
  products: ProductType[]
}

type ProductPlaneState = {
  stocked: boolean
  name: string
}

class ProductPlane extends Component<ProductPlaneProps, ProductPlaneState> {
  constructor(props: ProductPlaneProps) {
    super(props);
    this.state = {
      stocked: true,
      name: '',
    }
  }

  changeName = (name: string) => {
    this.setState({
      name
    });
  }

  changeStocked = (stocked: boolean) => {
    this.setState({
      stocked
    });
  }

  render() {
    const {name, stocked} = this.state;
    const {products} = this.props;
    return (
      <div className="ProductPlane">
        <SearchBar name={name} stocked={stocked} changeName={this.changeName} changeStocked={this.changeStocked} />
        <ResultTable products={products} name={name} stocked={stocked} />
      </div>
    );
  }
}

type ProductType = {
  category: string
  price: string
  stocked: boolean
  name: string
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];