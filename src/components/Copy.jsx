import Clipboard from '../assets/Clipboard'
import Check from '../assets/Check'
export default function Copy ({ onClick, copied }) {
  return (
    <button
      onClick={onClick} aria-label='Copy to clipboard'
      type='button' className='py-2 rounded-lg hover:scale-125 transition-transform duration-300' alt='Copy to clipboard'
    >
      {!copied
        ? (<Clipboard />)
        : (<Check />)}
    </button>
  )
}
