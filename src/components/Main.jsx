import { useRef, useState } from 'react'
import { enhanceText } from '../services/generate-text'
import { checkLang } from '../services/check-lang'
import LoadingIcons from 'react-loading-icons'
import Copy from './Copy'
import ClearInput from './ClearInput'

export default function Main () {
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [load, setLoad] = useState(false)
  const [input, setInput] = useState('')
  const [enhanced, setEnhance] = useState()

  const minTextLength = 5
  const debounceTime = 700

  const handleChange = async (event) => {
    const value = event.target.value
    setInput(value)
    const isValid = value.length >= minTextLength
    if (!isValid) {
      setDisabledBtn(false)
      return
    }
    const isEnglish = await checkLang(value)
    setDisabledBtn(isEnglish)
  }

  /* debounced function to not request language checker each type in the textarea */
  const debounceRef = useRef()
  const onQueryChanged = (event) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      handleChange(event)
    }, debounceTime)
  }

  let promise = null

  const handleClick = async () => {
    setLoad(true)
    const text = input.split(' ')
    promise = enhanceText(input, text.length)
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

  const inputRef = useRef(null)
  const clearInput = () => {
    inputRef.current.value = ''
    setDisabledBtn(false)
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

  /* if enter key is pressed */
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <div className='my-10'>
      <div className='flex flex-col gap-4'>
        <textarea onChange={onQueryChanged} onKeyDown={handleKeyDown} id='prompt' className='autoExpand flex-1 w-full px-4 py-2 xl:text-xl lg:text-lg md:text-md text-yellow-400 placeholder-[#ffffcc] bg-[#090909] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none' placeholder='Write something in English, like: "I like the chocolate."' rows='2' data-min-rows='2' cols='40' autoFocus maxLength='400' ref={inputRef} />

        <textarea
          id='result' className='autoExpand flex-1 w-full px-4 py-2 xl:text-xl lg:text-lg md:text-md text-yellow-400 placeholder-[#ffffcc] bg-[#090909] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none' placeholder='At this shadowy receptacle will emerge the embellished wording...' rows='5' data-min-rows='2' cols='40' disabled
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
              disabled type='button' className={`py-2 px-4 flex justify-center items-center bg-[#ffff03] focus:ring-offset-black text-black lg:text-2xl md:text-md w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${!disabledBtn ? 'pointer-events-none opacity-30' : ''}`}
            ><LoadingIcons.Bars stroke='#ffff03' fill='#000' height='35px' />
            </button>
            )}
        <Copy onClick={copyText} />
        <ClearInput onClick={clearInput} />
      </div>
    </div>
  )
}
