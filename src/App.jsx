import { useState } from 'react'
import './App.css'
import { enhanceText, checkLang } from './services/generate-text'
import Clipboard from './components/Clipboard'

function App () {
  const [disabledBtn, setDisabledBtn] = useState(false)

  const handleChange = async (event) => {
    const value = event.target.value
    console.log(value)
    const isValid = value.length >= 3
    if (!isValid) {
      setDisabledBtn(false)
      return
    }
    const isEnglish = await checkLang(value)
    setDisabledBtn(isEnglish)
  }

  let promise = null

  const handleClick = async () => {
    document.getElementById('result').value = 'loading...wait a little' // provisional
    const text = document.getElementById('prompt').value
    promise = enhanceText(text)
    const value = await promise
    document.getElementById('result').value = value
    promise = null
  }

  const copyText = async () => {
    const value = document.getElementById('result').value
    if (value !== '') {
      await navigator.clipboard.writeText(value)
    }
  }

  return (
    <div className='App'>
      <header className='py-4'>
        <h1 className='text-3xl font-bold text-center'>Extreme text enhancer</h1>
      </header>

      <textarea onInput={handleChange} id='prompt' className='flex-1 w-full px-4 py-2 text-base text-yellow-400 placeholder-yellow-100 bg-[#100f0f] border border-gray-900 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent' placeholder='Write some shit bro, like: "I hate the mayonnaise."' name='comment' rows='2' cols='40' />

      <textarea
        id='result' className='flex-1 w-full px-4 py-2 text-base text-yellow-400 placeholder-yellow-100 bg-[#100f0f] border border-gray-900 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent' placeholder='At this snowy receptacle will emerge the embellished wording...' name='comment' rows='2' cols='40' disabled
      />
      <div className='flex flex-row gap-2'>
        <button
          disabled={!disabledBtn}
          onClick={handleClick} type='button' className={`py-2 px-4 flex justify-center items-center bg-yellow-600 hover:bg-yellow-700 hover:text-black focus:ring-yellow-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${!disabledBtn ? 'pointer-events-none opacity-30' : ''}`}
        >Enhance my text!
        </button>
        <button
          onClick={copyText}
          type='button' className='py-2 rounded-lg'
        >
          <Clipboard />
        </button>
      </div>
    </div>
  )
}

export default App
