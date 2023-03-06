
export function People() {
  return (
    <table>
      <tr>
        <Person />
        <Person />
        <Person />
      </tr>
    </table>
  );
}

function Person() {
  const items = [1,2,3,4,5];
  return (
    <>
      <td>1</td>
      <td>2</td>
    </>
  );
}