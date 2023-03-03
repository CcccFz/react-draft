import './chat.css'

export function Chat() {
  return (
    <SplitPlane 
      left={<ContactPlane />}
      right={<ChatPlane />}
    />
  );
}

type SplitPlaneProps = {
  left: any
  right: any
}
function SplitPlane(props: SplitPlaneProps) {
  return (
    <div className="SplitPlane">
      <div className="SplitPlane-left">
        {props.left}
      </div>

      <div className="SplitPlane-right">
        {props.right}
      </div>
    </div>
  );
}

function ContactPlane() {
  return (
    <div className="ContactPlane"></div>
  )
}

function ChatPlane() {
  return (
    <div className="ChatPlane"></div>
  )
}