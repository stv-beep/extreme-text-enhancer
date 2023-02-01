import { useState } from 'react'
import './App.css'
import { enhanceText } from './services/generate-text'
import { checkLang } from './services/check-lang'
import Clipboard from './assets/Clipboard'
import Clear from './assets/Clear'
import LoadingIcons from 'react-loading-icons'

function App () {
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [load, setLoad] = useState(false)
  const [input, setInput] = useState('')
  const [enhanced, setEnhance] = useState()

  const minTextLength = 3

  const handleChange = async (event) => {
    const value = event.target.value
    setInput(event.target.value)
    console.log(value)
    const isValid = value.length >= minTextLength
    if (!isValid) {
      setDisabledBtn(false)
      return
    }
    const isEnglish = await checkLang(value)
    setDisabledBtn(isEnglish)
  }

  let promise = null

  const handleClick = async () => {
    setLoad(true)
    const text = input
    const len = text.split(' ')
    promise = enhanceText(text, len.length)
    const value = await promise
    setLoad(false)
    setEnhance(value)
    promise = null
  }

  const copyText = async () => {
    const value = enhanced
    if (value !== undefined) {
      await navigator.clipboard.writeText(value)
    }
  }

  const clearInput = () => {
    setInput('')
  }

  /* adaptative textarea */
  const getScrollHeight = (elm) => {
    const savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
  }

  const onExpandableTextareaInput = ({ target: el }) => {
    if (!el.classList.contains('autoExpand') || !el.nodeName === 'TEXTAREA') return

    const minRows = el.getAttribute('data-min-rows') | 0

    !el._baseScrollHeight && getScrollHeight(el)

    el.rows = minRows
    const rows = Math.ceil((el.scrollHeight - el._baseScrollHeight) / 24)
    el.rows = minRows + rows
  }
  document.addEventListener('input', onExpandableTextareaInput)

  return (
    <div className='App'>
      <header className='py-4'>
        <h1 className='text-5xl font-bold text-center'>Extreme text enhancer</h1>
        <h3 className='text-lg font-bold text-center'>Beautify and enhance your text as if it had been written by someone extremely cultured.</h3>
      </header>
      <div className='flex flex-col gap-4'>
        <textarea onInput={handleChange} id='prompt' className='autoExpand flex-1 w-full px-4 py-2 xl:text-xl lg:text-lg md:text-md text-yellow-400 placeholder-[#ffffcc] bg-[#090909] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none' placeholder='Write something in English, like: "I want to go to the Moon."' rows='2' data-min-rows='2' cols='40' autoFocus value={input} maxLength='400' />

        <textarea
          id='result' className='flex-1 w-full px-4 py-2 xl:text-xl lg:text-lg md:text-md text-yellow-400 placeholder-[#ffffcc] bg-[#090909] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none' placeholder='At this shadowy receptacle will emerge the embellished wording...' rows='5' data-min-rows='2' cols='40'
          value={enhanced}
        />
      </div>
      <div className='flex flex-row gap-2 my-4'>
        {!load
          ? (
            <button
              disabled={!disabledBtn}
              onClick={handleClick} type='button' className={`py-2 px-4 flex justify-center items-center bg-yellow-400 hover:bg-[#ffff03] hover:text-black focus:ring-yellow-500 focus:ring-offset-black text-black 2xl:text-2xl xl:text-xl lg:text-lg md:text-md w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${!disabledBtn ? 'pointer-events-none opacity-30' : ''}`}
            >Enhance my text!
            </button>
            )
          : (
            <button
              disabled type='button' className={`py-2 px-4 flex justify-center items-center bg-[#ffff03] focus:ring-offset-black text-black 2xl:text-2xl xl:text-xl lg:text-lg md:text-md w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${!disabledBtn ? 'pointer-events-none opacity-30' : ''}`}
            ><LoadingIcons.Bars stroke='#ffff03' fill='#000' height='35px' />
            </button>
            )}
        <button
          onClick={copyText} aria-label='Copy to clipboard'
          type='button' className='py-2 rounded-lg hover:scale-125 transition-transform duration-300' alt='Copy to clipboard'
        >
          <Clipboard />
        </button>
        <button
          onClick={clearInput} aria-label='Clear the input'
          type='button' className='py-2 rounded-lg hover:scale-125 transition-transform duration-300' alt='Clear the input'
        >
          <Clear />
        </button>
      </div>
    </div>
  )
}

export default App
