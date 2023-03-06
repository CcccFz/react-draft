
const ColorTextInput = withBackground(TextInput, 'red');

export function HocExample() {
  return <ColorTextInput />;
}

function withBackground(TextInput: any, color: string) {
  return () => (
    <div style={{backgroundColor: color}}>
      <TextInput />
    </div>
  );
}

function TextInput() {
  return (
    <label>Name: <input  /></label>
  );
}