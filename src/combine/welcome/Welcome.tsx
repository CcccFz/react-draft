import './welcome.css'

export function Welcome() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Welcome you for visiting !
      </p>
    </FancyBorder>
  );
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