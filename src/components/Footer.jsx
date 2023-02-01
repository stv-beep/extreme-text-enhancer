
export default function Footer () {
  return (
    <footer className='flex border-t border-yellow-600'>
      <div className='flex flex-col md:flex-row w-10/12 py-5 mx-auto justify-end text-zinc-200 gap-2'>
        <div className='flex gap-2'>
          <p>By</p>
          <a
            className='underline hover:text-[#ede728]'
            href='https://github.com/stv-beep'
            rel='noreferrer'
            target='_blank'
          >
            Aleix Algueró
          </a>
          |
        </div>
        <div className='flex gap-2'>
          <a
            className='underline hover:text-[#ede728]'
            href='https://github.com/stv-beep/extreme-text-enhancer'
            rel='noreferrer'
            target='_blank'
          >
            Source Code
          </a>
        </div>
      </div>
    </footer>
  )
}
