type StartProps = {
  onStart: () => void
}

function Start({ onStart }: StartProps) {
  return (
    <p>
      <input type="button" id="start" value="START/RESET" onClick={onStart} />
    </p>
  )
}

export default Start
