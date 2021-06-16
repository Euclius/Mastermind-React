import styles from './GuessPeg.module.css'

const GuessPeg = (props) => (
  <div
    className={styles.Peg}
    style={{
      backgroundColor: props.color,
      border: props.color ? `1px solid ${props.color}` : '1px dashed lightgrey',
      cursor: props.currentGuess && 'pointer'
    }}
    onClick={props.currentGuess ? props.handlePegClick : null}
  />
);

export default GuessPeg;
