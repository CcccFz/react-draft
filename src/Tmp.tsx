export function NumberList(props: {numbers: number[]}) {
  return (
    <ul>
      {props.numbers.map((number) => 
        <li>{number}</li>
      )}
    </ul>
  );
}