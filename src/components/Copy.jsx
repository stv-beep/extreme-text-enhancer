import Clipboard from '../assets/Clipboard'
export default function Copy ({ onClick }) {
  return (
    <button
      onClick={onClick} aria-label='Copy to clipboard'
      type='button' className='py-2 rounded-lg hover:scale-125 transition-transform duration-300' alt='Copy to clipboard'
    >
      <Clipboard />
    </button>
  )
}
