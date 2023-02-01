import Clear from '../assets/Clear'
export default function ClearInput ({ onClick }) {
  return (
    <button
      onClick={onClick} aria-label='Clear the input'
      type='button' className='py-2 rounded-lg hover:scale-125 transition-transform duration-300' alt='Clear the input'
    >
      <Clear />
    </button>
  )
}
