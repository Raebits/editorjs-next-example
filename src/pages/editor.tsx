import dynamic from 'next/dynamic'
import React, { Component, useState } from 'react'
// import { Editor } from '../components'
const BoardDynamic = dynamic(() => import('../components/editor'), {
  ssr: false,
})

const EditorPage = () => {
  const [value, setValue] = useState<any>()
  // console.log(window)
  return (
    <div>
      <BoardDynamic/>
    </div>
  )
}

export default EditorPage