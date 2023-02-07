
export default function Footer () {
  return (
    <footer className='flex border-t border-yellow-600'>
      <div className='flex flex-col md:flex-row w-[80%] py-5 mx-auto justify-center sm:justify-center gap-2'>
        <div className='flex gap-2'>
          <p>By</p>
          <a className='underline hover:text-[#ede728]' href='https://aleixalguero.vercel.app' rel='noreferrer' target='_blank'>
            Aleix Algueró
          </a>
        </div>
        <div className='flex gap-2'>
          <p>using</p>
          <a className='underline hover:text-[#ede728]' href='https://cohere.ai' rel='noreferrer' target='_blank'>
            Co:here AI
          </a>
        </div>
        <div className='flex gap-2'>
          <a className='underline hover:text-[#ede728]' href='https://github.com/stv-beep/extreme-text-enhancer' rel='noreferrer' target='_blank'>
            Source Code
          </a>
        </div>
      </div>
    </footer>
  )
}
